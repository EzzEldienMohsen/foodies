'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';
import { revalidatePath } from 'next/cache';
// If used with useFormState from react-dom only then it will have a PREVSTATE parameter
export const sharedMeal = async (prevState, formData) => {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };
  if (!meal) {
    return {
      message: 'None Valid Input',
    };
  }
  await saveMeal(meal);
  revalidatePath('/meals', 'layout');
  redirect('/meals');
};
