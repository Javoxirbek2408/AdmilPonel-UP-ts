import type { ButtonHTMLAttributes, FC } from 'react';
import { cn } from '../../lib/utils';
import type React from 'react';

interface PropsBtn extends ButtonHTMLAttributes<HTMLButtonElement> {
  clasName?: string;
  children: React.ReactNode;
}

export const Btn: FC<PropsBtn> = ({ children, className, type = 'button', onClick,
  disabled=false,
  ...props
 }) => (
  <button
    disabled={disabled}
    className={cn(
      'py-2 px-5 bg-gray-800 shadow-xl font-bold text-white hover:bg-gray-600 duration-300 ease-in-out rounded-md cursor-pointer disabled:cursor-auto disabled:opacity-50 disabled:hover:bg-gray-800',
      className
    )}
    type={type }
    onClick={onClick}
  >
    {children}
  </button>
);
export default Btn;
