const db = require("./db");
const jwt = require("jsonwebtoken");
const register = (fullname, username, password) => {
  return db.Profile.findOne({ username: username }).then((profile) => {
    console.log(profile);
    if (profile) {
      return {
        status: false,
        message: "Account already exists!! Try Login",
        statusCode: 404,
      };
    } else {
      let newProfile = new db.Profile({
        fullname: fullname,
        username: username,
        password: password,
        reminders: [],
      });
      newProfile.save();
      return {
        status: true,
        message: "Registration completed",
        statusCode: 201,
      };
    }
  });
};

const login = (username, password) => {
  return db.Profile.findOne({
    username,
    password,
  }).then((res) => {
    console.log(res);
    if (res) {
      currentUser = res.fullname;
      currentUserName = username;
      token = jwt.sign({ currentUserName: username }, "jwtauthkey123");
      return {
        status: true,
        message: "login successfull",
        statusCode: 200,
        currentUser,
        currentUserName,
        token,
      };
    } else {
      return {
        status: false,
        message: "Invalid Password or Username",
        statusCode: 400,
      };
    }
  });
};

const addReminder = (reminder, date, time,req) => {
 return db.Profile.findOne({username:req.currentUserName}).then(res=>{
  if(res){
    if(req.currentUserName!=res.username){
      return{
        status:false,
        message:'Given username is not authenticated',
        statusCode:422
      }
    }
    else{
      let reminderObj = {reminder,date,time}
      res.reminders.push(reminderObj)
      res.save()
      return{
        status:true,
        message:"Reminder added successfully",
        statusCode:200
      }
    }
  }
  else{
    return{
      status:false,
      message:"Invalid data",
      statusCode:400
    }
  }
 })
};

module.exports = {
  register,
  login,
  addReminder,
};
