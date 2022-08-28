const Employee = require('../models/Employee')

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find()
    if (!employees) return res.status(204).json({ 'message': 'No employees found' })
    res.json({ employees })
}

const createEmployee = async (req, res) => {
    const { firstname, lastname } = req.body

    if (!firstname || !lastname) return res.status(400).json({ 'message': 'first name & last name are required' })

    const foundEmployee = await Employee.findOne({ firstname: firstname, lastname: lastname }).exec()

    if (foundEmployee) return res.status(409).json({ 'message': 'Employee aready exists' })

    try {
        const newUser = await Employee.create({
            firstname,
            lastname
        })

        res.status(201).json({ newUser })
    } catch (error) {
        res.json({ 'error': error.message })
    }
}

const updateEmployee = async (req, res) => {

    if (!req?.params?.id) return res.status(400).json({ 'message': 'id parameter is required' })

    const foundEmployee = await Employee.findOne({ _id: req.params.id }).exec()

    if (!foundEmployee) return res.status(404).json({ 'message': 'employee with provided id does not exist' })

    if (req.body?.firstname) foundEmployee.firstname = req.body.firstname
    if (req.body?.lastname) foundEmployee.lastname = req.body.lastname

    const result = await foundEmployee.save()

    res.json(result)
}

const deleteEmployee = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'id parameter is required' })

    const foundEmployee = await Employee.findOne({ _id: req.params.id }).exec()

    if (!foundEmployee) return res.status(404).json({ 'message': 'employee with provided id does not exist' })

    const result = await foundEmployee.deleteOne({ _id: req.params.id })

    res.sendStatus(200)
}

const getEmployee = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'id parameter is required' })

    const foundEmployee = await Employee.findById(req.params.id).exec()

    if (!foundEmployee) return res.status(404).json({ 'message': 'employee with provided id does not exist' })

    res.status(200).json(foundEmployee)
}

module.exports = { getAllEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployee }