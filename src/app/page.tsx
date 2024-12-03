"use client";
import { useState } from "react";

interface ApiResponse {
  length?: number;
  error?: string;
}

export default function HomePage() {
  const [name, setName] = useState("");
  const [charCount, setCharCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateLength = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/calculate-length", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: name }),
      });

      const data = await response.json() as ApiResponse;
      
      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong");
      }

      if (typeof data.length === "number") {
        setCharCount(data.length);
      }
    } catch (error) {
      console.error("Error calculating length:", error);
      alert("Failed to calculate length");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem] text-center break-words max-w-[90%]">
        Hello {name.trim() ? name : "World"}
      </h1>
      <div className="mt-4 flex flex-col items-center gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="rounded px-4 py-2 text-black text-center"
        />
        <button
          onClick={calculateLength}
          disabled={isLoading}
          className="rounded bg-white px-4 py-2 text-black hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Calculating..." : "Calculate Length"}
        </button>
      </div>
      {charCount !== null && (
        <div className="mt-8">
          <p className="text-4xl font-bold">Character count: {charCount}</p>
        </div>
      )}
    </main>
  );
}
