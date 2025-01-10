import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');

    const handleLogout = () => {
        // localStorage의 모든 인증 관련 데이터 삭제
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('rememberMe');
        
        // sessionStorage의 모든 인증 관련 데이터 삭제
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        
        // 로그인 페이지로 리다이렉트
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[#FFFBF6] p-4">
            <div className="max-w-7xl mx-auto">
                {/* 상단 헤더 */}
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-fredoka">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="font-montserrat">{user.name}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-yellow-400 px-4 py-2 rounded-[15px] text-white font-montserrat hover:bg-yellow-500"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                {/* 대시보드 컨텐츠 */}
                <main>
                    {/* 여기에 대시보드 내용 추가 */}
                </main>
            </div>
        </div>
    );
};