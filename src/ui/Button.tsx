import React from 'react';

interface ButtonProps {
  children: React.ReactNode,
  onClick?: Function,
  fullWidth?: boolean,
  className?: string,
}

const Button = ({ children, onClick, fullWidth, className } : ButtonProps) => {
  return (
    <button 
      className={`
        p-3
        bg-white
        text-black
        rounded-md
        outline-none
        border-none
        shadow-md
        ${fullWidth ? 'w-full flex justify-center' : ''}
        ${className ? className : ''}
      `}
      onClick={() => { onClick && onClick() }}
    >
      { children }
    </button>
  );
}

export default Button;