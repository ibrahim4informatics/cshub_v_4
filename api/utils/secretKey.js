import { randomBytes } from "crypto";
import fs from "fs/promises"
import path from "path";

const root = process.cwd(); 
const accessSecret = randomBytes(64).toString("hex");
const refreshSecret = randomBytes(64).toString("hex");

await fs.appendFile(path.join(root, ".env"), `JWT_ACCESS_SECRET=${accessSecret}\n`);
await fs.appendFile(path.join(root, ".env"), `JWT_REFRSH_SECRET=${refreshSecret}\n`);

console.log("Secrets Generated!");