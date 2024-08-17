const IncomeSchema = require("../models/IncomeModel")

exports.addIncome = async (req, res) => {
    console.log(req.body)
    const { title, amount, category, description, date } = req.body

    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    })
    try {
        //validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ message: 'Amount must be a postive number!' })
        }
        await income.save()
        const incomes = await IncomeSchema.find().sort({ createdAt: -1 })
        res.status(200).json({ message: 'Income Added', data: incomes });

    } catch (error) {
        res.status(500).json({ message: error.toString() })

    }
    console.log(income)
}

exports.getIncome = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({ createdAt: -1 })
        res.status(200).json(incomes)

    } catch (error) {
        res.status(500).json({ message: 'Server error' })

    }
}


exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    IncomeSchema.findByIdAndDelete(id).then( async (income)=>{
        const incomes = await IncomeSchema.find().sort({ createdAt: -1 })
        res.status(200).json({ message: 'Successfully deleted', data: incomes });    
    })
    .catch((error) => {
        res.status(500).json({ message: 'Server Error', error: error.toString() })
    });

   
        // .then((income) => {
        //     res.status(200).json({ message: 'Successfully deleted', data: income })
        // })

}