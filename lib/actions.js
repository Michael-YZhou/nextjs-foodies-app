"use server";

export async function handleShareMeal(formData) {
  const mealData = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creatorEmail: formData.get("email"),
  };
}
