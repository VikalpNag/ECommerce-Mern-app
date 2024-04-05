const express = require("express");
const color=require('colors');



//rest objects
const app = express();

//rest api
app.get("/", (req, res) => {
  res.send({
    message: "welcome",
  });
});

//port
const PORT = 8080;

//run listen
app.listen(PORT, () => {
  console.log(`Server start on port:${PORT}`.bgGreen.black);
});
