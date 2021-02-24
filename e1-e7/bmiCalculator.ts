interface BMIValues {
  height: number;
  weight: number;
}

export const parseArguments = (args: Array<string>): BMIValues => {
  if (args.length != 4) throw new Error('Wrong number of arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  //console.log('bmi', bmi)
  if (bmi <= 15) {
    return 'Very severely underweight';
  } else if (bmi > 15 && bmi <= 16) {
    return 'Severely underweight';
  } else if (bmi > 16 && bmi <= 18.5) {
    return 'Underweight';
  } else if (bmi > 18.5 && bmi <= 25) {
    return 'Normal (healthy weight)';
  } else if (bmi > 25 && bmi <= 30) {
    return 'Overweight';
  } else if (bmi > 30 && bmi <= 35) {
    return 'Obese Class I (Moderately obese)';
  } else if (bmi > 35 && bmi <= 40) {
    return 'Obese Class II (Severely obese)';
  } else if (bmi > 40) {
    return 'Obese Class III (Very severely obese)';
  } else {
    return '';
  }
};

/* try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something went wrong, message: ', e.message);
} */
