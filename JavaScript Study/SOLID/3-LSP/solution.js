// LSP를 준수하는 폼 컴포넌트 리팩토링
import React, { useState } from 'react';

// 1. 폼 필드 컴포넌트: 입력 타입에 따라 다른 컴포넌트 렌더링
const FormField = ({ field, value, onChange, error, disabled }) => {
  return (
    <div className="form-field">
      <label htmlFor={field.name}>{field.label}</label>
      <input
        type={field.type || 'text'}
        id={field.name}
        name={field.name}
        value={value || ''}
        onChange={(e) => onChange(field.name, e.target.value)}
        required={field.required}
        disabled={disabled}
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
};

// 2. 폼 액션 컴포넌트: 폼 하단의 버튼들 렌더링
const FormActions = ({ onSubmit, onReset, submitText, showReset = true, disabled = false }) => {
  return (
    <div className="form-actions">
      <button type="submit" onClick={onSubmit} disabled={disabled}>
        {submitText}
      </button>
      {showReset && (
        <button type="button" onClick={onReset}>
          리셋
        </button>
      )}
    </div>
  );
};

// 3. 기본 폼 로직을 담당하는 훅 (컴포넌트 로직 추상화)
const useFormLogic = (fields, initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const validate = () => {
    const newErrors = {};
    let formIsValid = true;
    
    fields.forEach(field => {
      if (field.required && !values[field.name]) {
        newErrors[field.name] = '이 필드는 필수입니다.';
        formIsValid = false;
      }
    });
    
    setErrors(newErrors);
    setIsValid(formIsValid);
    return formIsValid;
  };

  const handleChange = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e && e.preventDefault();
    setIsSubmitting(true);
    
    if (validate()) {
      onSubmit(values);
    }
    
    setIsSubmitting(false);
  };

  const reset = () => {
    setValues(initialValues || {});
    setErrors({});
    setIsValid(true);
  };

  return {
    values,
    errors,
    isSubmitting,
    isValid,
    handleChange,
    handleSubmit,
    reset,
    validate
  };
};

// 4. 기본 Form 컴포넌트 (기능과 UI 결합)
const Form = ({ fields, initialValues, onSubmit, submitButtonText = '제출' }) => {
  const {
    values,
    errors,
    isSubmitting,
    isValid,
    handleChange,
    handleSubmit,
    reset
  } = useFormLogic(fields, initialValues, onSubmit);

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(field => (
        <FormField
          key={field.name}
          field={field}
          value={values[field.name]}
          onChange={handleChange}
          error={errors[field.name]}
          disabled={false}
        />
      ))}
      <FormActions
        onSubmit={handleSubmit}
        onReset={reset}
        submitText={isSubmitting ? '제출 중...' : submitButtonText}
        disabled={!isValid || isSubmitting}
      />
    </form>
  );
};

// 5. ReadOnlyForm 컴포넌트 (상속 대신 합성 사용)
const ReadOnlyForm = ({ fields, initialValues, onSubmit }) => {
  // 같은 인터페이스를 사용하지만, 폼 로직의 일부만 활용
  const { values, handleSubmit } = useFormLogic(fields, initialValues, onSubmit);

  return (
    <div className="read-only-form">
      {fields.map(field => (
        <FormField
          key={field.name}
          field={field}
          value={values[field.name]}
          onChange={() => {}} // 읽기 전용이므로 변경 불가
          error={null}
          disabled={true}
        />
      ))}
      <FormActions
        onSubmit={handleSubmit}
        submitText="확인"
        showReset={false} // 리셋 버튼 표시 안 함
      />
    </div>
  );
};

// 6. 정확한 타입과 의도를 표현하는 ViewOnlyForm 컴포넌트
// ReadOnlyForm보다 더 명확한 이름과 목적을 가진 컴포넌트
const ViewOnlyForm = ({ fields, values }) => {
  return (
    <div className="view-only-form">
      {fields.map(field => (
        <div key={field.name} className="form-field">
          <label>{field.label}</label>
          <div className="field-value">{values[field.name] || '-'}</div>
        </div>
      ))}
    </div>
  );
};

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

      <h2>읽기 전용 폼 (입력 불가, 제출 가능)</h2>
      <ReadOnlyForm
        fields={fields}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />

      <h2>정보 확인 전용 (입력 불가, 제출 불가)</h2>
      <ViewOnlyForm
        fields={fields}
        values={initialValues}
      />
    </div>
  );
};

export default App;
