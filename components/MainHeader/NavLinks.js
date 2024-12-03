'use client';
import React from 'react'
import Link from 'next/link';
import classes from "./NsvLinks.module.css"
import { usePathname } from 'next/navigation';

const NavLinks = () => {
      const path = usePathname();

  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <Link
            href="/meals"
            className={path.startsWith('/meals') ? classes.active : ''}
          >
            Browse Meals
          </Link>
        </li>
        <li>
          <Link
            href="/community"
            className={path.startsWith('/community') ? classes.active : ''}
          >
            Foodies Community
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavLinks