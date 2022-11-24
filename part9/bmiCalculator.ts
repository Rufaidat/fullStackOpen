const bmiChart = (num: number) => {
  if (num < 16) {
    return "underweight(Severe thinness)";
  } else if (num <= 16.9) {
    return "Underweight (Moderate thinness)";
  } else if (num <= 18.4) {
    return "Underweight (Mild thinness)";
  } else if (num <= 24.9) {
    return "Normal (healthy weight)";
  } else if (num <= 29.9) {
    return "Overweight (Pre-obese)";
  } else if (num <= 34.9) {
    return "Obese (Class I)";
  } else if (num <= 39.9) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
};

export const calculateBmi = (h: number, w: number) => {
  const bmi = (w / h / h) * 10000;
  return bmiChart(bmi);
};
// const h: number = Number(process.argv[2]);
// const w: number = Number(process.argv[3]);

// console.log(calculateBmi(180, 74));
