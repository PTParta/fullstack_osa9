interface trainingReport {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}



const calculateExercises = (dailyTrainingTime: Array<number>, dailyTarget: number): trainingReport => {

  let averageDailyTraining: number = dailyTrainingTime.reduce((p, c) => p + c, 0) / dailyTrainingTime.length

  let rating: number
  let ratingDescription: string
  if (averageDailyTraining <= 0.9 * dailyTarget) {
    rating = 1;
    ratingDescription = 'You were far below the target';
  } else if (averageDailyTraining >= 1.1 * dailyTarget) {
    rating = 3;
    ratingDescription = 'You were far above the target'
  } else {
    rating = 2;
    ratingDescription = 'You were +-10% of the target'
  }

  return {
    periodLength: dailyTrainingTime.length,
    trainingDays: dailyTrainingTime.filter(day => day !== 0).length,
    success: averageDailyTraining >= dailyTarget,
    rating: rating,
    ratingDescription: ratingDescription,
    target: dailyTarget,
    average: averageDailyTraining
  }
}
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

