import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'; // Не забудь создать стили

/**
 * Универсальный компонент кнопки.
 * 
 * @component
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'danger' | 'outline'} props.variant - Вариант оформления кнопки
 * @param {'button' | 'submit' | 'reset'} props.type - Тип кнопки
 * @param {boolean} props.disabled - Состояние блокировки
 * @param {function} props.onClick - Функция обработчик клика
 * @param {React.ReactNode} props.children - Текст или иконка внутри кнопки
 */
const Button = ({ 
  variant = 'primary', 
  type = 'button', 
  disabled = false, 
  onClick, 
  children, 
  ...props 
}) => {
  return (
    <button
      type={type}
      className={`custom-btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'outline']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;