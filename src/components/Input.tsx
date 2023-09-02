import React from 'react';

interface InputProps {
  children?: React.ReactNode;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ children, value, placeholder, onChange }) => {
  const inputClass = 'border border-stone-300 p-2 rounded-md'
    return (
      <input
        className={inputClass}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        >
        { children }
      </input>
    );
};

export default Input