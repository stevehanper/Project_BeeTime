import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '../db';
import { validateRequest } from '../middleware/validateRequest';
import jwt from 'jsonwebtoken';

const router = Router();

// 회원가입 데이터 검증 스키마
const signupSchema = z.object({
  name: z.string().min(2, '이름은 2글자 이상이어야 합니다'),
  email: z.string().email('유효한 이메일 주소를 입력해주세요'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다'),
  locationId: z.number({
    required_error: '근무지 선택은 필수입니다',
  }),
});

type SignupInput = z.infer<typeof signupSchema>;

router.post('/signup', validateRequest(signupSchema), async (req, res) => {
  try {
    const { email, password, name, locationId } = req.body as SignupInput;
    console.log('회원가입 요청:', { email, name, locationId });

    // 1. 이메일 중복 체크
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      console.log('이메일 중복:', email);
      return res.status(400).json({ error: '이미 사용 중인 이메일입니다.' });
    }

    // 2. Location 존재 여부 확인
    const location = await prisma.location.findUnique({
      where: { id: locationId }
    });

    if (!location) {
      console.log('유효하지 않은 locationId:', locationId);
      return res.status(400).json({ error: '유효하지 않은 근무지입니다.' });
    }

    // 3. 트랜잭션으로 사용자 생성 및 근무지 연결
    const result = await prisma.$transaction(async (tx) => {
      // 사용자 생성
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: 'EMPLOYEE'
        }
      });

      // LocationUser 연결 생성
      await tx.locationUser.create({
        data: {
          userId: user.id,
          locationId: locationId,
          startDate: new Date()
        }
      });

      return user;
    });

    console.log('회원가입 성공:', { userId: result.id, locationId });

    res.status(201).json({
      message: '회원가입이 완료되었습니다.',
      user: {
        id: result.id,
        email: result.email,
        name: result.name
      }
    });

  } catch (error) {
    console.error('회원가입 에러:', error);
    res.status(500).json({ error: '회원가입 처리 중 오류가 발생했습니다.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('로그인 시도:', { email, password: '***' });

    // 사용자 찾기
    const user = await prisma.user.findUnique({
      where: { email }
    });

    console.log('DB 조회 결과:', user ? '사용자 찾음' : '사용자 없음');

    if (!user || !user.password) {
      console.log('로그인 실패: 사용자 없음');
      return res.status(400).json({ error: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    }

    // 비밀번호 확인
    const validPassword = await bcrypt.compare(password, user.password);
    console.log('비밀번호 확인:', validPassword ? '일치' : '불일치');

    if (!validPassword) {
      console.log('로그인 실패: 비밀번호 불일치');
      return res.status(400).json({ error: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    }

    console.log('로그인 성공:', { userId: user.id, email: user.email });
    
    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    // 응답
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });

  } catch (error) {
    console.error('로그인 에러:', error);
    res.status(500).json({ error: '로그인 처리 중 오류가 발생했습니다.' });
  }
});

export { router as authRouter };