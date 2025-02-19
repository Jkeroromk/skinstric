"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const Finish = () => {
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => {
    const storedResult = localStorage.getItem("analysisResult");
    if (storedResult) {
      try {
        const parsedResult = JSON.parse(storedResult);
        if (parsedResult.data) {
          setAnalysisResult(parsedResult.data);
        }
      } catch (error) {
        console.error("Error parsing analysis result:", error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-6">
      <h1 className="text-2xl font-bold mb-4">Analysis Results</h1>

      {analysisResult ? (
        <div className="p-6 border rounded shadow-md max-w-lg w-full text-center">
          
          <h2 className="text-lg font-semibold mb-2">Race Prediction</h2>
          <ul className="mb-4">
            {Object.entries(analysisResult.race).map(([race, value]) => (
              <li key={race} className="text-sm">
                {race.charAt(0).toUpperCase() + race.slice(1)}: {(value * 100).toFixed(2)}%
              </li>
            ))}
          </ul>

          {/* Age */}
          <h2 className="text-lg font-semibold mb-2">Age Prediction</h2>
          <ul className="mb-4">
            {Object.entries(analysisResult.age).map(([ageGroup, value]) => (
              <li key={ageGroup} className="text-sm">
                {ageGroup}: {(value * 100).toFixed(2)}%
              </li>
            ))}
          </ul>

          {/* Gender */}
          <h2 className="text-lg font-semibold mb-2">Gender Prediction</h2>
          <ul className="mb-4">
            {Object.entries(analysisResult.gender).map(([gender, value]) => (
              <li key={gender} className="text-sm">
                {gender.charAt(0).toUpperCase() + gender.slice(1)}: {(value * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-lg">Loading results...</p>
      )}

      <div className="mt-6">
        <Link href="/">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Go Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Finish;
