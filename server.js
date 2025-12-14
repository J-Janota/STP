// ====== Imports ======
const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const session = require("express-session");
const pool = require("./db");
const authRoutes = require("./routes/auth");

const app = express();


// ====== Global Middleware ======
app.use(express.json());

app.use(cors({
    origin: true,
    credentials: true
}));

// ⚠️ Session MUST come before anything that uses req.session
app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        sameSite: 'lax',
        path: '/'
    }
}));


// ====== Auth Guard Middleware ======
function requireLogin(req, res, next) {
    const publicPaths = ['/', '/login.html', '/signup.html'];

    if (!req.session?.userId && !publicPaths.includes(req.path)) {
        console.log('User not logged in, redirecting to /');
        return res.redirect('/');
    }
    next();
}


// ====== PUBLIC ROUTES (NO AUTH) ======

// Root
app.get("/", (req, res) => {
    if (req.session?.userId) {
        return res.sendFile(path.join(__dirname, "public/Html/dashboard.html"));
    }
    res.sendFile(path.join(__dirname, "public/Html/index.html"));
});

// Auth routes must be PUBLIC
app.use("/auth", authRoutes);

// Public static assets (JS/CSS must load without login)
app.get('/Scripts/:file', (req, res) => {
    const file = req.params.file;
    if (file.startsWith('.')) return res.status(404).send('Not found');

    const filePath = path.join(__dirname, 'public/Scripts', file);
    fs.access(filePath, fs.constants.F_OK, err => {
        if (err) return res.status(404).send('File not found');
        res.sendFile(filePath);
    });
});

app.get('/Styles/css/:file', (req, res) => {
    const file = req.params.file;
    if (file.startsWith('.')) return res.status(404).send('Not found');

    const filePath = path.join(__dirname, 'public/Styles/css', file);
    fs.access(filePath, fs.constants.F_OK, err => {
        if (err) return res.status(404).send('File not found');
        res.sendFile(filePath);
    });
});


// ====== PROTECTED ROUTES ======

// API
app.get("/userdata", requireLogin, async (req, res) => {
    try {
        const userRes = await pool.query(
            'SELECT * FROM users WHERE id = $1',
            [req.session.userId]
        );

        if (!userRes.rows.length) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = userRes.rows[0];
        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            flashcardsStudied: user.flashcardsstudied || 0,
            achievementsUnlocked: user.achievementsunlocked || 0,
            studyStreak: user.studystreak || 0
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


// Protected HTML pages
app.get("/:page", requireLogin, (req, res) => {
    let page = req.params.page.replace('.html', '');
    if (page.startsWith('.')) return res.status(404).send("Not found");

    const filePath = path.join(__dirname, "public/Html", `${page}.html`);
    fs.access(filePath, fs.constants.F_OK, err => {
        if (err) return res.status(404).send("Page not found");
        res.sendFile(filePath);
    });
});


// Logout (protected)
app.post('/logout', requireLogin, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Logout failed' });
        }

        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out successfully' });
    });
});


// ====== Server ======
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
