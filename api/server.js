import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import User from './models/user.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://admin:Demo_root%40030@localhost:27017/authSystem?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Configure session middleware
app.use(session({
  secret: 'yourSecretKey',  // Replace with a strong secret
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: 'mongodb://admin:Demo_root%40030@localhost:27017/authSystem?authSource=admin',
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      req.session.userId = user._id;  // Save user ID in session
      res.json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

// Signup route
app.post('/signup', async (req, res) => {
  const { fullname, username, email, password } = req.body;
  const user = new User({ fullname, username, email, password });
  try {
    await user.save();
    req.session.userId = user._id;  // Save user ID in session
    res.json({ message: 'User created successfully', user });
  } catch (error) {
    if (error.code === 11000) {  // Duplicate key error code
      res.status(400).json({ message: 'Username already exists' });
    } else {
      res.status(500).json({ message: 'Error creating user', error });
    }
  }
});

// Logout route
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out', error: err });
    }
    res.json({ message: 'Logout successful' });
  });
});

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Protected route example
app.get('/protected', isAuthenticated, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
