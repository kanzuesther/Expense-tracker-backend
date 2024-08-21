const ReminderSchema = require("../models/ReminderModel")

exports.addReminder = async (req, res) => {
    console.log(req.body)
    const { amount, date, reminder_cycle, name } = req.body

    const reminder = ReminderSchema({
        name,
        amount,
        date,
        reminder_cycle
    })
    try {
        //validations
        if (!name || !amount || !date || !reminder_cycle) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
       await reminder.save();
       res.status(200).json({"message":"reminder added sucessfully","data":reminder})
    } catch (error) {
        res.status(500).json({ message: error.toString() })

    }
};

exports.getReminder = async (req, res) => {
    try {
        const reminder = await ReminderSchema.find().sort({ createdAt: -1 })
        res.status(200).json(reminder)

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.toString() })

    }
}


exports.deleteReminder = async (req, res) => {
    const { id } = req.params;
    ReminderSchema.findByIdAndDelete(id)
        .then((reminder) => {
            res.status(200).json({ message: 'Reminder Deleted', data: reminder })
        })
        .catch((error) => {
            res.status(500).json({ message: 'Reminder Error', error: error.toString() })
        })
}