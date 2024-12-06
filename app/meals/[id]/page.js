import React from 'react';
import classes from './page.module.css';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';
import ImageGuard from '@/components/images/ImageGuard';

export const generateMetaDate = async ({ params }) => {
  const { id } = params;
  const meal = getMeal(id);
  if (!meal) {
    notFound();
  }
  return {
    title: meal.title,
    description: meal.summery,
  };
};
const SingleMeal = ({ params }) => {
  const { id } = params;
  const meal = getMeal(id);
  if (!meal) {
    notFound();
  }
  meal.instructions = meal.instructions.replace(/\n/g, '<br/>');
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <ImageGuard
            image={`https://ezz-foodies-bucket.s3.eu-north-1.amazonaws.com/images/${meal.image}`}
            title={meal.title}
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summery}>{meal.summery}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
};

export default SingleMeal;
