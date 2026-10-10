const express = require('express');
const app = express();

const { body, validationResult } = require('express-validator');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var validationRegistration = [
    body('username')
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long"),

    body('useremail')
        .isEmail().withMessage("Please provide a valid email ID"),

    body('userpass')
        .isLength({ min: 5, max: 10 }).withMessage("Password must be between 5 and 10 characters long"),

    body('userage')
        .isNumeric().withMessage("Age must be numeric")
];

app.get('/myform', (req, res) => {
    res.render('myform', { errors: [] });
});

app.post('/saveform', validationRegistration, (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render('myform', {
            errors: errors.array()
        });
    }

    res.send(req.body);
});

app.listen(3000, () => {
    console.log('Express server started on port 3000');
});