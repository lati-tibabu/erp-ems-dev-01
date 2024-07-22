const express = require("express");
const sequelize = require("./config/database");
const Student = require("./models/student");

const app = express();
const port = 3040;

app.use(express.json());

// Endpoint to sync database
app.post("/syncDB", async (req, res) => {
  try {
    await syncDB();
    res.send("Database Synced");
  } catch (error) {
    res.status(500).send("Error syncing database: " + error.message);
  }
});

// Endpoint to get all students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    res.status(500).send("Error getting students: " + error.message);
  }
});

// Endpoint to get specific student
app.get("/students/:student_id", async (req, res) => {
  studId = req.params.student_id;
  try {
    const students = await Student.findByPk(studId);
    res.json(students);
  } catch (error) {
    res.status(500).send("Error getting students: " + error.message);
  }
});

// Endpoint to create a new student
app.post("/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).send("Error creating student: " + error.message);
  }
});

// Endpoint to update a student
app.put("/students/:id", async (req, res) => {
  const studId = req.params.student_id;

  try {
    const student = await Student.findByPk(studId);
    if (!student) {
      res.status(404).send("Student not found");
    } else {
      await student.update(req.body);
      res.json(student);
    }
  } catch (error) {
    res.status(500).send("Error updating student: " + error.message);
  }
});

// Endpoint to delete a student
app.delete("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      res.status(404).send("Student not found");
    } else {
      await student.destroy();
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(500).send("Error deleting student: " + error.message);
  }
});

// Function to sync database
const syncDB = async () => {
  await sequelize.sync({ force: true });
};

// Start the server and connect to the database
app.listen(port, async () => {
  console.log("Server Listening...");

  try {
    console.log("Connecting to database...");
    await sequelize.authenticate();
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
});
