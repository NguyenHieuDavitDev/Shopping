const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 5000; // You can choose any available port

app.use(cors());
app.use(bodyParser.json());

// Read employees from JSON file
app.get("/api/employees", (req, res) => {
  fs.readFile("employees.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading file");
    }
    res.json(JSON.parse(data));
  });
});

// Add a new employee
app.post("/api/employees", (req, res) => {
  const newEmployee = req.body;
  fs.readFile("employees.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading file");
    }
    const employees = JSON.parse(data);
    newEmployee.id =
      employees.length > 0 ? employees[employees.length - 1].id + 1 : 1; // Auto-generate ID
    employees.push(newEmployee);
    fs.writeFile(
      "employees.json",
      JSON.stringify(employees, null, 2),
      (err) => {
        if (err) {
          return res.status(500).send("Error writing file");
        }
        res.status(201).json(newEmployee);
      }
    );
  });
});

// Update an existing employee
app.put("/api/employees/:id", (req, res) => {
  const employeeId = parseInt(req.params.id);
  const updatedEmployee = req.body;
  fs.readFile("employees.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading file");
    }
    const employees = JSON.parse(data);
    const index = employees.findIndex((emp) => emp.id === employeeId);
    if (index !== -1) {
      employees[index] = { ...employees[index], ...updatedEmployee };
      fs.writeFile(
        "employees.json",
        JSON.stringify(employees, null, 2),
        (err) => {
          if (err) {
            return res.status(500).send("Error writing file");
          }
          res.json(employees[index]);
        }
      );
    } else {
      res.status(404).send("Employee not found");
    }
  });
});

// Delete an employee
app.delete("/api/employees/:id", (req, res) => {
  const employeeId = parseInt(req.params.id);
  fs.readFile("employees.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading file");
    }
    const employees = JSON.parse(data);
    const updatedEmployees = employees.filter((emp) => emp.id !== employeeId);
    fs.writeFile(
      "employees.json",
      JSON.stringify(updatedEmployees, null, 2),
      (err) => {
        if (err) {
          return res.status(500).send("Error writing file");
        }
        res.status(204).send();
      }
    );
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
