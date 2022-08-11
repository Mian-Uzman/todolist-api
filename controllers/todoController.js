
let todos = require("../model/todo.model")
let lastTodoId = 4

const todoValidation = require("../validations/todoValidation")


module.exports = {
    allTodos: (req, res) => {
        res.json({ todos: todos })
    },

    singleTodo: (req, res, next) => {
        const todoId = parseInt(req.params.todoId)
        const todo = todos.find((todo) => todo.id === todoId)
        if (todo) {
            res.json({ todo: todo })
        }
        else {
            next({ status: 404, message: "No todo Found" })
        }
    },

    addTodo: (req, res, next) => {
        const errors = todoValidation.validate(req.body, { abortEarly: false })
        // console.log(errors.error)
        if (errors.error) {
            const allErrors = errors.error.details.map(err => err.message)
            next({ status: 500, message: allErrors })
            return;
        }
        const todo = req.body
        todo.id = lastTodoId
        lastTodoId++
        todos.push(todo)
        res.json({ Message: "Todo Added" })
    },

    updateTodo: (req, res, next) => {
        const errors = todoValidation.validate(req.body, { abortEarly: false })
        // console.log(errors.error)
        if (errors.error) {
            const allErrors = errors.error.details.map(err => err.message)
            next({ status: 500, message: allErrors })
            return;
        }
        const todoId = req.body.todoId
        const updatedText = req.body.updatedText
        const updatedCompleted = req.body.updatedCompleted
        const todo = todos.find((todo) => todo.id === todoId)
        if (todo) {
            todo.text = updatedText
            todo.completed = updatedCompleted
            res.json({ Message: `Todo ${todoId} updated to {Text:${updatedText}, Complete:${updatedCompleted}}` })
        }
        else {
            next({ status: 404, message: "No todo Found" })
        }
    },

    deleteTodo: (req, res, next) => {
        const todoId = parseInt(req.params.todoId)
        const todo = todos.find((todo) => todo.id === todoId)
        if (todo) {
            const newTodos = todos.filter((todo) => todo.id != todoId)
            todos = newTodos
            res.json({ message: `Todo id:${todoId} successfully deleted!` })
        }
        else {
            next({ status: 404, message: "Todo not Found" })
        }
    }
}