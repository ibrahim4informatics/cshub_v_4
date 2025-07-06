import bcrypt from "bcrypt";

const pass = "@Khalil@2004"

console.log(await bcrypt.hash(pass,12));