const express = require('express')
const router = express.Router()


const todoController = require("../controllers/todoController")


router.get('/todos', todoController.allTodos)

router.get('/todo/:todoId', todoController.singleTodo)

router.post('/add_todo', todoController.addTodo)

router.put('/update_todo', todoController.updateTodo)

router.delete('/todo/:todoId', todoController.deleteTodo)

module.exports = router

