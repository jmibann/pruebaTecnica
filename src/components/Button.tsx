import React from 'react';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement>{
  isActive?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, isActive }) => {
  const btnClass = 'flex justify-center items-center p-2 font-bold mx-4 '
  const hover = ' hover:bg-sky-400';
  const active= ' active:bg-sky-500';
  const focus = ' focus:outline-none focus:ring focus:ring-sky-300';

  const behavior = `${isActive ? 'bg-sky-500' : 'bg-sky-300'} rounded-md` + hover + active + focus;

    return (
      <button className={btnClass + behavior} onClick={onClick}>
        {children}
      </button>
    );
};

export default Button