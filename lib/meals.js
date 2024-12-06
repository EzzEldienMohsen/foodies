import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import { nanoid } from 'nanoid';
import fs from 'node:fs';

const db = sql('meals.db');

export const getMeals = async () => {
  return db.prepare('SELECT * FROM meals').all();
};
export const getMeal = (slug) => {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
};

export const saveMeal = async (meal) => {
  meal.slug = slugify(`${meal.title}${nanoid()}`, { lower: true });
  meal.instructions = xss(meal.instructions);
  const extension = meal.image.name.split('.').pop();
  const fileName = `${nanoid()}${meal.slug}.${extension}`;
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('saving Image Failed');
    }
  });
  meal.image = `/images/${fileName}`;
  db.prepare(
    `
  INSERT INTO meals
  (title,summary,instructions,slug,image,creator,creator_email)
  VALUES (
    @title,
    @summary,
    @instructions,
    @slug,
    @image,
    @creator,
    @creator_email
  )
  `
  ).run(meal);
};
