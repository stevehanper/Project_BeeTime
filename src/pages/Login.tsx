import { Logo } from '../components/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import GoogleLogo from '../assets/logo_goauth.png';
import { useState } from 'react';

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '로그인에 실패했습니다.');
      }

      // 로그인 성공 시 토큰과 사용자 정보 저장
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // 대시보드로 이동
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#FFFBF6]">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 font-fredoka">Bee Time</h1>
          <Logo />
        </div>

        {/* 에러 메시지 표시 */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {/* 로그인 폼 섹션 */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4 font-montserrat">
          {/* 이메일 입력 필드 */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-gray-300 px-4 py-3 text-[14px] rounded-[15px]"
              required
            />
          </div>
          
          {/* 비밀번호 입력 필드 */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full border border-gray-300 px-4 py-3 text-[14px] rounded-[15px]"
              required
            />
          </div>

          {/* 로그인 보조 기능 (자동 로그인, 비밀번호 찾기) */}
          <div className="flex items-center justify-between px-1">
            {/* 자동 로그인 체크박스 */}
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                id="remember-me"
              />
              <label htmlFor="remember-me" className="ml-2 text-[#AB9B9B] text-[14px]">
                Remember me
              </label>
            </div>
            {/* 비밀번호 찾기 링크 */}
            <div>
              <Link to="/forgot-password" className="text-blue-500 text-[14px]">
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="w-full bg-yellow-400 py-3 font-montserrat text-[14px] text-white hover:bg-yellow-500 mt-4 rounded-[15px]"
          >
            Login
          </button>
        </form>

        {/* 소셜 로그인 섹션 */}
        <div className="mt-6 font-montserrat">
          {/* 구분선과 텍스트 */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#FFFBF6] px-4 text-[#AB9B9B] text-[14px]">or continue with</span>
            </div>
          </div>

          {/* 소셜 로그인 버튼 (현재는 더미 버튼) */}
          <div className="mt-6 flex justify-center">
            <Button 
              variant="ghost"
              size="large"
              icon={GoogleLogo}
              onClick={() => {/* 구글 로그인 처리 */}}
            />
          </div>
        </div>

        {/* 회원가입 링크 섹션 */}
        <div className="text-center mt-6 font-montserrat">
          <span className="text-[#AB9B9B] text-[14px]">New member? </span>
          <Link to="/signup" className="font-semibold text-yellow-700 text-[14px]">
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
}