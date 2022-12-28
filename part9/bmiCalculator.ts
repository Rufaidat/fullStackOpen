export const calculateBmi = (h: number, w: number) => {
  const bmi = (w / h / h) * 10000;

  if (bmi < 16) {
    return "underweight(Severe thinness)";
  } else if (bmi <= 16.9) {
    return "Underweight (Moderate thinness)";
  } else if (bmi <= 18.4) {
    return "Underweight (Mild thinness)";
  } else if (bmi <= 24.9) {
    return "Normal (healthy weight)";
  } else if (bmi <= 29.9) {
    return "Overweight (Pre-obese)";
  } else if (bmi <= 34.9) {
    return "Obese (Class I)";
  } else if (bmi <= 39.9) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
};

// const h: number = number(process.argv[2]);
// const w: number = number(process.argv[3]);

// console.log(calculateBmi(180, 74));
