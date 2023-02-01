import type { ReactNode } from 'react';
import { useState } from 'react';

import clsx from 'clsx';
import Link from 'next/link';
import { HamburgerMenuButton } from 'ui';

import { Logo } from '../../templates/Logo';
import NavbarClassNames from './Navbar.module.css';

const NavbarLink = ({
  children,
  href,
  onClick,
}: {
  children: ReactNode;
  href: string;
  onClick?: () => void;
}) => (
  <li className={NavbarClassNames['navbar-link']}>
    <div className={NavbarClassNames['navbar-link__bg']} />
    <Link href={href} onClick={onClick} className="z-10 drop-shadow">
      {children}
    </Link>
  </li>
);

const Navbar = () => {
  const [isNavOpen, setNavOpen] = useState(false);

  function toggleNav() {
    setNavOpen((is) => !is);
  }

  return (
    <>
      <div className={NavbarClassNames['navbar-wrapper']}>
        <HamburgerMenuButton
          isToggled={isNavOpen}
          onToggle={toggleNav}
          className="sm:hidden"
        />
        <nav
          className={clsx(NavbarClassNames['navbar-nav'], {
            [`${NavbarClassNames['navbar-nav__open']}`]: isNavOpen,
          })}
        >
          <ul className={NavbarClassNames.navbar}>
            <NavbarLink onClick={() => setNavOpen(false)} href="/">
              Strona główna
            </NavbarLink>
            <NavbarLink onClick={() => setNavOpen(false)} href="/#o-nas">
              O nas
            </NavbarLink>
            <NavbarLink onClick={() => setNavOpen(false)} href="/regulamin">
              Regulamin
            </NavbarLink>
          </ul>
        </nav>

        <div className="relative flex h-20 flex-shrink-0 items-center md:h-24">
          <div className="absolute z-0 h-20 w-full bg-white blur-md filter md:h-24" />
          <Link href="/" className="z-10 px-4 drop-shadow">
            <Logo xl />
          </Link>
        </div>
      </div>
      <div className="h-20 md:h-24" />
    </>
  );
};

export { Navbar, NavbarLink };
