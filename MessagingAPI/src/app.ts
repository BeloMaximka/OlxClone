import express from 'express';
import conversationsRouter from './routes/conversations';

const app = express();

app.use(express.json());
app.use('/conversations', conversationsRouter);

export default app;
