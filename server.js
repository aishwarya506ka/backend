const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Mongoose connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));





// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views'))); // So choice.html is found

// Serve login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Handle login form submission
app.post('/login', async (req, res) => {
    const { Username, password, useremail } = req.body;

    if (!Username || !password || !useremail) {
        return res.status(400).send("❌ All fields are required.");
    }

    try {
        const user = await User.findOne({ Username, password, useremail });

        if (user) {
            // Redirect to choice.html which should be in /views or /public
            return res.redirect('/choice.html');
        } else {
            return res.send("❌ Invalid credentials.");
        }
    } catch (err) {
        console.error("❌ Login error:", err.message);
        return res.status(500).send("❌ Server error: " + err.message);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
