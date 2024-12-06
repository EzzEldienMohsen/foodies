import React from 'react';
import Link from 'next/link';
import classes from './MealItem.module.css';
import ImageGuard from '../images/ImageGuard';
const MealItem = ({ title, slug, image, summary, creator }) => {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <ImageGuard
            image={`https://ezz-foodies-bucket.s3.eu-north-1.amazonaws.com/images/${image}`}
            title={title}
          />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
};

export default MealItem;
