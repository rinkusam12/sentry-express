import express, { Response } from "express";
const app = express();
app.get("/", (_: any, res: Response, __: any) => {
  res.send("Hello0");
});

app.listen(3000, () => {
  console.log("server start");
});
