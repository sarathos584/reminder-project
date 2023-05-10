const express = require("express");
const dataservice = require("./services/data.services");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
app.use(
  cors({
    origin: "http://localhost:4200",
  })
  );
  app.use(express.json());

const appMiddleware = (req, res, next) => {
  try {
    token = req.headers["x-access-token"];
    console.log(token)
    res = jwt.verify(token, "jwtauthkey123");
    req.username = res.currentUserName;
    console.log(res +"from middleware");
    console.log(res.currentUserName +"  username from middleware");
    next();
  } catch {
    res.status(400).json({
      status: false,
      message: "Invalide user... Please Login!",
      statusCode: 400,
    });
  }
};

// REGISTER API
app.post("/register", (req, res) => {
  const result = dataservice.register(
    req.body.fullname,
    req.body.username,
    req.body.password
  );
  result.then((resultObject) => {
    res.status(resultObject.statusCode).send(resultObject);
  });
});

// LOGIN API
app.post("/login", (req, res) => {
  const result = dataservice.login(req.body.username, req.body.password);
  result.then((resultObject) => {
    res.status(resultObject.statusCode).send(resultObject);
  });
});

// API for ADDING REMINDERS

app.post('/reminder',appMiddleware,(req,res)=>{
  const result = dataservice.addReminder(
    req.body.reminder,
    req.body.date,
    req.body.time,
    req
  )
  result.then((resultObject)=>{
    res.status(resultObject.statusCode).send(resultObject)
  })
})

// API for REMINDER LIST

app.post('/reminders',appMiddleware,(req,res)=>{
  const result = dataservice.getReminders(req.body.username)
  result.then((resultObject=>{
    res.status(resultObject.statusCode).send(resultObject)
  }))
})


app.listen(port, () => {
  console.log(`Reminder app listening on port ${port}`);
});
