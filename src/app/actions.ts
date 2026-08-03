"use server";

import fs from "fs/promises";
import path from "path";

export type Result = {
  id: string;
  guess: string;
  admitted: boolean;
  timestamp: string;
};

const DATA_FILE = path.join(process.cwd(), "data", "results.json");

export async function saveSecretResult(guess: string, admitted: boolean) {
  try {
    // Read existing
    let data: Result[] = [];
    try {
      const fileContent = await fs.readFile(DATA_FILE, "utf-8");
      data = JSON.parse(fileContent);
    } catch (e) {
      // File might not exist yet, which is fine
    }

    // Append new
    const newEntry: Result = {
      id: crypto.randomUUID(),
      guess,
      admitted,
      timestamp: new Date().toISOString(),
    };
    
    data.push(newEntry);

    // Save
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
    return { success: true };
  } catch (error) {
    console.error("Error saving result:", error);
    return { success: false };
  }
}

export async function getSecretResults(): Promise<Result[]> {
  try {
    const fileContent = await fs.readFile(DATA_FILE, "utf-8");
    const data = JSON.parse(fileContent);
    // Sort descending by timestamp
    return data.sort((a: Result, b: Result) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  } catch (error) {
    console.error("Error reading results:", error);
    return [];
  }
}
