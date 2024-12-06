import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import { nanoid } from 'nanoid';
import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3({
  region: 'eu-north-1',
});

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
  const bufferedImage = await meal.image.arrayBuffer();
  s3.putObject({
    Bucket: 'ezz-foodies-bucket',
    Key: `images/${fileName}`,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;

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
