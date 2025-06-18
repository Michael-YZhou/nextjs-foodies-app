import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import { v4 as uuidv4 } from "uuid";
import fs from "node:fs";
import path from "node:path";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // throw new Error("Failed to fetch meals");
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(mealSlug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(mealSlug);
}

export async function addMeal(mealData) {
  console.log(mealData);
  // create a slug from the title
  mealData.slug = slugify(mealData.title, { lower: true });
  // sanitize the instructions
  mealData.instructions = xss(mealData.instructions);

  // get the image file extension
  const fileExtension = mealData.image.name.split(".").pop();
  // create a unique file name
  const fileName = `${mealData.slug}-${uuidv4()}.${fileExtension}`;

  // save the image to the images folder
  const imagePath = path.join(process.cwd(), "public", "images", fileName);

  try {
    // Convert File to ArrayBuffer, then to Buffer
    const bytes = await mealData.image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Write the buffer to file
    fs.writeFileSync(imagePath, buffer);

    console.log("Image saved successfully");
  } catch (error) {
    console.error("Failed to save image:", error);
    throw new Error("Failed to save meal image");
  }

  // replace the image path with the file name which will be saved in database
  mealData.image = `/images/${fileName}`;

  // insert the meal into the database
  db.prepare(
    "INSERT INTO meals (title, slug, summary, instructions, image, creator, creator_email) VALUES ( ?, ?, ?, ?, ?, ?, ?)"
  ).run(
    mealData.title,
    mealData.slug,
    mealData.summary,
    mealData.instructions,
    mealData.image,
    mealData.creator,
    mealData.creatorEmail
  );
}
