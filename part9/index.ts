import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();
app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const t = Number("t");
  console.log(typeof t);

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
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
