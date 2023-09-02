import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  const btnClass = 'flex justify-center items-center p-2 font-bold mx-4 '
  const behavior =
    'bg-sky-300 rounded-md hover:bg-sky-400 rounded-md active:bg-sky-500 focus:outline-none focus:ring focus:ring-sky-300'

    return (
      <button className={btnClass + behavior} onClick={onClick}>
        {children}
      </button>
    );
};

export default Button