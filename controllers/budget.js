const BudgetSchema = require("../models/BudgetModel")

exports.addBudget= async (req, res) => {
    console.log(req.body)
    const { amount, currency, budget_cycle, name } = req.body

    const budget = BudgetSchema({
        name,
        amount,
        currency,
        budget_cycle
    })
    try {
        //validations
        if (!name || !amount || !currency || !budget_cycle) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
       await budget.save();
       res.status(200).json({"message":"budget added sucessfully","data":budget})
    } catch (error) {
        res.status(500).json({ message: error.toString() })

    }
};

exports.getBudget = async (req, res) => {
    try {
        const budget = await BudgetSchema.find().sort({ createdAt: -1 })
        res.status(200).json(budget)

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.toString() })

    }
}


exports.deleteBudget = async (req, res) => {
    const { id } = req.params;
    BudgetSchema.findByIdAndDelete(id)
        .then((budget) => {
            res.status(200).json({ message: 'Budget Deleted', data: budget })
        })
        .catch((error) => {
            res.status(500).json({ message: 'Budget Error', error: error.toString() })
        })
}