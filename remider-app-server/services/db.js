const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Reminder_App", {
  useNewUrlParser: true,
});

const Profile = mongoose.model("Profile", {
  fullname: String,
  username: String,
  password: String,
  reminders: [],
});

module.exports = {
  Profile,
};
