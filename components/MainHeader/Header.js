import React from 'react';
import logo from '@/assets/logo.png';
import classes from './Header.module.css';
import Image from 'next/image';
import HeaderBackground from './HeaderBackground';
import NavLinks from './NavLinks';
import Link from 'next/link';
const Header = () => {
  return (
    <>
      <HeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logo} alt="logo" priority />
          NextLevel Food
        </Link>
        <NavLinks />
      </header>
    </>
  );
};

export default Header;
