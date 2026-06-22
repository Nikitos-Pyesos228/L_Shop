import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

/**
 * Стандартизированное поле ввода.
 * 
 * @component
 * @param {Object} props
 * @param {string} props.label - Заголовок поля
 * @param {string} props.type - Тип инпута (text, password, email и т.д.)
 * @param {string} props.placeholder - Подсказка внутри поля
 * @param {string} props.value - Значение
 * @param {function} props.onChange - Обработчик изменения значения
 * @param {string} props.error - Сообщение об ошибке (если есть)
 */
const Input = ({ label, type = 'text', placeholder, value, onChange, error, ...props }) => {
  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        className={`custom-input ${error ? 'input-error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default Input;