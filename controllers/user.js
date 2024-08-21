const UserSchema = require("../models/UserModel")

exports.addUser = async (req, res) => {
    console.log(req.body)
    const { name, email, password } = req.body

    const user = UserSchema({
        name,
        email,
        password
    })
    try {
        //validations
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        await user.save()
        res.status(200).json({ "message": "user added sucessfully", "data": user })

    } catch (error) {
        res.status(500).json({ message: error.toString() })

    }
};

exports.getUser = async (req, res) => {
    try {
        const reminder = await UserSchema.find().sort({ createdAt: -1 })
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.toString() })

    }
}


exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    UserSchema.findByIdAndDelete(id)
        .then((reminder) => {
            res.status(200).json({ message: 'User Deleted', data: user })
        })
        .catch((error) => {
            res.status(500).json({ message: 'User Error', error: error.toString() })
        })
}