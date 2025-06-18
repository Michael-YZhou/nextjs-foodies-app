import { Suspense } from "react";
import React from "react";
import classes from "./page.module.css";
import Link from "next/link";
import MealsGrids from "@/components/meals/meals-grids";
import { getMeals } from "@/lib/meals";

async function Meals() {
  const meals = await getMeals();
  return <MealsGrids meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious Meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite meal from our broad selection of available meals
          and enjoy a delicious lunch or dinner at home.
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your favorite meal</Link>
        </p>
      </header>
      <main className={classes.meals}>
        <Suspense fallback={<p className={classes.loading}>Loading...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
