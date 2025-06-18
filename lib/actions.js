"use server";
import { redirect } from "next/navigation";

import { addMeal } from "./meals";

export async function handleShareMeal(formData) {
  const mealData = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creatorEmail: formData.get("email"),
  };

  await addMeal(mealData);
  redirect("/meals");
}
