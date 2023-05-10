const db = require("./db");
const jwt = require("jsonwebtoken");
const register = (fullname, username, password) => {
  return db.Profile.findOne({ username: username }).then((profile) => {
    console.log(profile +"from register");
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
    console.log(res +"from login");
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

const addReminder = (reminder,date,time,req)=>{
  console.log(req.username +"from addReminder")
  console.log(reminder+"from addReminder")
  console.log(date+"from addReminder")
  console.log(time+"from addReminder")
  return db.Profile.findOne({
    username:req.username
  }).then((res)=>{
    console.log(res +"from add reminder")
    if(res){
      let reminderObject ={
        reminder,
        date,
        time
      }

      res.reminders.push(reminderObject)
      res.save()
      return{
        status:true,
        message:"Reminder added successfully",
        statusCode:200
      }
    }
    else{
      return{
        status:false,
        message:"Reminder cannot be added",
        statusCode:400
      }
    }
  })
}

const getReminders= (username)=>{
  return db.Profile.findOne({
    username:username
  }).then(res=>{
    if(res){
      return{
        status:true,
        message:"success",
        data:res.reminders,
        statusCode:200
      }
    }
    else{
      return{
        status:false,
        message:"failed",
        data:res.reminders,
        statusCode:422
      }
    }
  })
}

module.exports = {
  register,
  login,
  addReminder,
  getReminders
};
