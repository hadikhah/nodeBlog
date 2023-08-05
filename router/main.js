const MainController = require('../controller/MainController');

//-------------- Auth controllers ---------------------------- 
const ResetPasswordController = require('../controller/Auth/ResetPasswordController');
//-------------- Auth Validations ---------------------------- 
//-------------- DashBoard Controller
const DashboardController = require('../controller/Dashboard/DashboardController');
module.exports = {
    "DashboardController": new DashboardController,
    "MainController": new MainController,
}