import "dotenv/config";



export default {
    PORT: process.env.PORT,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRSH_SECRET,
    EMAIL: process.env.EMAIL,
    EMAIL_PASS: process.env.EMAIL_PASS
}