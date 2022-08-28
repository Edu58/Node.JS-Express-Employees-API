const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT')
const verifyRoles = require('../middleware/verifyRoles')
const rolesList = require('../config/roles')
const { getAllEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployee } = require('../controllers/employeesController')

router.get('/', getAllEmployees)
router.post('/', verifyJWT, verifyRoles(rolesList.Admin, rolesList.Editor), createEmployee)
router.put('/:id', verifyJWT, verifyRoles(rolesList.Admin, rolesList.Editor), updateEmployee)
router.get('/:id', getEmployee)
router.delete('/:id', verifyJWT, verifyRoles(rolesList.Admin), deleteEmployee)

module.exports = router