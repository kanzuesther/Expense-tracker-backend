const{addIncome,getIncome,deleteIncome} = require('../controllers/income.js');
const{addExpense,getExpense,deleteExpense,deleteExpenses}  = require('../controllers/expense.js');
const router= require('express').Router()



router.post('/add-income',addIncome)
  .get('/get-income',getIncome)
  .delete('/delete-income/:id',deleteIncome)
  .post('/add-expense',addExpense)
  .get('/get-expenses',getExpense)
  .delete('/delete-expense/:id',deleteExpense)
  .delete('/delete-expenses',deleteExpenses)


module.exports = router