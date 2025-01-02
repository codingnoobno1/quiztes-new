import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Define the interface for user data
interface User {
  name: string;
  enrollmentNumber: string;
  course: string;
  semester: string;
  email: string;
  password: string; // In production, store hashed passwords
}

// Path to the central database file (for storing all users)
const dbFilePath = path.join(process.cwd(), 'src', 'data', 'users.tsx');

// Path to the directory where individual user folders will be created
const usersDirectoryPath = path.join(process.cwd(), 'src', 'data', 'users');

// Utility function to ensure the central database file exists
const ensureDatabaseFileExists = async () => {
  try {
    await fs.access(dbFilePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Create the file with an initial export statement if it doesn't exist
      await fs.writeFile(dbFilePath, `export const users: User[] = [];\n`);
    } else {
      throw error;
    }
  }
};

// Utility function to ensure the user-specific directory exists
const ensureUserDirectoryExists = async (username: string) => {
  const userDirectoryPath = path.join(usersDirectoryPath, username);
  try {
    await fs.access(userDirectoryPath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Create the directory for the user if it doesn't exist
      await fs.mkdir(userDirectoryPath, { recursive: true });
    } else {
      throw error;
    }
  }
};

// POST method for user registration
export async function POST(req: NextRequest) {
  const { name, enrollmentNumber, course, semester, email, password } = await req.json();

  // Validate required fields
  if (!name || !enrollmentNumber || !course || !semester || !email || !password) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  // Validate email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
  }

  // Validate semester is a number
  if (isNaN(Number(semester))) {
    return NextResponse.json({ error: 'Semester must be a number' }, { status: 400 });
  }

  try {
    // Ensure the central database file exists
    await ensureDatabaseFileExists();

    // Read existing user data from the central file
    const dbFileContent = await fs.readFile(dbFilePath, 'utf-8');

    // Extract the existing users array from the file content
    const userArrayMatch = dbFileContent.match(/export const users: User\[] = (\[.*\]);/s);
    let users: User[] = userArrayMatch ? JSON.parse(userArrayMatch[1]) : [];

    // Check if the user already exists
    if (users.some((user) => user.email === email)) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    // Create a new user object
    const newUser: User = { name, enrollmentNumber, course, semester, email, password };

    // Add the new user to the users array in the central file
    users.push(newUser);

    // Write the updated users array back to the central file
    const updatedContent = `export const users: User[] = ${JSON.stringify(users, null, 2)};\n`;
    await fs.writeFile(dbFilePath, updatedContent);

    // Ensure the user-specific directory exists and create the registry file
    const username = email.split('@')[0].toLowerCase();
    await ensureUserDirectoryExists(username);

    // Path to the user-specific registry file
    const userRegistryFilePath = path.join(usersDirectoryPath, username, `${username}_registry.tsx`);

    // Write the new user's data to their specific registry file
    const userRegistryContent = `export const user: User = ${JSON.stringify(newUser, null, 2)};\n`;
    await fs.writeFile(userRegistryFilePath, userRegistryContent);

    // Respond with success
    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}
