const CashReservesSchema = require("../models/CashReservesModel")

exports.addCashReserves = async (req, res) => {
    console.log(req.body)
    const { balance, currency, name, color, icon } = req.body

    const cashreserves = CashReservesSchema({
        name,
        balance,
        currency,
        color,
        icon
    })
    try {
        //validations
        if (!name || !currency) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        await cashreserves.save();
        res.status(200).json({ "message": "CashReserves added sucessfully", "data": cashreserves })
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

exports.updateCashReserve = async (req, res) => {
    const { id } = req.params;
    const { name, balance, currency, color, icon } = req.body;

    try {
        // Update the document by ID
        const updatedCashReserve = await CashReserves.findByIdAndUpdate(
            id, // ID of the document to update
            { name, balance, currency, color, icon }, // Fields to update
            { new: true, runValidators: true } // Return updated document & run validation
        );

        if (!updatedCashReserve) {
            return res.status(404).json({ message: 'Cash Reserve not found' });
        }

        // Return updated document
        res.status(200).json({data: updatedCashReserve, message: "Cash reserve updated successfully"});
    } catch (error) {
        // Handle errors (like invalid IDs or validation issues)
        res.status(500).json({ error: 'Failed to update cash reserve', details: error.message });
    }
}