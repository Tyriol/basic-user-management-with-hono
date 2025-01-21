import * as fs from 'node:fs';

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