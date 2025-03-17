// 1. API 통신을 담당하는 별도의 서비스
// userService.js
import axios from 'axios';

export const userService = {
  async getUser(userId) {
    try {
      const response = await axios.get(`https://api.example.com/users/${userId}`);
      return { data: response.data, error: null };
    } catch (err) {
      console.error('API 호출 오류:', err);
      return { data: null, error: '사용자 정보를 불러오는데 실패했습니다.' };
    }
  }
};

// 2. 데이터 포맷팅을 담당하는 유틸리티
// formatUtils.js
export const formatUtils = {
  formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  },
  
  formatAddress(address) {
    return `${address.city}, ${address.street}, ${address.zipCode}`;
  }
};

// 3. 유효성 검사를 담당하는 유틸리티
// validationUtils.js
export const validationUtils = {
  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
};

// 4. 데이터 페칭 로직을 담당하는 커스텀 훅
// useUser.js
import { useState, useEffect } from 'react';
import { userService } from './userService';

export const useUser = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data, error } = await userService.getUser(userId);
      setUser(data);
      setError(error);
      setLoading(false);
    };

    fetchUser();
  }, [userId]);

  return { user, loading, error };
};

// 5. UI 표시만 담당하는 프레젠테이션 컴포넌트
// UserProfile.jsx
import React from 'react';
import { useUser } from './useUser';
import { formatUtils } from './formatUtils';
import { validationUtils } from './validationUtils';

// 사용자 통계를 표시하는 별도의 컴포넌트
const UserStats = ({ stats }) => (
  <div className="user-stats">
    <h3>통계</h3>
    <p>게시물: {stats.posts}</p>
    <p>팔로워: {stats.followers}</p>
    <p>팔로잉: {stats.following}</p>
  </div>
);

// 사용자 기본 정보를 표시하는 별도의 컴포넌트
const UserInfo = ({ user }) => (
  <div className="user-info">
    <p>
      이메일: {user.email} 
      {validationUtils.validateEmail(user.email) ? '(유효)' : '(유효하지 않음)'}
    </p>
    <p>가입일: {formatUtils.formatDate(user.joinDate)}</p>
    <p>주소: {formatUtils.formatAddress(user.address)}</p>
  </div>
);

// 메인 UserProfile 컴포넌트는 이제 UI 조합과 상태 관리만 담당
const UserProfile = ({ userId }) => {
  const { user, loading, error } = useUser(userId);

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!user) return <div className="error">사용자를 찾을 수 없습니다.</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <UserInfo user={user} />
      <UserStats stats={user.stats} />
    </div>
  );
};

export default UserProfile;
