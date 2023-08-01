const MainController = require('../controller/MainController');

//-------------- Auth controllers ---------------------------- 
const LoginController = require('../controller/Auth/LoginController');
const RegisterController = require('../controller/Auth/RegisterController');
const ResetPasswordController = require('../controller/Auth/ResetPasswordController');
//-------------- Auth Validations ---------------------------- 
const RegisterValidation = require('../validation/RegisterValidation');
//-------------- DashBoard Controller
const DashboardController = require('../controller/Dashboard/DashboardController');
module.exports = {
    "LoginController": new LoginController,
    "RegisterController": new RegisterController,
    "DashboardController": new DashboardController,
    "ResetPasswordController": new ResetPasswordController,
    "MainController": new MainController,

    "RegisterValidation": RegisterValidation,
}