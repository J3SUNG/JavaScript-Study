// LSP를 위반하는 폼 컴포넌트 예제
import React, { useState } from 'react';

// 기본 Form 컴포넌트
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: props.initialValues || {},
      errors: {},
      isSubmitting: false,
      isValid: true
    };
  }

  // 폼 값 변경 핸들러
  handleChange = (name, value) => {
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value
      }
    }), () => {
      this.validate();
    });
  };

  // 폼 제출 핸들러
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    
    if (this.validate()) {
      this.props.onSubmit(this.state.values);
    }
    
    this.setState({ isSubmitting: false });
  };

  // 폼 유효성 검사
  validate = () => {
    const { values } = this.state;
    const errors = {};
    let isValid = true;
    
    // 필수 필드 검사
    this.props.fields.forEach(field => {
      if (field.required && !values[field.name]) {
        errors[field.name] = '이 필드는 필수입니다.';
        isValid = false;
      }
    });
    
    this.setState({ errors, isValid });
    return isValid;
  };

  // 폼 리셋
  reset = () => {
    this.setState({
      values: this.props.initialValues || {},
      errors: {},
      isValid: true
    });
  };

  render() {
    const { fields, submitButtonText = '제출' } = this.props;
    const { values, errors, isSubmitting, isValid } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {fields.map(field => (
          <div key={field.name} className="form-field">
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.type || 'text'}
              id={field.name}
              name={field.name}
              value={values[field.name] || ''}
              onChange={(e) => this.handleChange(field.name, e.target.value)}
              required={field.required}
            />
            {errors[field.name] && (
              <div className="error">{errors[field.name]}</div>
            )}
          </div>
        ))}
        <div className="form-actions">
          <button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? '제출 중...' : submitButtonText}
          </button>
          <button type="button" onClick={this.reset}>
            리셋
          </button>
        </div>
      </form>
    );
  }
}

// LSP를 위반하는 ReadOnlyForm 컴포넌트
// 기본 Form을 확장하지만 일부 기능을 의도적으로 무시함
class ReadOnlyForm extends Form {
  // 폼 값 변경 핸들러를 오버라이드하여 아무것도 하지 않음
  handleChange = () => {
    // 읽기 전용이므로 값 변경 무시
    console.log('이 폼은 읽기 전용입니다.');
  };

  // 폼 제출 핸들러를 오버라이드하여 다르게 동작
  handleSubmit = (e) => {
    e.preventDefault();
    // 원래 Form의 동작과 다르게 유효성 검사를 건너뜀
    this.props.onSubmit(this.state.values);
  };

  // 리셋 기능을 완전히 비활성화
  reset = () => {
    throw new Error('읽기 전용 폼은 리셋할 수 없습니다.');
  };

  render() {
    const { fields } = this.props;
    const { values } = this.state;

    return (
      <div className="read-only-form">
        {fields.map(field => (
          <div key={field.name} className="form-field">
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.type || 'text'}
              id={field.name}
              name={field.name}
              value={values[field.name] || ''}
              disabled
            />
          </div>
        ))}
        {/* 리셋 버튼 제거 - 부모 컴포넌트의 UI 계약을 위반 */}
        <div className="form-actions">
          <button type="button" onClick={(e) => this.handleSubmit(e)}>
            확인
          </button>
        </div>
      </div>
    );
  }
}

// 사용 예시
const App = () => {
  const handleSubmit = (values) => {
    console.log('제출된 값:', values);
  };

  const fields = [
    { name: 'name', label: '이름', required: true },
    { name: 'email', label: '이메일', required: true, type: 'email' },
    { name: 'age', label: '나이', type: 'number' }
  ];

  const initialValues = {
    name: '홍길동',
    email: 'hong@example.com',
    age: 30
  };

  return (
    <div>
      <h2>기본 폼</h2>
      <Form
        fields={fields}
        initialValues={{}}
        onSubmit={handleSubmit}
        submitButtonText="저장"
      />

      <h2>읽기 전용 폼</h2>
      <ReadOnlyForm
        fields={fields}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitButtonText="확인" // 이 prop은 무시됨
      />
    </div>
  );
};

export default App;
