const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    try {
        const { name, email, password, user_type } = req.body;

        // Log incoming request
        console.log('Creating user with email:', email);

        // Check existing user
        const existingUser = await User.findOne({ email }).select('email');
        if (existingUser) {
            console.log('Duplicate email found:', email);
            return res.status(409).json({
                success: false,
                message: 'Email already exists',
                suggestion: 'Please try with a different email address'
            });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            user_type
        });

        console.log('User created successfully:', user._id);

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, user_type: user.user_type },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.status(201).json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                user_type: user.user_type
            },
            token: token
        });

    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Log incoming request
        console.log('Login attempt for email:', email);

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found:', email);
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Invalid password for user:', email);
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        console.log('Login successful for user:', email);

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, user_type: user.user_type },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.status(200).json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                user_type: user.user_type
            },
            token: token
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single user
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createUser,
    loginUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
};

