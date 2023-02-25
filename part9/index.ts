import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { exerciseCalculator } from "./exerciseCalculator";

const app = express();
app.get("/hello", (_, res) => {
  res.send("Hello Full Stack!");
});
app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight) {
    res.send({
      error: "malformatted parameters",
    });
  } else {
    res.send({
      height: height,
      weight: weight,
      bmi: calculateBmi(height, weight),
    });
  }
});
app.post("/exerciseCalculator", (req, res) => {
  const { daily_exercises, target } = req.body;

  try {
    if (!isNaN(Number(target)) && parseArgvToNum(daily_exercises)) {
      res.send({
        exercise: exerciseCalculator(target, daily_exercises),
      });
    } else {
      throw new Error("malformatted parameters");
    }
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});
// app.post("/exercisecalculator", (req, res) => {
//   // let a:number[];
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//   const { daily_exercises, target } = req.body;
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
//   // const result = exerciseCalculator(daily_exercises, Number(target));
//   // res.send(result);
//   try {
//     res.send({
//       // eslint-disable-next-line  @typescript-eslint/no-unsafe-argument
//       exercise: exerciseCalculator(daily_exercises, target),
//     });
//   } catch (error) {
//     res.send({
//       // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//       error: error.message, //eslint-disable-line @typescript-eslint/no-unsafe-assignment
//     });
//   }
// });
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
