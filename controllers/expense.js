const TransactionSchema = require("../models/TransactionModel")
const CashReserveSchema = require("../models/CashReservesModel")




exports.addExpense = async (req, res) => {
    console.log(req.body)
    const { title, sourceAccount, type, amount, category, description, date } = req.body

    const expense = TransactionSchema({
        title,
        type,
        sourceAccount,
        amount,
        category,
        description,
        date
    })
    try {
        //validations
        if (!date) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be a postive number!' })
        }
        expense.save()
            .then(async (data) => {
                console.log("Expense saved successfully, data");
                console.log(data);

                const sourceAccount = await CashReserveSchema.findById(expense.sourceAccount);
                sourceAccount.balance += (expense.type === 'income' ? 1 : -1) * expense.amount;
                await sourceAccount.save();

                await data.populate("sourceAccount")

                await data.populate("category");

                res.status(200).json({ message: 'Expense Added', data: expense })
            })
            .catch((error) => {
                console.log("Error saving transaction, error")
                console.log(error);
            })
        // await expense.populate("sourceAccount").populate("category");

    } catch (error) {
        res.status(500).json({ message: error.toString() })

    }
}

exports.getExpense = async (req, res) => {
    try {
        const expense = await TransactionSchema.find().sort({ createdAt: -1 }).populate('sourceAccount').populate('category')
        res.status(200).json(expense)

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.toString() })

    }
}


exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    TransactionSchema.findByIdAndDelete(id)
        .then(async(expense) => {
            res.status(200).json({ message: 'Expense Deleted', data: expense })

            const sourceAccount = await CashReserveSchema.findById(expense.sourceAccount);
            sourceAccount.balance += (expense.type === 'income' ? -1 : 1) * expense.amount;
            await sourceAccount.save();
        })
        .catch((error) => {
            res.status(500).json({ message: 'Server Error', error: error.toString() })
        })
}

exports.deleteExpenses= async (req, res) => {
    console.log(req.body)
    const { selectedIds } = req.body

    selectedIds.forEach(async (id) => {
        await TransactionSchema.findByIdAndDelete(id)
    })

    res.status(200).json({ message: 'Transactions Deleted' });
}

exports.editExpense = async (req, res) => {
    const { id } = req.params;
    const { title, sourceAccount, type, amount, category, description, date } = req.body;
    console.log("Edit debugging",id)
    try {
        const expense = await TransactionSchema.findById(id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        // Adjust balance of sourceAccount if amount or type is changed
        if (expense.amount !== amount || expense.type !== type) {
            const sourceAcc = await CashReserveSchema.findById(expense.sourceAccount);
            // Reverse old transaction effect
            sourceAcc.balance += (expense.type === 'income' ? -1 : 1) * expense.amount;
            // Apply new transaction effect
            sourceAcc.balance += (type === 'income' ? 1 : -1) * amount;
            await sourceAcc.save();
        }

        // Update expense fields
        expense.title = title || expense.title;
        expense.sourceAccount = sourceAccount || expense.sourceAccount;
        expense.type = type || expense.type;
        expense.amount = amount || expense.amount;
        expense.category = category || expense.category;
        expense.description = description || expense.description;
        expense.date = date || expense.date;

        const updatedExpense = await expense.save();
        await updatedExpense.populate("sourceAccount")
        await updatedExpense.populate("category");

        res.status(200).json({ message: 'Expense Updated', data: updatedExpense });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.toString() });
    }
};
