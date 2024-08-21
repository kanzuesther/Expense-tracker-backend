const CashReservesSchema = require("../models/CashReservesModel")

exports.addCashReserves= async (req, res) => {
    console.log(req.body)
    const { balance, currency, name } = req.body

    const cashreserves = CashReservesSchema({
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
       res.status(200).json({"message":"CashReserves added sucessfully","data":cashreserves})
    } catch (error) {
        res.status(500).json({ message: error.toString() })

    }
};

exports.getCashReserves = async (req, res) => {
    try {
        const cashreserves = await CashReservesSchema.find().sort({ createdAt: -1 })
        res.status(200).json(cashreserves)

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.toString() })

    }
}


exports.deleteCashReserves = async (req, res) => {
    const { id } = req.params;
    CashReservesSchema.findByIdAndDelete(id)
        .then((cashreserves) => {
            res.status(200).json({ message: 'CashReserves Deleted', data: cashreserves })
        })
        .catch((error) => {
            res.status(500).json({ message: 'CashReserves Error', error: error.toString() })
        })
}