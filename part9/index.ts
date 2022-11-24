import express from "express";
const app = express();
import { calculateBmi } from "./bmiCalculator";
const qs = require("qs");

app.get("bmi?height=180&weight=72", (_req, res) => {
  const height = _req.query.height;
  const weight = _req.query.weight;
  console.log(height);
  console.log(weight);

  res.send(calculateBmi(Number(height), Number(weight)));
  console.log(calculateBmi(Number(height), Number(weight)));
});

// app.get("/bmi", (_req, res) => {
//   res.send("bmi");
//   console.log("bmi");
// });

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
