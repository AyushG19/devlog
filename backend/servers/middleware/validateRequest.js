const joi = require('joi');

const schema = joi.object({
    username: joi.string().alphanum().min(5).max(30).required(),
    password: joi.string().pattern(new RegExp("^(?=.*[!@#$%&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%&*]{8,30}$")),
});

function validateRequest(req, res, next) {
    const { err } = schema.validate(req.body);  //returns object {err,result}
    if (err) return req.status(400).json({ error: err.details[0] });
    next();
};

module.exports = validateRequest;