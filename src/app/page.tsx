"use client";
import { useState, useEffect } from "react";

const PRACTICE_DATA = [
  "1250 North Mesa Street, El Paso, TX 79902",
  "Account #8849-2210-9485",
  "Confirmation: AX-774-901-B",
  "Idali Cooper | idali.cooper@email.com",
  "Item: 45x Unity Developer Suite (Ref: 9920)"
];

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [index, setIndex] = useState(0);
  const targetText = PRACTICE_DATA[index];

  // Moves to next item when finished
  useEffect(() => {
    if (userInput === targetText) {
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % PRACTICE_DATA.length);
        setUserInput("");
      }, 500); // Short pause for satisfaction!
    }
  }, [userInput, targetText]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-blue-400">Data Entry Trainer</h1>
      
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-2xl border border-gray-700">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">Target Data:</p>
        <p className="text-2xl mb-6 font-mono text-white bg-black/30 p-4 rounded border border-gray-600">
          {targetText}
        </p>

        <input
          type="text"
          autoFocus
          className={`w-full p-4 rounded bg-gray-700 border-2 transition-colors duration-200 text-xl font-mono focus:outline-none ${
            userInput === targetText.substring(0, userInput.length) 
            ? "border-blue-500 focus:border-green-400" 
            : "border-red-500 bg-red-900/20"
          }`}
          placeholder="Type precisely..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />

        <div className="mt-6 flex justify-between items-center font-mono">
          <p className={userInput === targetText.substring(0, userInput.length) ? "text-green-400" : "text-red-400 font-bold"}>
            {userInput === targetText.substring(0, userInput.length) ? "✓ Keeping Pace" : "⚠ TYPO DETECTED"}
          </p>
          <p className="text-gray-500 italic">Progress: {index + 1} / {PRACTICE_DATA.length}</p>
        </div>
      </div>
    </main>
  );
}