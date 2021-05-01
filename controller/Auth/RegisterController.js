const Validator = require('fastest-validator');
const V = new Validator({
    // useNewCustomCheckerFunction: true,

})
const Schema = require('../../rules/registerRule')
class RegisterController {
    constructor() {

    }
    showRegisterForm(req, res) {
        // res.send(RegisterController.registerSchema)
        res.render('register', { pageTitle: "ثبت نام", layout: "layouts/base" })
    }
    Register(req, res) {
        // console.log(Schema);
        console.log(req.body);
        // V.validate(req.body, Schema)
        const check = V.compile(Schema)
        if (check(req.body, Schema))
            return res.redirect('/register')
    }

}

module.exports = RegisterController;