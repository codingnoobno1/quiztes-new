// src/data/dashboard_data.ts

import fs from 'fs/promises';
import path from 'path';

interface User {
  name: string;
  enrollmentNumber: string;
  course: string;
  semester: string;
  email: string;
}

const dbFilePath = path.join(process.cwd(), 'src', 'data', 'users.tsx');

// Function to fetch user by email
export const getUserDataByEmail = async (email: string): Promise<User | null> => {
  try {
    const dbFileContent = await fs.readFile(dbFilePath, 'utf-8');
    const userArrayMatch = dbFileContent.match(/export const users: User\[] = (\[.*\]);/s);
    const users: User[] = userArrayMatch ? JSON.parse(userArrayMatch[1]) : [];

    if (users.length === 0) {
      throw new Error('No users found in the database.');
    }

    const user = users.find((user) => user.email === email);
    if (!user) {
      throw new Error(`User with email ${email} not found.`);
    }

    return user;
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    return null;
  }
};

// Function to fetch all users
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const dbFileContent = await fs.readFile(dbFilePath, 'utf-8');
    const userArrayMatch = dbFileContent.match(/export const users: User\[] = (\[.*\]);/s);
    const users: User[] = userArrayMatch ? JSON.parse(userArrayMatch[1]) : [];

    if (users.length === 0) {
      throw new Error('No users found in the database.');
    }

    return users;
  } catch (error) {
    console.error('Error fetching all users:', error.message);
    return [];
  }
};

// Function to add a new user
export const addUser = async (newUser: User): Promise<boolean> => {
  try {
    const dbFileContent = await fs.readFile(dbFilePath, 'utf-8');
    const userArrayMatch = dbFileContent.match(/export const users: User\[] = (\[.*\]);/s);
    let users: User[] = userArrayMatch ? JSON.parse(userArrayMatch[1]) : [];

    // Check if the user already exists
    if (users.some((user) => user.email === newUser.email)) {
      throw new Error(`User with email ${newUser.email} already exists.`);
    }

    // Add new user to the users array
    users.push(newUser);

    // Write the updated users array back to the file
    const updatedContent = `export const users: User[] = ${JSON.stringify(users, null, 2)};\n`;
    await fs.writeFile(dbFilePath, updatedContent);

    return true;
  } catch (error) {
    console.error('Error adding new user:', error.message);
    return false;
  }
};

// Function to update an existing user
export const updateUser = async (updatedUser: User): Promise<boolean> => {
  try {
    const dbFileContent = await fs.readFile(dbFilePath, 'utf-8');
    const userArrayMatch = dbFileContent.match(/export const users: User\[] = (\[.*\]);/s);
    let users: User[] = userArrayMatch ? JSON.parse(userArrayMatch[1]) : [];

    const userIndex = users.findIndex((user) => user.email === updatedUser.email);
    if (userIndex === -1) {
      throw new Error(`User with email ${updatedUser.email} not found.`);
    }

    // Update the user data
    users[userIndex] = updatedUser;

    // Write the updated users array back to the file
    const updatedContent = `export const users: User[] = ${JSON.stringify(users, null, 2)};\n`;
    await fs.writeFile(dbFilePath, updatedContent);

    return true;
  } catch (error) {
    console.error('Error updating user:', error.message);
    return false;
  }
};

// Function to delete a user
export const deleteUser = async (email: string): Promise<boolean> => {
  try {
    const dbFileContent = await fs.readFile(dbFilePath, 'utf-8');
    const userArrayMatch = dbFileContent.match(/export const users: User\[] = (\[.*\]);/s);
    let users: User[] = userArrayMatch ? JSON.parse(userArrayMatch[1]) : [];

    const userIndex = users.findIndex((user) => user.email === email);
    if (userIndex === -1) {
      throw new Error(`User with email ${email} not found.`);
    }

    // Remove the user from the array
    users.splice(userIndex, 1);

    // Write the updated users array back to the file
    const updatedContent = `export const users: User[] = ${JSON.stringify(users, null, 2)};\n`;
    await fs.writeFile(dbFilePath, updatedContent);

    return true;
  } catch (error) {
    console.error('Error deleting user:', error.message);
    return false;
  }
};


