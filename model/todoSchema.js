const mongoose = require("mongoose");
const todoSchema = mongoose.Schema({
	text: {
		type: String,
		min: 5,
		max: 100,
		required: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	postedAt: {
		type: Date,
		default: Date.now,
	},
});
module.exports = mongoose.model("todos", todoSchema);
