// React 컴포넌트 예시
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 단일 책임 원칙을 위반하는 UserProfile 컴포넌트
// 이 컴포넌트는:
// 1. UI 렌더링
// 2. API 통신
// 3. 데이터 포맷팅
// 4. 에러 처리
// 등 너무 많은 책임을 가지고 있습니다.

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // API 통신 로직이 컴포넌트 내부에 직접 구현되어 있음
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.example.com/users/${userId}`);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError('사용자 정보를 불러오는데 실패했습니다.');
        setLoading(false);
        console.error('API 호출 오류:', err);
      }
    };

    fetchUser();
  }, [userId]);

  // 데이터 포맷팅 로직이 컴포넌트 내부에 직접 구현되어 있음
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const formatAddress = (address) => {
    return `${address.city}, ${address.street}, ${address.zipCode}`;
  };

  // 유효성 검사 로직도 컴포넌트 내부에 직접 구현되어 있음
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!user) return <div className="error">사용자를 찾을 수 없습니다.</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <div className="user-info">
        <p>이메일: {user.email} {validateEmail(user.email) ? '(유효)' : '(유효하지 않음)'}</p>
        <p>가입일: {formatDate(user.joinDate)}</p>
        <p>주소: {formatAddress(user.address)}</p>
      </div>
      <div className="user-stats">
        <h3>통계</h3>
        <p>게시물: {user.stats.posts}</p>
        <p>팔로워: {user.stats.followers}</p>
        <p>팔로잉: {user.stats.following}</p>
      </div>
    </div>
  );
};

export default UserProfile;
