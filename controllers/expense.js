const ExpenseSchema= require("../models/ExpenseModel")

exports.addExpense= async(req,res) =>{
    console.log(req.body)
    const {title, amount, category, description,date} = req.body

    const expense= ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })
    try{
        //validations
        if(!title|| !category|| !description||!date){
        return res.status(400).json({message:'All fields are required!'})
    }
    if(amount<=0 || !amount ==='number'){
        return res.status(400).json({message:'Amount must be a postive number!'})
    }
    await expense.save()
    res.status(200).json({message: 'Expense Added', data:expense})

    } catch(error){
        res.status(500).json({message:error.toString()})

    }
}

exports.getExpense= async(req,res) =>{
    try{
        const expense= await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(expense)

    } catch(error){
        res.status(500).json({message:'Server error', error:error.toString()})

    }
}


exports.deleteExpense= async(req,res) =>{
    const{id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
    .then((expense)=>{
        res.status(200).json({message:'Expense Deleted', data:expense})
    })
    .catch((error)=>{
        res.status(500).json({message:'Server Error',error:error.toString()})
    })
}