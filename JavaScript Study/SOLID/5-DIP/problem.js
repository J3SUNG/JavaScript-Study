// DIP를 위반하는 사용자 목록 컴포넌트
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css';

// 의존성 역전 원칙 위반:
// 1. 컴포넌트가 직접 구체적인 API 호출 방식에 의존
// 2. API 엔드포인트가 컴포넌트에 하드코딩됨
// 3. 상위 모듈(컴포넌트)이 하위 모듈(axios, API 세부 구현)에 직접 의존

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [filterText, setFilterText] = useState('');
  
  // 사용자 데이터 가져오기 - 컴포넌트가 직접 API를 호출 (DIP 위반)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // API 엔드포인트가 컴포넌트에 하드코딩됨 (DIP 위반)
        const response = await axios.get('https://api.example.com/users');
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('사용자 목록을 불러오는데 실패했습니다.');
        setLoading(false);
        console.error('API 호출 오류:', err);
      }
    };

    fetchUsers();
  }, []);
  
  // 사용자 추가 - 컴포넌트가 직접 API를 호출 (DIP 위반)
  const addUser = async (user) => {
    try {
      const response = await axios.post('https://api.example.com/users', user);
      setUsers([...users, response.data]);
    } catch (err) {
      setError('사용자 추가에 실패했습니다.');
      console.error('API 호출 오류:', err);
    }
  };
  
  // 사용자 삭제 - 컴포넌트가 직접 API를 호출 (DIP 위반)
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`https://api.example.com/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      setError('사용자 삭제에 실패했습니다.');
      console.error('API 호출 오류:', err);
    }
  };
  
  // 사용자 정보 업데이트 - 컴포넌트가 직접 API를 호출 (DIP 위반)
  const updateUser = async (userId, updatedData) => {
    try {
      const response = await axios.put(`https://api.example.com/users/${userId}`, updatedData);
      setUsers(users.map(user => user.id === userId ? response.data : user));
    } catch (err) {
      setError('사용자 정보 업데이트에 실패했습니다.');
      console.error('API 호출 오류:', err);
    }
  };
  
  // 사용자 목록 정렬 기능
  const sortedUsers = [...users].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'email') {
      return a.email.localeCompare(b.email);
    } else if (sortBy === 'joinDate') {
      return new Date(a.joinDate) - new Date(b.joinDate);
    }
    return 0;
  });
  
  // 사용자 목록 필터링 기능
  const filteredUsers = sortedUsers.filter(user => 
    user.name.toLowerCase().includes(filterText.toLowerCase()) ||
    user.email.toLowerCase().includes(filterText.toLowerCase())
  );
  
  // 정렬 기준 변경 핸들러
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  
  // 필터 텍스트 변경 핸들러
  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };
  
  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;
  
  return (
    <div className="user-list-container">
      <div className="user-list-controls">
        <div className="filter-control">
          <input
            type="text"
            placeholder="이름 또는 이메일로 검색..."
            value={filterText}
            onChange={handleFilterChange}
          />
        </div>
        <div className="sort-control">
          <select value={sortBy} onChange={handleSortChange}>
            <option value="name">이름순</option>
            <option value="email">이메일순</option>
            <option value="joinDate">가입일순</option>
          </select>
        </div>
      </div>
      
      <ul className="user-list">
        {filteredUsers.map(user => (
          <li key={user.id} className="user-item">
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <p>가입일: {new Date(user.joinDate).toLocaleDateString()}</p>
            </div>
            <div className="user-actions">
              <button onClick={() => updateUser(user.id, { ...user, status: 'active' })}>
                활성화
              </button>
              <button onClick={() => deleteUser(user.id)}>
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
      
      {filteredUsers.length === 0 && (
        <div className="no-results">검색 결과가 없습니다.</div>
      )}
      
      <button 
        className="add-user-button"
        onClick={() => addUser({ name: '새 사용자', email: 'new@example.com', joinDate: new Date().toISOString() })}
      >
        새 사용자 추가
      </button>
    </div>
  );
};

export default UserList;
