const ReminderSchema = require("../models/ReminderModel")

exports.addReminder = async (req, res) => {
    console.log(req.body)
    const { amount, date, reminder_cycle, name, cash_reserve } = req.body

    const reminder = ReminderSchema({
        name,
        amount,
        date,
        reminder_cycle,
        cash_reserve
    })
    try {
        //validations
        if (!name || !amount || !date || !reminder_cycle || !cash_reserve) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        reminder.save()
            .then(async (data) => {
                console.log("Reminder saved successfully, data");
                console.log(data);

                await data.populate("cash_reserve");

                res.status(200).json({ message: 'Reminder Added', data: reminder })
            })
            .catch((error) => {
                console.log("Error saving reminder, error")
                console.log(error);
            })
    } catch (error) {
        res.status(500).json({ message: error.toString() })

    }
}


exports.getReminder = async (req, res) => {
    try {
        const reminder = await ReminderSchema.find().sort({ createdAt: -1 }).populate('cash_reserve')
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

exports.deleteReminders = async (req, res) => {
    console.log(req.body)
    const { selectedIds } = req.body

    selectedIds.forEach(async (id) => {
        await ReminderSchema.findByIdAndDelete(id)
    })

    res.status(200).json({ message: 'Reminders Deleted' });
}