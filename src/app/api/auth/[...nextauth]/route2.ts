// route2.ts

import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Path to the users database file
const dbFilePath = path.join(process.cwd(), 'src', 'data', 'users.tsx');

export async function authorize(credentials: { email: string, password: string }) {
  if (!credentials?.email || !credentials?.password) {
    return null;
  }

  // Try to authenticate the user using the mock data (First method)
  if (credentials?.email === "test@example.com" && credentials.password === "password123") {
    return { id: "1", name: "Test User", email: "test@example.com" };
  }

  // Else, check against a file-based user list (Second method)
  try {
    // Read the users file
    const dbFileContent = await fs.readFile(dbFilePath, 'utf-8');

    // Extract the users array from the file content
    const userArrayMatch = dbFileContent.match(/export const users: User\[] = (\[.*\]);/s);
    let users = userArrayMatch ? JSON.parse(userArrayMatch[1]) : [];

    // Find the user by email and password
    const user = users.find((user: { email: string; password: string }) =>
      user.email === credentials.email && user.password === credentials.password
    );

    if (user) {
      return { id: user.email, name: user.name, email: user.email }; // Return user data for session
    } else {
      return null; // Invalid credentials
    }
  } catch (error) {
    console.error('Error reading users database:', error);
    return null; // Return null if an error occurs
  }
}
