"use server";

import { Redis } from '@upstash/redis'

// Provide the URL and token directly to accommodate local development with KV variables or deployed environment
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || "",
})

export type Result = {
  id: string;
  guess: string;
  admitted: boolean;
  timestamp: string;
};

const REDIS_KEY = 'angie_secret_results';

export async function saveSecretResult(guess: string, admitted: boolean) {
  try {
    const newEntry: Result = {
      id: crypto.randomUUID(),
      guess,
      admitted,
      timestamp: new Date().toISOString(),
    };
    
    // Add to the beginning of a Redis list
    await redis.lpush(REDIS_KEY, newEntry);
    
    return { success: true };
  } catch (error) {
    console.error("Error saving result:", error);
    return { success: false };
  }
}

export async function getSecretResults(): Promise<Result[]> {
  try {
    // Retrieve all items in the list (0 to -1 means all items)
    const data = await redis.lrange<Result>(REDIS_KEY, 0, -1);
    return data || [];
  } catch (error) {
    console.error("Error reading results:", error);
    return [];
  }
}
