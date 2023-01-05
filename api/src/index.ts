import express, { Application } from 'express';

const app: Application = express();

const PORT = process.env.API_PORT || 5000;

app.listen(PORT, () => console.log(`Server is runnitng on port ${PORT}`));
