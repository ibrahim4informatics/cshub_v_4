import express, { urlencoded } from "express";
import { admin, adminRouter } from "./utils/admin.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import ENV from "./config/ENV.js";
import authRouter from "./routes/auth.js"
import adminMidleware from "./midlewares/admin.midleware.js";
import authMidleware from "./midlewares/auth.midleware.js"

const app = express();
const port = ENV.PORT || 3000;
app.use(cookieParser());
app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(express.json());

app.use("/auth", authRouter);
app.use(admin.options.rootPath, authMidleware,adminMidleware,adminRouter);

app.listen(port, () => { console.log(`server is running on: http://localhost:${port}`) });