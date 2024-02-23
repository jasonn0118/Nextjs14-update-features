// Whether you use client here, it renders in Server side.
'use client'; // use hydrate is more make sense.

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './navigation.module.css';

export default function Navigation() {
  const path = usePathname();

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href='/'>Home</Link> {path === '/' && '🔥'}
        </li>
        <li>
          <Link href='about-us'>About Us</Link> {path === '/about-us' && '🔥'}
        </li>
      </ul>
    </nav>
  );
}