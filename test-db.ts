import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 새 사용자 생성
  const newUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: '테스트 사용자',
      passwordHash: 'test1234' // 실제로는 해시된 비밀번호를 사용해야 합니다
    }
  })
  
  console.log('생성된 사용자:', newUser)

  // 모든 사용자 조회
  const allUsers = await prisma.user.findMany()
  console.log('모든 사용자 목록:', allUsers)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })