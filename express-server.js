const express = require('express');
const app = express();
const session = require('express-session');



// Express Session Code
app.use(session({
    secret: 'my secret key',
    resave: false,
    saveUninitalized: false,
    //  cookie: { maxAge: 10 }
}));

app.use('/home', (req, res, next) => {
    console.log(req.session.id);
    res.send('<h1>Home page</h1>');
});

app.use('/logout', (req, res, next) => {
    req.session.destroy(() => {
        console.log("Session destroyed")
    })
    res.send('<h1>Logout Page</h1>')
})


app.use('/', (req, res, next) => {
    res.send('<h1>Root page</h1>');
});

app.listen(3000, () => console.log('Server running in port 3000'));

