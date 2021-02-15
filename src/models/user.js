/** @format */

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minLength: 3,
    lowercase: true,
    validate(value) {
      if (validator.isDivisibleBy(value, 1)) {
        throw new Error("Name should be a valid string");
      }
    },
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minLength: 7,
    validate(value) {
      // if(value.toLowerCase().includes("password")){
      //     throw new Error("Password should not include string password")
      // } else if(value%1 == 0 ){
      //     throw new Error("Password should be a valid string")
      // }
      if (!validator.isStrongPassword(value)) {
        throw new Error(
          "Password requirements:- minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"
        );
      }
    },
  },
  age: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) {
        throw new Error("Age should be a positive number");
      } else if (value < 18) {
        throw new Error("Your age is less than 18");
      }
    },
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
