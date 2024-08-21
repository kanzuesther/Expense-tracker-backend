const router= require('express').Router()
const { addCategory,getCategory, deleteCategory} = require('../controllers/category')




 router.post('/add-category',addCategory)
  .get('/get-category',getCategory)
  .delete('/delete-category/:id',deleteCategory)

module.exports = router