const BudgetSchema = require("../models/BudgetModel")

exports.addBudget= async (req, res) => {
    const { amount, currency, cycle, name,account ,category} = req.body
    const budget = BudgetSchema({
        name,
        amount,
        currency,
        cycle,
        account,
        category
    })
    try {
        // validations
        if (!name || !amount || !currency || !cycle || !account) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        await budget.save();
        res.status(200).json({ "message": "budget added sucessfully", "data": budget })
    } catch (error) {
        res.status(500).json({ message: error.toString() })

    }
};

exports.getBudget = async (req, res) => {
    try {
        let budget = await BudgetSchema.find().sort({ createdAt: -1 }).populate('account').populate('category')
        
        budget = budget.filter((e) => {
            return e?.account?.user.toString() == req.user._id;
        });
        
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
exports.deleteBudgets = async (req, res) => {
    console.log(req.body)
    const { selectedIds } = req.body

    selectedIds.forEach(async (id) => {
        await BudgetSchema.findByIdAndDelete(id)
    })

    res.status(200).json({ message: 'Budgets Deleted' });
}