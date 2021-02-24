/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator'
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);


  if (isNaN(weight) || isNaN(height) || height === undefined || weight === undefined) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  let bmi;

  try {
    bmi = calculateBmi(height, weight);
  } catch (e) {
    throw new Error(e.message);
  }

  return res.send(
    {
      weight: weight,
      height: height,
      bmi: bmi
    }
  );
});

app.post('/exercises', (req, res) => {

  const daily_exercises: any = req.body.daily_exercises;
  const target: any = req.body.target;

  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  const all_arguments: Array<number> = [target, ...daily_exercises];
  console.log(all_arguments);

  let invalidArguments = false;
  invalidArguments = all_arguments.some(arg => {
    return isNaN(Number(arg));
  });

  if (invalidArguments) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  return res.send(calculateExercises(target, daily_exercises));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});