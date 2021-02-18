/** @format */

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Task = require("../models/task");

const userSchema = new mongoose.Schema(
  {
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
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password should not include string password");
        }
        // if (!validator.isStrongPassword(value)) {
        //   throw new Error(
        //     "Password requirements:- minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"
        //   );
        // }
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
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  { timestamps: true }
);

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = await jwt.sign(
    { _id: user._id.toString() },
    "Thisismytaskmanagerwebsite"
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
