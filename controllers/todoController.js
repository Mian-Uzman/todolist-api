const { default: mongoose } = require("mongoose");
let Todos = require("../model/todoSchema");

module.exports = {
	allTodos: (req, res) => {
		Todos.find({}, { __v: 0 }).then((data) => {
			// console.log(data);
			res.json({ message: "All Todos", data: data });
		});
	},

	addTodo: (req, res, next) => {
		const text = req.body.text;
		Todos.create({ text })
			.then((data) => {
				console.log(data);
				res.json({ message: "Todo is added" });
			})
			.catch((err) => {
				next({ status: 500, message: err });
			});
	},

	updateTodo: (req, res, next) => {
		const todoId = req.params.todoId;
		const newText = req.body.text;
		const newCompleted = req.body.completed;

		Todos.updateOne({ _id: todoId }, { text: newText, completed: newCompleted })
			.then(() => {
				res.json({ message: `Todo with id ${todoId} Updated` });
			})
			.catch((err) => {
				next({ status: 500, message: err });
			});
	},

	deleteTodo: (req, res, next) => {
		const todoId = req.params.todoId;
		Todos.deleteOne({ _id: todoId })
			.then(() => {
				res.json({ message: `Todo with id ${todoId} Deleted` });
			})
			.catch((err) => {
				next({ status: 500, message: err });
			});
	},
};
