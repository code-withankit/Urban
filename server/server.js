import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 8000;

const app = express();

await connectDB();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send(`Server is running on PORT ${PORT}`);
})

app.listen(PORT, () => {
    console.log('Server is running on PORT', PORT);
})