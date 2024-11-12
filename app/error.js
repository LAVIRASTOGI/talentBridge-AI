// app/error.js
"use client";

export default function GlobalError({ error, reset }) {
  console.error("Global error:", error);

  return (
    <div>
      <h1>Global Error: Something went wrong</h1>
      <button onClick={() => reset()}>Try to Reload</button>
    </div>
  );
}
