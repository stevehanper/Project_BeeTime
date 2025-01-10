import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Location } from '../types';
import BackButtonIcon from '../assets/btn_icon_arrow.png';

export const Information = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    locationId: ''
  });
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    // 지점 목록 가져오기
    fetch('http://localhost:3000/locations')
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(error => console.error('지점 목록 조회 실패:', error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');

    try {
      const response = await fetch(`http://localhost:3000/auth/update-user-info`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        },
        body: JSON.stringify({
          userId: user.id,
          name: formData.name,
          locationId: parseInt(formData.locationId)
        }),
      });

      if (!response.ok) throw new Error('정보 업데이트에 실패했습니다.');
      
      const data = await response.json();
      
      // 새로운 토큰과 사용자 정보 저장
      const storage = localStorage.getItem('rememberMe') ? localStorage : sessionStorage;
      storage.setItem('token', data.token);
      storage.setItem('user', JSON.stringify(data.user));

      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#FFFBF6]">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex items-center">
          <img 
            src={BackButtonIcon} 
            alt="back" 
            className="w-6 h-6 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-4xl font-bold mb-4 font-fredoka text-center flex-1">Member Info</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Full Name (as used at work)"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-300 px-4 py-3 rounded-[15px]"
            required
          />

          <select
            value={formData.locationId}
            onChange={(e) => setFormData({ ...formData, locationId: e.target.value })}
            className="w-full border border-gray-300 px-4 py-3 rounded-[15px] bg-[#BA7BF7] text-white"
            required
          >
            <option value="">Work Place</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name} {location.branch ? `(${location.branch})` : ''}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-white py-3 rounded-[15px] hover:bg-yellow-500 font-montserrat"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};
