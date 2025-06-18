import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <h1>Meal not found</h1>
      <p>
        Unfortunately, we couldn&apos;t find the requested page or meal data.
      </p>
      <p>
        But don&apos;t worry, you can find plenty of other things on our
        homepage.
      </p>
      <p>
        <Link href="/">Go to Homepage</Link>
      </p>
    </main>
  );
}
