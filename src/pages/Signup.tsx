import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import BackButtonIcon from '../assets/btn_icon_arrow.png';
import DownArrowIcon from '../assets/icon_under_arrow.png';
import { Button } from '../components/Button';


export const Signup = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100vh] bg-[#FFFBF6] p-2">
        <div className="w-full max-w-sm space-y-8">
          {/* 뒤로가기 버튼 */}
          <Link to="/" className="flex items-center text-gray-500 text-lg">
            <Button variant="back" size="medium" icon={BackButtonIcon}>
            </Button>
          </Link>
  
          {/* 계정 생성 제목 */}
          <h1 className="text-3xl font-bold mb-6 font-fredoka text-center">Create Account</h1>
          
          <form className="py-10 space-y-4 font-montserrat">
            {/* 전체 이름 입력란 */}
            <input
              type="text"
              placeholder="Full Name (as used at work)"
              className="w-full border border-[#C5ABAB] px-4 py-3 rounded-[15px] placeholder:text-[#AB9B9B] font-montserrat"
              required
            />
            {/* 이메일 입력란 */}
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-[#C5ABAB] px-4 py-3 rounded-[15px] placeholder:text-[#AB9B9B] font-montserrat"
              required
            />
            {/* 비밀번호 입력란 */}
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-[#C5ABAB] px-4 py-3 rounded-[15px] placeholder:text-[#AB9B9B] font-montserrat"
              required
            />
  
            {/* 직장 선택 드롭다운 */}
            <div className="relative">
            <select
              className="w-full border border-[#C5ABAB] px-4 py-3 rounded-[15px] appearance-none pr-8 font-montserrat text-[#AB9B9B]"
              defaultValue="" // 초기에 선택된 값
            >
                <option value="" disabled hidden>Work Place</option>
                <option value="sorrel">Sorrel Cafe & Bar</option>
                <option value="baskin1">BaskinRobbins-Circular Quay</option>
                <option value="baskin2">BaskinRobbins-Manly</option>
                <option value="sushiro">Sushiro</option>
              </select>
              <img src={DownArrowIcon} alt="arrow" className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          
            <div className='py-8'></div>
            {/* 로고와 가입 버튼 */}
            <div className="flex items-center w-full">
              <Logo className="mr-2" />
              <button className="flex-1 bg-yellow-400 ml-10 py-3 font-montserrat text-white hover:bg-yellow-500 rounded-[15px]">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };