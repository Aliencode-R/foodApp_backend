let planModel = require("../Models/planModel"); 

module.exports.getAllPlans = async function (req, res) {
    try {
        let plans = await planModel.find(); 
        if(plans) {
            res.json({
                data: plans
            })
        }
    } catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.createPlan = async function (req, res) {
    try {
        let plan = await planModel.create(req.body); 
        res.json({
            message: "plan created succesfully", 
            plan
        })
    } catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.deletePlan = async function (req, res) {
    try {
        let deletedPlan = await planModel.findByIdAndDelete(req.params.id); 
        res.json({
            message: "plan deleted succesfully", 
            deletedPlan
        });
    } catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.updatePlan = async function (req, res) {
    try {
        let plan = await planModel.findById(req.params.id);
        for(let key in req.body) {
            plan[key] = req.body[key]; 
        }
        await plan.save(); 
        return res.json({
            message: 'plan updated succesfully',
            data: plan
        });
    } catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.getPlan = async function (req, res) {
    try {
        let plan = await planModel.findById(req.params.id); 
        if (plan) {
            console.log(plan);
            return res.json({
                message: "plan retrieved",
                data: plan,
            });
        }
    } catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.getTop3Plans = async function (req, res) {
    try {
        let plans = await planModel.find()
        .sort({averageRating: -1}).limit(3); 
        res.json({
            message: "top 3 plans", 
            data: plans
        })
    } catch (err) {
        res.json({
            message: err.message
        })
    }
}