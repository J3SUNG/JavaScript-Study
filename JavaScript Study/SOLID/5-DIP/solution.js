// DIP를 준수하도록 리팩토링된 사용자 목록 관련 코드

// 1. 추상화된 사용자 데이터 서비스 인터페이스 정의
// userServiceInterface.js
export const UserServiceInterface = {
  getUsers: async () => { throw new Error('getUsers 메서드를 구현해야 합니다.') },
  addUser: async (user) => { throw new Error('addUser 메서드를 구현해야 합니다.') },
  deleteUser: async (userId) => { throw new Error('deleteUser 메서드를 구현해야 합니다.') },
  updateUser: async (userId, userData) => { throw new Error('updateUser 메서드를 구현해야 합니다.') }
};

// 2. 실제 API 구현 (콘크리트 클래스)
// apiUserService.js
import axios from 'axios';

export class ApiUserService {
  constructor(baseUrl = 'https://api.example.com') {
    this.baseUrl = baseUrl;
  }
  
  async getUsers() {
    try {
      const response = await axios.get(`${this.baseUrl}/users`);
      return { data: response.data, error: null };
    } catch (error) {
      console.error('사용자 목록 조회 실패:', error);
      return { data: null, error: '사용자 목록을 불러오는데 실패했습니다.' };
    }
  }
  
  async addUser(user) {
    try {
      const response = await axios.post(`${this.baseUrl}/users`, user);
      return { data: response.data, error: null };
    } catch (error) {
      console.error('사용자 추가 실패:', error);
      return { data: null, error: '사용자 추가에 실패했습니다.' };
    }
  }
  
  async deleteUser(userId) {
    try {
      await axios.delete(`${this.baseUrl}/users/${userId}`);
      return { error: null };
    } catch (error) {
      console.error('사용자 삭제 실패:', error);
      return { error: '사용자 삭제에 실패했습니다.' };
    }
  }
  
  async updateUser(userId, userData) {
    try {
      const response = await axios.put(`${this.baseUrl}/users/${userId}`, userData);
      return { data: response.data, error: null };
    } catch (error) {
      console.error('사용자 정보 업데이트 실패:', error);
      return { data: null, error: '사용자 정보 업데이트에 실패했습니다.' };
    }
  }
}

// 3. 로컬 스토리지 사용 구현 (다른 구현체 예시)
// localStorageUserService.js
export class LocalStorageUserService {
  constructor(storageKey = 'users') {
    this.storageKey = storageKey;
    // 로컬 스토리지 초기화 (없는 경우)
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }
  
  async getUsers() {
    try {
      const users = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
      return { data: users, error: null };
    } catch (error) {
      console.error('로컬 스토리지에서 사용자 목록 조회 실패:', error);
      return { data: null, error: '사용자 목록을 불러오는데 실패했습니다.' };
    }
  }
  
  async addUser(user) {
    try {
      const users = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
      const newUser = {
        ...user,
        id: Date.now().toString() // 간단한 ID 생성
      };
      
      users.push(newUser);
      localStorage.setItem(this.storageKey, JSON.stringify(users));
      
      return { data: newUser, error: null };
    } catch (error) {
      console.error('로컬 스토리지에 사용자 추가 실패:', error);
      return { data: null, error: '사용자 추가에 실패했습니다.' };
    }
  }
  
  async deleteUser(userId) {
    try {
      const users = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
      const updatedUsers = users.filter(user => user.id !== userId);
      
      localStorage.setItem(this.storageKey, JSON.stringify(updatedUsers));
      
      return { error: null };
    } catch (error) {
      console.error('로컬 스토리지에서 사용자 삭제 실패:', error);
      return { error: '사용자 삭제에 실패했습니다.' };
    }
  }
  
  async updateUser(userId, userData) {
    try {
      const users = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
      const updatedUsers = users.map(user => 
        user.id === userId ? { ...user, ...userData } : user
      );
      
      localStorage.setItem(this.storageKey, JSON.stringify(updatedUsers));
      const updatedUser = updatedUsers.find(user => user.id === userId);
      
      return { data: updatedUser, error: null };
    } catch (error) {
      console.error('로컬 스토리지에서 사용자 정보 업데이트 실패:', error);
      return { data: null, error: '사용자 정보 업데이트에 실패했습니다.' };
    }
  }
}

// 4. 테스트용 모의 데이터 서비스 구현 (테스트용)
// mockUserService.js
export class MockUserService {
  constructor() {
    this.users = [
      { id: '1', name: '홍길동', email: 'hong@example.com', joinDate: '2022-01-01T00:00:00Z' },
      { id: '2', name: '김철수', email: 'kim@example.com', joinDate: '2022-02-15T00:00:00Z' },
      { id: '3', name: '이영희', email: 'lee@example.com', joinDate: '2022-03-20T00:00:00Z' }
    ];
  }
  
  async getUsers() {
    return { data: this.users, error: null };
  }
  
  async addUser(user) {
    const newUser = {
      ...user,
      id: (this.users.length + 1).toString()
    };
    
    this.users.push(newUser);
    return { data: newUser, error: null };
  }
  
  async deleteUser(userId) {
    this.users = this.users.filter(user => user.id !== userId);
    return { error: null };
  }
  
