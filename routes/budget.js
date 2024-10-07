const router= require ('express').Router()
const { addBudget,getBudget,deleteBudget,deleteBudgets } = require('../controllers/budget')



 router.post('/add-budget',addBudget)
  .get('/get-budget',getBudget)
  .delete('/delete-budget/:id',deleteBudget)
  .delete('/delete-budgets',deleteBudgets)



module.exports = router