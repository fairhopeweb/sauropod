import React from 'react';

interface TextInputProps {
  label?: string,
  placeholder: string,
  onChange: Function,
  hasError?: boolean,
  value: string,
}

const TextInput = ({ label, placeholder, onChange, hasError, value } : TextInputProps) => {
  return (
    <>
      {label && <label className="text-gray-700">{ label }</label>}
      <input 
        type="text"
        placeholder={placeholder}
        className={`
          w-full
          rounded-md
          p-3
          border-solid
          border-gray-500
          border-2
          ${hasError ? 'border-red-500 animate__animated animate__shakeX' : ''}`}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </>
  );
}

export default TextInput;