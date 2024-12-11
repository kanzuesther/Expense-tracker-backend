const BudgetSchema = require("../models/BudgetModel")
const Transaction = require("../models/TransactionModel")
const mongoose = require("mongoose")

async function getTotalExpenseForCashReserve(cashReserveId, categoryId=null) {
    try {
        const total = await Transaction.aggregate([
            {
                $match: {
                    sourceAccount: new mongoose.Types.ObjectId(cashReserveId), // Match the specific CashReserves source account
                    type: 'expense', // Only consider expenses
                    is_deleted: false, // Ensure that deleted transactions are excluded,
                    category: new mongoose.Types.ObjectId(categoryId),
                }
            },
            {
                $group: {
                    _id: null, // Group all records together
                    totalAmount: { $sum: "$amount" } // Sum the amounts of all matching transactions
                }
            }
        ]);

        // Return the total amount or 0 if no records are found
        return total.length > 0 ? total[0].totalAmount : 0;
    } catch (error) {
        console.error('Error fetching total expense:', error);
        throw error;
    }
}

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
    
        budget.save().then(async (data) => {
            data.populate("account");

            let total_expenses = getTotalExpenseForCashReserve(data.account._id, data.category);

            res.status(200).json({ 
                "message": "budget added sucessfully", 
                "data": {budget, total_expenses} 
            })
        })
    } catch (error) {
        res.status(500).json({ message: error.toString() })

    }
};


exports.getBudget = async (req, res) => {
    try {
        console.log("Getting budgets")
        let budget = await BudgetSchema.find().sort({ createdAt: -1 }).populate('account').populate('category')
        
        // get all the budgets for the current user
        budget = budget.filter((e) => {
            return e?.account?.user.toString() == req.user._id;
        });
        
        // get total expenses of the cash reserver associated with the budget
        budget =  await Promise.all(budget.map(async (b) => {
            total_expenses = await getTotalExpenseForCashReserve(b.account._id, b.category._id);
            // b.total_expenses = total_expenses
            return { budget: b, total_expenses }
        }))
        console.log(budget[0])
        res.status(200).json(budget)

    } catch (error) {
        console.error(error);
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