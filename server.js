const express = require('express');
const app = express();
const todoRoutes = require('./routes/todoRoutes')


app.use(express.json())

app.use('/todolist', todoRoutes)

app.use((err, req, res, next) => {
    res.status(err.status).json({ error: true, message: err.message })
})


app.listen(3000, () => console.log('Server running in port 3000'));

