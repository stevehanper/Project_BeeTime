import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { AlertModal } from '../components/AlertModal';
import BackButtonIcon from '../assets/btn_icon_arrow.png';
import DownArrowIcon from '../assets/icon_under_arrow.png';
import { Button } from '../components/Button';

export const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        locationId: ''
    });
    const [locations, setLocations] = useState([]);
    const [error, setError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        password: '',
        locationId: ''
    });

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch('http://localhost:3000/locations');
                const data = await response.json();
                setLocations(data);
            } catch (error) {
                console.error('지점 목록 조회 실패:', error);
                setError('지점 목록을 불러오는데 실패했습니다.');
            }
        };
        fetchLocations();
    }, []);

    const validateForm = () => {
        const errors = {
            name: '',
            email: '',
            password: '',
            locationId: ''
        };
        let isValid = true;

        // 이름 검증
        if (!formData.name.trim()) {
            errors.name = '이름을 입력해주세요';
            isValid = false;
        }

        // 이메일 검증
        if (!formData.email) {
            errors.email = '이메일을 입력해주세요';
            isValid = false;
        } else if (!formData.email.includes('@')) {
            errors.email = '이메일에는 @가 포함되어야 합니다';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = '유효한 이메일 형식이 아닙니다';
            isValid = false;
        }

        // 비밀번호 검증
        if (formData.password.length < 8) {
            errors.password = '비밀번호는 8자 이상이어야 합니다';
            isValid = false;
        }

        // workplace 검증
        if (!formData.locationId) {
            errors.locationId = '근무지를 선택해주세요';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    locationId: parseInt(formData.locationId)
                }),
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || '회원가입에 실패했습니다.');
            }

            // 토큰 저장
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            setShowSuccessModal(true);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSuccessConfirm = () => {
        setShowSuccessModal(false);
        navigate('/dashboard');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[100vh] bg-[#FFFBF6] p-2">
            <div className="w-full max-w-sm space-y-8">
                <Link to="/" className="flex items-center text-gray-500 text-lg">
                    <Button variant="back" size="medium" icon={BackButtonIcon} />
                </Link>

                <h1 className="text-3xl font-bold mb-6 font-fredoka text-center">Create Account</h1>
                
                {error && <div className="text-red-500 text-center">{error}</div>}
                
                <form onSubmit={handleSubmit} className="py-10 space-y-4 font-montserrat">
                    <div>
                        <input
                            type="text"
                            placeholder="Full Name (as used at work)"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full border border-[#C5ABAB] px-4 py-3 rounded-[15px] placeholder:text-[#AB9B9B] font-montserrat"
                            required
                        />
                        {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                    </div>
                    
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full border border-[#C5ABAB] px-4 py-3 rounded-[15px] placeholder:text-[#AB9B9B] font-montserrat"
                            required
                        />
                        {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full border border-[#C5ABAB] px-4 py-3 rounded-[15px] placeholder:text-[#AB9B9B] font-montserrat"
                            required
                        />
                        {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
                    </div>

                    <div className="relative">
                        <select
                            value={formData.locationId}
                            onChange={(e) => setFormData({ ...formData, locationId: e.target.value })}
                            className="w-full border border-[#C5ABAB] px-4 py-3 rounded-[15px] appearance-none pr-8 font-montserrat text-[#AB9B9B]"
                            required
                        >
                            <option value="" disabled>Work Place</option>
                            {locations.map((location) => (
                                <option key={location.id} value={location.id}>
                                    {location.name} {location.branch ? `(${location.branch})` : ''}
                                </option>
                            ))}
                        </select>
                        <img src={DownArrowIcon} alt="arrow" className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        {formErrors.locationId && <p className="text-red-500 text-sm mt-1">{formErrors.locationId}</p>}
                    </div>
                    
                    <div className='py-8'></div>
                    <div className="flex items-center w-full">
                        <Logo className="mr-2" />
                        <button type="submit" className="flex-1 bg-yellow-400 ml-10 py-3 font-montserrat text-white hover:bg-yellow-500 rounded-[15px]">
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
            
            <AlertModal
                isOpen={showSuccessModal}
                message="회원가입이 성공적으로 완료되었습니다!"
                onConfirm={handleSuccessConfirm}
            />
        </div>
    );
};