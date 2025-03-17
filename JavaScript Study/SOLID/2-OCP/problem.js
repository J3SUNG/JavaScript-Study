// OCP를 위반하는 Notification 컴포넌트
import React from 'react';
import './Notification.css';

// 개방-폐쇄 원칙 위반:
// 1. 새로운 알림 타입을 추가하려면 컴포넌트 내부를 직접 수정해야 함
// 2. 타입에 따른 스타일과 아이콘이 컴포넌트에 하드코딩되어 있음
// 3. 조건문 분기가 컴포넌트 내부에 직접 구현되어 있음

const Notification = ({ type, message }) => {
  let icon;
  let className = 'notification';
  
  // 조건부 렌더링을 위한 긴 if-else 체인
  // 새 타입 추가 시 이 부분을 수정해야 함 (OCP 위반)
  if (type === 'success') {
    icon = '✅';
    className += ' notification-success';
  } else if (type === 'error') {
    icon = '❌';
    className += ' notification-error';
  } else if (type === 'warning') {
    icon = '⚠️';
    className += ' notification-warning';
  } else if (type === 'info') {
    icon = 'ℹ️';
    className += ' notification-info';
  } else {
    // 기본값
    icon = '📣';
    className += ' notification-default';
  }

  // 알림 지속 시간도 타입에 따라 다르게 설정 (OCP 위반)
  let duration;
  switch (type) {
    case 'error':
      duration = 10000; // 에러는 10초
      break;
    case 'warning':
      duration = 5000; // 경고는 5초
      break;
    case 'success':
      duration = 3000; // 성공은 3초
      break;
    default:
      duration = 4000; // 기본값 4초
  }

  // 알림 액션도 타입에 따라 다르게 설정 (OCP 위반)
  let action;
  if (type === 'error') {
    action = <button className="notification-button">신고하기</button>;
  } else if (type === 'warning') {
    action = <button className="notification-button">확인하기</button>;
  } else if (type === 'success') {
    action = <button className="notification-button">확인</button>;
  }

  return (
    <div className={className} data-duration={duration}>
      <div className="notification-icon">{icon}</div>
      <div className="notification-content">
        <p>{message}</p>
        {action && <div className="notification-action">{action}</div>}
      </div>
    </div>
  );
};

// 사용 예시
const App = () => {
  return (
    <div>
      <Notification type="success" message="작업이 성공적으로 완료되었습니다!" />
      <Notification type="error" message="오류가 발생했습니다. 다시 시도해주세요." />
      <Notification type="warning" message="이 작업은 되돌릴 수 없습니다." />
      <Notification type="info" message="새로운 기능이 추가되었습니다." />
    </div>
  );
};

export default Notification;
