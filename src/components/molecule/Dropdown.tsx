import { useState, useRef } from 'react';
import useClickOutside from '@/helpers/useClickOutside';
import ChevronDownIcon from '@/assets/images/ic_chevron_down.svg';
import clsx from 'clsx';

export interface DropdownOption<T extends string> {
  value: T;
  label: string;
}

interface DropdownProps<T extends string> {
  options: DropdownOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export default function Dropdown<T extends string>({
  options,
  value,
  onChange,
  className = '',
}: DropdownProps<T>) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useClickOutside([dropdownRef], () => setIsOpen(false));

  const activeLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <div
      ref={dropdownRef}
      className={`relative h-[36px] w-full shrink-0 border-b border-b-[#D2D6DA] px-[8px] py-[6px] ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full cursor-pointer items-center justify-between text-[14px] font-bold select-none"
      >
        {activeLabel}
        <div className="flex size-[20px] items-center justify-center">
          <img
            src={ChevronDownIcon}
            className={clsx('h-[6px] w-[10.5px] transition-transform', isOpen ? '-rotate-180' : '')}
          />
        </div>
      </button>

      {isOpen && (
        <ul
          className="absolute bottom-[-6px] left-0 z-10 w-full translate-y-full bg-white"
          style={{ boxShadow: '0px 0px 4px 0px #00000040' }}
        >
          {options
            .filter((opt) => opt.value !== value)
            .map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className="text-caption hover:bg-lightgray h-[30px] w-full cursor-pointer px-[8px] py-[4px] text-left text-[14px] text-[#8D94A0]"
                >
                  {opt.label}
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
