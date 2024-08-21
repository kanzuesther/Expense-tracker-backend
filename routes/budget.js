const router= require('express').Router()
const { addBudget,getBudget, deleteBudget } = require('../controllers/budget')



 router.post('/add-budget',addBudget)
  .get('/get-budget',getBudget)
  .delete('/delete-budget/:id',deleteBudget)

module.exports = router