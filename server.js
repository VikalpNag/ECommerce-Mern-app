import express from "express";
import color from "colors";
import dotenv from 'dotenv';


//rest objects
const app = express();
//configure env
dotenv.config();
const newPORT=process.env.PORT||3000;

//rest api
app.get("/", (req, res) => {
  res.send(`<h1>Welcome to Ecommerce web app</h1>`);
});

//run listen
app.listen(newPORT, () => {
  console.log(`Server start on port:${newPORT}`.magenta);
});
