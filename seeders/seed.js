const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");
require("dotenv").config();

const User = require("../models/user");
const Book = require("../models/book");

const MONGO_URI = process.env.MONGO_URI;

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    await User.deleteMany({});
    await Book.deleteMany({});
    console.log("Cleared users and books");

    const users = [];

    for (let i = 0; i < 5; i++) {
      const hashedPassword = await bcrypt.hash("password123", 10);
      const user = await User.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: hashedPassword,
      });
      users.push(user);
    }

    console.log("Created 5 users");

    for (let i = 0; i < 10; i++) {
      await Book.create({
        title: faker.lorem.words(3),
        author: faker.person.fullName(),
        yearPublished: faker.date.past({ years: 30 }).getFullYear(),
        userId: users[Math.floor(Math.random() * users.length)]._id,
      });
    }

    console.log("Created 10 books");

    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seed();
