  import { Logo } from '../components/Logo';
  import { Link } from 'react-router-dom';
  import { Button } from '../components/Button';
  import GoogleLogo from '../assets/logo_goauth.png'

  export function Login() {
    return (
      // 전체 페이지 컨테이너 - 세로 중앙 정렬, 배경색 설정
      <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#FFFBF6]">
        <div className="w-full max-w-sm space-y-8">
          {/* 로고 섹션 */}
          <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 font-fredoka">Bee Time</h1>
            <Logo />
          </div>

          {/* 로그인 폼 섹션 */}
          <form className="mt-8 space-y-4 font-montserrat">
            {/* 이메일 입력 필드 */}
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 px-4 py-3 text-[14px]"
                style={{ borderRadius: '15px' }}  // 여기서 수치로 조절
                required
              />
            </div>
            
            {/* 비밀번호 입력 필드 */}
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 px-4 py-3 text-[14px]"
                style={{ borderRadius: '15px' }}  // 여기서 수치로 조절
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
          </form>
          <div>
            {/* 로그인 버튼 */}
            <button
              type="submit"
              className="w-full bg-yellow-400 py-3 font-montserrat text-[14px] text-white hover:bg-yellow-500 mt-4"
              style={{ borderRadius: '15px' }}  // 여기서 수치로 조절
            >
              Login
            </button>
          </div>

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