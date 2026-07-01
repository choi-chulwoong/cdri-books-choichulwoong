import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'ghost';
export type ButtonSize = 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rightIcon?: ReactNode;
  /** 부모 너비 100% 차지 여부 */
  fullWidth?: boolean;
}

function Button({
  variant = 'primary',
  size = 'md',
  rightIcon,
  fullWidth = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-[5px] h-[48px] rounded-[8px] cursor-pointer' +
    'transition-opacity hover:opacity-80 active:opacity-60 ' +
    'disabled:opacity-40 disabled:cursor-not-allowed';

  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-white',
    ghost: 'text-text-secondary bg-lightgray',
  };

  const sizeStyles: Record<ButtonSize, string> = {
    md: ' py-[16px] text-caption w-[115px]',
    lg: ' py-[12px] text-body w-[240px]',
  };

  return (
    <button
      className={clsx(
        base,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? 'w-full' : '',
        className
      )}
      {...props}
    >
      {children}
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </button>
  );
}
export default Button;
