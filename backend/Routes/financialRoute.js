const financialroute = require("express").Router();

const controller = require("../controller/Financial_controller");
const expencecontroller = require("../controller/exepence_controller");
const sallarycontroller = require("../controller/sallary_controller");
const messagecontroller  = require("../controller/message_controller")

//  all the income base api request
financialroute
  .route("/api/income")
  .post(controller.create_Income)
  .get(controller.get_income)
  .delete(controller.delete_income);
financialroute.route("/api/income/:_id").put(controller.edit_income);

financialroute
  .route("/api/incomecategories")
  .post(controller.create_incomeCategories)
  .get(controller.get_incomeCategories);

financialroute.route("/api/labels").get(controller.get_Labels);

// all the expences api request
financialroute
  .route("/api/expence")
  .post(expencecontroller.create_expence)
  .get(expencecontroller.get_expence)
  .delete(expencecontroller.delete_expence);
financialroute.route("/api/expence/:_id").put(expencecontroller.edit_expence);

financialroute
  .route("/api/expencecategories")
  .post(expencecontroller.create_expenceCategories)
  .get(expencecontroller.get_expenceCategories);

financialroute
  .route("/api/empsallary")
  .post(sallarycontroller.create_sallary)
  .get(sallarycontroller.get_Sallary);

financialroute
  .route("/api/expencelabels")
  .get(expencecontroller.get_ExpenceLabels);


  financialroute.route("/api/conversation").post(messagecontroller.createConversation);
  financialroute.route("/api/conversations/:userId").get(messagecontroller.getConversation);
  financialroute.route("/api/message").post(messagecontroller.createMessage);
  financialroute.route("/api/message/:conversationId").get(messagecontroller.getMessage);
  financialroute.route("/api/users/:userId").get(messagecontroller.getUsersByid);


  

module.exports = financialroute;
