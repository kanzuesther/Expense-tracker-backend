const CashReservesSchema = require("../models/CashReservesModel")

exports.addCashReserves= async (req, res) => {
    console.log(req.body)
    const { amount, currency, cashreserves_cycle, name } = req.body

    const cashReserves = CashReservesSchema({
        name,
        balance,
        currency,
    })
    try {
        //validations
        if (!name || !balance || !currency) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
       await cashreserves.save();
       res.status(200).json({"message":"CashReserves added sucessfully","data":CashReserves})
    } catch (error) {
        res.status(500).json({ message: error.toString() })

    }
};

exports.getCashReserves = async (req, res) => {
    try {
        const CashReserves = await CashReservesSchema.find().sort({ createdAt: -1 })
        res.status(200).json(CashReserves)

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.toString() })

    }
}


exports.deleteCashReserves = async (req, res) => {
    const { id } = req.params;
    CashReservesSchema.findByIdAndDelete(id)
        .then((CashReserves) => {
            res.status(200).json({ message: 'CashReserves Deleted', data: CashReserves })
        })
        .catch((error) => {
            res.status(500).json({ message: 'CashReserves Error', error: error.toString() })
        })
}