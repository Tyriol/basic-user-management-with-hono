import * as fs from 'node:fs';
import type { User, Users } from '../types/types.js';

const USER_DATA = "./data/users.json"

export const checkDataFile = () => {
    if (!fs.existsSync(USER_DATA)) {
        fs.writeFileSync(USER_DATA, JSON.stringify([]))
      }
}

export const readDataFile = () => {
    try {
        const users = fs.readFileSync(USER_DATA, "utf-8");
        return JSON.parse(users)
    } catch (err) {
        console.error("Error while reading user data", err);
        return [];
    }
}

export const writeDataFile = (users: Users) => {
    try {
        fs.writeFileSync(USER_DATA, JSON.stringify(users, null, 2))
    } catch (err) {
        console.error("Failed to write user data", err);
        throw new Error("Failed to write user data");
    }
}