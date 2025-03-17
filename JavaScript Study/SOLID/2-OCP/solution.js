// 1. 알림 타입 설정을 외부로 분리
// notificationConfig.js
export const notificationConfig = {
  success: {
    icon: '✅',
    className: 'notification-success',
    duration: 3000,
    action: { text: '확인', handler: () => console.log('Success confirmed') }
  },
  error: {
    icon: '❌',
    className: 'notification-error',
    duration: 10000,
    action: { text: '신고하기', handler: () => console.log('Error reported') }
  },
  warning: {
    icon: '⚠️',
    className: 'notification-warning',
    duration: 5000,
    action: { text: '확인하기', handler: () => console.log('Warning acknowledged') }
  },
  info: {
    icon: 'ℹ️',
    className: 'notification-info',
    duration: 4000,
    action: null
  },
  // 새로운 알림 타입을 추가할 때는 여기에 설정만 추가하면 됨 (OCP 준수)
  critical: {
    icon: '🔴',
    className: 'notification-critical',
    duration: 0, // 수동으로 닫을 때까지 유지
    action: { text: '긴급 조치', handler: () => console.log('Critical action taken') }
  }
};

// 2. 기본 설정
export const defaultConfig = {
  icon: '📣',
  className: 'notification-default',
  duration: 4000,
  action: null
};

// 3. 알림 팩토리 (Factory Pattern 적용)
export const createNotification = (type, message, customConfig = {}) => {
  // 기본 설정에 타입별 설정을 덮어씌우고, 추가로 커스텀 설정을 덮어씌움
  const config = {
    ...defaultConfig,
    ...(notificationConfig[type] || {}),
    ...customConfig
  };
  
  return {
    type,
    message,
    config
  };
};

// 4. 개선된 Notification 컴포넌트
import React from 'react';
import './Notification.css';

// OCP를 준수하는 Notification 컴포넌트
const Notification = ({ type, message, customConfig }) => {
  // 팩토리를 통해 알림 객체 생성
  const notification = createNotification(type, message, customConfig);
  const { config } = notification;
  
  // 클래스명 생성
  const className = `notification ${config.className}`;
  
  // 액션 버튼 렌더링 함수
  const renderAction = () => {
    if (!config.action) return null;
    
    return (
      <div className="notification-action">
        <button 
          className="notification-button"
          onClick={config.action.handler}
        >
          {config.action.text}
        </button>
      </div>
    );
  };
  
  return (
    <div className={className} data-duration={config.duration}>
      <div className="notification-icon">{config.icon}</div>
      <div className="notification-content">
        <p>{message}</p>
        {renderAction()}
      </div>
    </div>
  );
};

// 5. 사용 예시
const App = () => {
  return (
    <div>
      {/* 기본 사용법 */}
      <Notification type="success" message="작업이 성공적으로 완료되었습니다!" />
      <Notification type="error" message="오류가 발생했습니다. 다시 시도해주세요." />
      <Notification type="warning" message="이 작업은 되돌릴 수 없습니다." />
      <Notification type="info" message="새로운 기능이 추가되었습니다." />
      
      {/* 새로 추가된 타입 (기존 코드 수정 없이 확장 가능) */}
      <Notification type="critical" message="시스템 오류가 발생했습니다!" />
      
      {/* 커스텀 설정으로 기존 타입 재정의 */}
      <Notification 
        type="success" 
        message="커스텀 성공 메시지" 
        customConfig={{
          icon: '🎉',
          duration: 8000,
          action: { text: '축하하기', handler: () => console.log('Celebrated!') }
        }}
      />
    </div>
  );
};

export default Notification;
