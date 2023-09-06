import React from 'react';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
}

const Input: React.FC<InputProps> = ({ children, value, placeholder, onChange, ...rest }) => {
  const inputClass = 'border border-stone-300 p-2 rounded-md'
    return (
      <input
        className={inputClass}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        {...rest}
        >
        { children }
      </input>
    );
};

export default Input