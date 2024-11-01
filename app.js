require(`dotenv`).config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5500;
const cors = require("cors");

app.use(cors());

// db connection
//const dbConnection = require("./db/dbConfig");

//authentication middleware
const authMiddleware = require("./middleware/authMiddleware");
app.use(express.json());

//user routes middleware
const userRoutes = require("./routes/userRoute");
app.use("/api/user", userRoutes);

//question routes middleware
const questionsRoute = require("./routes/questionRoute");
app.use("/api/questions", authMiddleware, questionsRoute);

//answer routes middleware file
const answerRoute = require("./routes/answerRoute");
app.use("/api/answer", authMiddleware, answerRoute);

async function start() {
  try {
    //const result = await dbConnection.execute("SELECT 'Test'");
    await app.listen(port);
    console.log("database connection established");
    console.log(`listening on ${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();
