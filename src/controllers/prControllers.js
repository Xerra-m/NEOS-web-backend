import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prData = path.join(__dirname, "..", "models", "prData.json");

export const getTask = async (req, res) => {
  try {
    const data = await fs.readFile(prData, "utf8");
    const tasks = JSON.parse(data);
    res.json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal baca data PR", error: error.message });
  }
};