  async updateUser(userId, userData) {
    const index = this.users.findIndex(user => user.id === userId);
    
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...userData };
      return { data: this.users[index], error: null };
    }
    
    return { data: null, error: '사용자를 찾을 수 없습니다.' };
  }
}

// 5. 사용자 서비스 팩토리 (의존성 주입을 위한 팩토리)
// userServiceFactory.js
import { ApiUserService } from './apiUserService';
import { LocalStorageUserService } from './localStorageUserService';
import { MockUserService } from './mockUserService';

// 서비스 타입에 따른 인스턴스 생성
export const createUserService = (type, config = {}) => {
  switch (type) {
    case 'api':
      return new ApiUserService(config.baseUrl);
    case 'localStorage':
      return new LocalStorageUserService(config.storageKey);
    case 'mock':
      return new MockUserService();
    default:
      throw new Error(`알 수 없는 사용자 서비스 타입: ${type}`);
  }
};

// 6. 사용자 데이터 관리를 위한 커스텀 훅 (React 컴포넌트와 서비스 계층 사이의 어댑터)
// useUsers.js
import { useState, useEffect } from 'react';

export const useUsers = (userService) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 사용자 목록 조회
  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await userService.getUsers();
    
    if (error) {
      setError(error);
    } else {
      setUsers(data || []);
      setError(null);
    }
    
    setLoading(false);
  };
  
  // 사용자 추가
  const addUser = async (user) => {
    const { data, error } = await userService.addUser(user);
    
    if (error) {
      setError(error);
      return null;
    } else {
      setUsers(prev => [...prev, data]);
      return data;
    }
  };
  
  // 사용자 삭제
  const deleteUser = async (userId) => {
    const { error } = await userService.deleteUser(userId);
    
    if (error) {
      setError(error);
      return false;
    } else {
      setUsers(prev => prev.filter(user => user.id !== userId));
      return true;
    }
  };
  
  // 사용자 정보 업데이트
  const updateUser = async (userId, userData) => {
    const { data, error } = await userService.updateUser(userId, userData);
    
    if (error) {
      setError(error);
      return null;
    } else {
      setUsers(prev => prev.map(user => 
        user.id === userId ? data : user
      ));
      return data;
    }
  };
  
  // 컴포넌트 마운트 시 사용자 목록 조회
  useEffect(() => {
    fetchUsers();
  }, []);
  
  return {
    users,
    loading,
    error,
    fetchUsers,
    addUser,
    deleteUser,
    updateUser
  };
};

// 7. 의존성 주입을 통해 UserService를 제공하는 Context Provider
// UserServiceProvider.jsx
import React, { createContext, useContext } from 'react';
import { createUserService } from './userServiceFactory';

// 사용자 서비스 컨텍스트 생성
const UserServiceContext = createContext(null);

// 사용자 서비스 제공자 컴포넌트
export const UserServiceProvider = ({ 
  children, 
  serviceType = 'api',
  serviceConfig = {}
}) => {
  // 서비스 인스턴스 생성
  const userService = createUserService(serviceType, serviceConfig);
  
  return (
    <UserServiceContext.Provider value={userService}>
      {children}
    </UserServiceContext.Provider>
  );
};

// 사용자 서비스를 사용하기 위한 커스텀 훅
export const useUserService = () => {
  const context = useContext(UserServiceContext);
  
  if (!context) {
    throw new Error('useUserService must be used within a UserServiceProvider');
  }
  
  return context;
};

// 8. DIP를 준수하는 UserList 컴포넌트
// UserList.jsx
import React, { useState } from 'react';
import { useUserService } from './UserServiceProvider';
import { useUsers } from './useUsers';
import './UserList.css';

const UserList = () => {
  const userService = useUserService();
  const { 
    users, 
    loading, 
    error, 
    addUser, 
    deleteUser, 
    updateUser 
  } = useUsers(userService);
  
  const [sortBy, setSortBy] = useState('name');
  const [filterText, setFilterText] = useState('');
  
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
  
  // 새 사용자 추가 핸들러
  const handleAddUser = () => {
    addUser({ 
      name: '새 사용자', 
      email: 'new@example.com', 
      joinDate: new Date().toISOString() 
    });
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
        onClick={handleAddUser}
      >
        새 사용자 추가
      </button>
    </div>
  );
};

// 9. 앱 컴포넌트 (사용 예시)
// App.jsx
import React from 'react';
import { UserServiceProvider } from './UserServiceProvider';
import UserList from './UserList';

const App = () => {
  // 환경에 따라 다른 서비스 타입 사용 가능
  const isDevelopment = process.env.NODE_ENV === 'development';
  const serviceType = isDevelopment ? 'mock' : 'api';
  
  // API 기본 URL을 환경 변수에서 가져올 수 있음
  const serviceConfig = {
    baseUrl: process.env.REACT_APP_API_URL || 'https://api.example.com'
  };
  
  return (
    <UserServiceProvider 
      serviceType={serviceType} 
      serviceConfig={serviceConfig}
    >
      <div className="app">
        <h1>사용자 관리</h1>
        <UserList />
      </div>
    </UserServiceProvider>
  );
};

export default App;
