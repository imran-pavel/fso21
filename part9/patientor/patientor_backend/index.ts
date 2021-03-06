import express from 'express';
import cors from 'cors';

import diagnosesRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const PORT = 3001;
const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());
app.use('/api/diagnosis', diagnosesRouter);
app.use('/api/patients', patientRouter);


app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
