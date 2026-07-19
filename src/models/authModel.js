// dependencies
import path from "path";
import { fileURLToPath } from "url";

// file Handler
import { readFile, writeFile } from "../utils/fileHandler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const authData = path.join(__dirname, "authData.json");

export const Auth = {
  async findAll() {
    return await readFile(authData);
  },
  async findByUsername(username) {
    const users = await this.findAll();
    return users.find((u) => u.username === username);
  },
  async create(userData) {
    const users = await this.findAll();
    users.push(userData);
    await writeFile(authData, users);
  },
};
