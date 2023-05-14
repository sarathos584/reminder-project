const db = require("./db");
const jwt = require("jsonwebtoken");

const register = (fullname, username, password) => {
  return db.Profile.findOne({ username: username }).then((profile) => {
    console.log(profile + "from register");
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
    console.log(res + "from login");
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

const addReminder = (reminder, date, time, req) => {
  console.log(req.username + "from addReminder");
  console.log(reminder + "from addReminder");
  console.log(date + "from addReminder");
  console.log(time + "from addReminder");
  return db.Profile.findOne({
    username: req.username,
  }).then((res) => {
    console.log(res + "from add reminder");
    if (res) {
      let reminderObject = {
        reminder,
        date,
        time,
      };

      res.reminders.push(reminderObject);
      res.save();
      return {
        status: true,
        message: "Reminder added successfully",
        statusCode: 200,
      };
    } else {
      return {
        status: false,
        message: "Reminder cannot be added",
        statusCode: 400,
      };
    }
  });
};

const getReminders = (username) => {
  return db.Profile.findOne({
    username: username,
  }).then((res) => {
    if (res) {
      return {
        status: true,
        message: "success",
        data: res.reminders,
        statusCode: 200,
      };
    } else {
      return {
        status: false,
        message: "failed",
        data: res.reminders,
        statusCode: 422,
      };
    }
  });
};
const deleteReminder = (index, username) => {
  console.log(index + "  index from delete-data-service-server");
  console.log(username + "  username from delete-data-service-server");
  return db.Profile.findOne({
    username: username,
  }).then((res) => {
    console.log(res + "res from deleteReminders()");
    if (res) {
      res.reminders.splice(index, 1);
      res.save();
      return {
        status: true,
        message: "reminder deleted success fully",
        statusCode: 200,
      };
    } else {
      return {
        status: false,
        message: "something went wrong on deleting remainder",
        statusCode: 400,
      };
    }
  });
};
const editReminder = (index, username, reminder, date, time) => {
  return db.Profile.findOne({
    username: username,
  }).then((res) => {
    if (res) {
      let updatedReminder = { reminder, date, time };
      res.reminders[index] = updatedReminder;
      res.save();
      return {
        status: true,
        message: "reminder edited success fully",
        statusCode: 200,
      };
    } else {
      return {
        status: false,
        message: "reminder edited failed ",
        statusCode: 400,
      };
    }
  });
};

module.exports = {
  register,
  login,
  addReminder,
  getReminders,
  deleteReminder,
  editReminder,
};
