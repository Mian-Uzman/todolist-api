const express = require("express");
const mongoose = require("mongoose");
const app = express();
const todoRoutes = require("./routes/todoRoutes");
const cors = require("cors");
const PORT = 3000;

app.use(express.json());
app.use(cors());

const errorMiddleware = (err, req, res, next) => {
	res.status(err.status).json({ error: true, message: err.message });
};

app.use("/todolist", todoRoutes);
app.use(errorMiddleware);

// MongoDB connection and Express Server Start
mongoose
	.connect("mongodb://localhost/training_mongodb")
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Listening on Port ${PORT}`);
		});
		console.log("MongoDB Connected");
	})
	.catch((err) => console.log(err));
