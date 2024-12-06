import React from 'react';
import classes from './page.module.css';
import Link from 'next/link';
import MealsGrid from '@/components/meals/MealsGrid';
import { getMeals } from '@/lib/meals';

export const metadata = {
  title: 'All meals',
  description: 'Delicious meals, and more.',
};

const TheMeals = async () => {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
};

const Meals = async () => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious Meals, Created
          <span className={classes.highlight}> By You</span>
        </h1>
        <p>
          Choose Your Favorite Recipe and Cook it Yourself. it is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <React.Suspense
          fallback={<p className={classes.loading}>Fetching meals...</p>}
        >
          <TheMeals />
        </React.Suspense>
      </main>
    </>
  );
};

export default Meals;
