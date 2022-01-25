let express = require("express"); 
let planRouter = express.Router(); 
let {getAllPlans, createPlan, getTop3Plans, getPlan, updatePlan, deletePlan} = require("../controller/planController");

planRouter.route("/")
.get(getAllPlans)
.post(createPlan)

planRouter.route("/top3") 
.get(getTop3Plans) // to be tested

planRouter.route("/:id")
.get(getPlan)
.patch(updatePlan)
.delete(deletePlan)

module.exports = planRouter; 