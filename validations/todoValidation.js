const joi = require("joi")


const todoValidation = joi.object({
    id: joi.number(),
    text: joi.string().min(3).max(100).required(),
    completed: joi.boolean().required()

})

module.exports = todoValidation