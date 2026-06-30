import { APP_TITLE, NAV_ITEMS } from '@/constants';
import { NavLink } from 'react-router-dom';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
  const baseClass = 'text-body1 pb-1 transition-all cursor-pointer';
  const activeClass = 'border-b-1 border-[#4880EE]';

  return `${baseClass} ${isActive ? activeClass : ''}`;
};

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-[80px] w-full items-center bg-white">
      <h1 className="text-title1 shrink-0 px-[160px]">{APP_TITLE}</h1>
      <nav className="shrink-0">
        <ul className="flex gap-[56px] px-[240px]">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={getNavLinkClass}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
