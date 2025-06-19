"use server";
import { redirect } from "next/navigation";

import { addMeal } from "./meals";

const isInvalidText = (text) => {
  return !text || text.trim() === "";
};

export async function shareMeal(prevState, formData) {
  const mealData = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creatorEmail: formData.get("email"),
  };

  if (
    isInvalidText(mealData.title) ||
    isInvalidText(mealData.summary) ||
    isInvalidText(mealData.instructions) ||
    isInvalidText(mealData.creator) ||
    isInvalidText(mealData.creatorEmail) ||
    !mealData.creatorEmail.includes("@") ||
    !mealData.image ||
    mealData.image.size === 0
  ) {
    return { message: "Invalid input" };
  }

  await addMeal(mealData);
  revalidatePath("/meals, 'page");
  redirect("/meals");
}
