const CategorySchema = require("../models/CategoryModel")
const multer = require("multer");


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, "../uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
});

// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
const maxSize = 1 * 1000 * 1000;

var upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png|svg/;
        var mimetype = filetypes.test(file.mimetype);

        var extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb(
            "Error: File upload only supports the " +
                "following filetypes - " +
                filetypes
        );
    },

    // mypic is the name of file attribute
}).single("mypic");


exports.addCategory= async (req, res) => {
    const { parent,icon, name, color} = req.body

    const category = CategorySchema({
        name,
        parent,
        icon,
        color,
        createdBy: req.user._id
    })
    try {
        //validations
        if (!name || !icon||!color) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        
       await category.save();
       res.status(200).json({"message":"Category added sucessfully","data":category})
    } catch (error) {
        res.status(500).json({ message: error.toString() })

    }
};

exports.getCategory = async (req, res) => {
    try {
        const category = await CategorySchema.find().sort({ createdAt: -1 })
        res.status(200).json(category)

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.toString() })

    }
}


exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    CategorySchema.findByIdAndDelete(id)
        .then((category) => {
            res.status(200).json({ message: 'Category Deleted', data: category })
        })
        .catch((error) => {
            res.status(500).json({ message: 'Budget Error', error: error.toString() })
        })
}