interface trainingReport {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface exerciseValues {
  target: number,
  exerciseData: Array<number>
}

export const parseExerciseArguments = (args: Array<string>): exerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const argsData = args.slice(2).map(arg => Number(arg));

  argsData.forEach(arg => {
    if (isNaN(arg)) {
      throw new Error('Provided values were not numbers!');
    }
  });
  return {
    target: Number(argsData[0]),
    exerciseData: argsData.slice(1)
  };
};

export const calculateExercises = (dailyTarget: number, dailyTrainingTime: Array<number>): trainingReport => {

  const averageDailyTraining: number = dailyTrainingTime.reduce((p, c) => p + c, 0) / dailyTrainingTime.length;

  let rating: number;
  let ratingDescription: string;
  if (averageDailyTraining <= 0.9 * dailyTarget) {
    rating = 1;
    ratingDescription = 'You were far below the target';
  } else if (averageDailyTraining >= 1.1 * dailyTarget) {
    rating = 3;
    ratingDescription = 'You were far above the target';
  } else {
    rating = 2;
    ratingDescription = 'You were +-10% of the target';
  }

  return {
    periodLength: dailyTrainingTime.length,
    trainingDays: dailyTrainingTime.filter(day => day !== 0).length,
    success: averageDailyTraining >= dailyTarget,
    rating: rating,
    ratingDescription: ratingDescription,
    target: dailyTarget,
    average: averageDailyTraining
  };
};

/* try {
  const { target, exerciseData } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(target, exerciseData));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something went wrong, message: ', e.message);
} */

//console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]))

