// controllers/userController.js
const Users = require('../models/loginmodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { name, email, dob, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Users({ name, dob,status:'ACTIVE', email, password: hashedPassword });
        await newUser.save();
        res.status(201).send({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send({ success: false, message: 'Error registering user' });
    }
};

const loginUser = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email:email });
        if (!user) {
            return res.status(400).send('Cannot find user');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Incorrect password');
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).send({
            token: token,
            success: true,
            message: "Login Successfully"
        });
    } catch (error) {
        res.status(500).send('Error logging in');
    }
};

const getAllUsers = async ( req,res)=>{
    try {
        const users = await Users.find();
        res.send({ data:users,success: true, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
}


const deleteUser = async (req, res) => {
    console.log(req.params);
    try {
        const userId = req.params.id;
        const result = await Users.findByIdAndDelete(userId);
        if (!result) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('User deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting user');
    }
};

module.exports = { registerUser, loginUser,getAllUsers,deleteUser };
