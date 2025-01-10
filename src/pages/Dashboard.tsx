import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        // 로컬 스토리지에서 인증 정보 삭제
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
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