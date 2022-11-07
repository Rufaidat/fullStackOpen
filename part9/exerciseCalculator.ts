interface calculateValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const argvNum: any = process.argv.slice(3);
for (let i = 0; i < argvNum.length; i++) {
  argvNum[i] = Number(argvNum[i]);
}

const b: number = Number(process.argv[2]);
const a: number[] = argvNum;

const exerciseCalculator = (a: number[], b: number): calculateValues => {
  const train = () => {
    const clone = [...a];
    for (let i = 0; i < clone.length; i++) {
      if (clone[i] === 0) {
        clone.splice(i, 1);
      }
    }
    return clone.length;
  };
  const avg =
    a.reduce(function (a, b) {
      return a + b;
    }) / a.length;

  let rating = 0;
  let ratingDescription = "";
  const rate = () => {
    if (avg < (50 * b) / 100) {
      rating = 1;
      ratingDescription = "poor perfomance";
    } else if (avg <= (80 * b) / 100) {
      rating = 2;
      ratingDescription = "not too bad but could be better";
    } else {
      rating = 2;
      ratingDescription = "excellent! keep it up!";
    }
  };
  rate();
  const result = {
    periodLength: a.length,
    trainingDays: train(),
    success: avg === b,
    rating,
    ratingDescription,
    target: b,
    average: avg,
  };
  return result;
};

try {
  console.log(exerciseCalculator(a, b));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
