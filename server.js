// ...existing code...
const express = require("express");
const path = require("path");
const fs = require("fs");
const authRoutes = require("./routes/auth");
const cors = require('cors');
const session = require('express-session');
const pool = require('./db'); // added DB pool

const app = express();
app.use(express.json());

// allow credentials and origin
app.use(cors({
    origin: true,
    credentials: true
}));

// session must be registered before routes/static so req.session is available
app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,       // true only for HTTPS
        sameSite: 'lax',
        path: '/'
    }
}));

// Serve JS and CSS. Disable automatic index serving so our root route can control which page is shown.
app.use("/", express.static(path.join(__dirname, "public/Html"), { index: false }));
app.use("/Scripts/", express.static(path.join(__dirname, "public/Scripts")));
app.use("/Styles/css", express.static(path.join(__dirname, "public/Styles/css")));

// Root: if logged in -> dashboard, otherwise -> index
app.get("/", (req, res) => {
    if (req.session && req.session.userId) {
        return res.sendFile(path.join(__dirname, "public/Html/dashboard.html"));
    }
    return res.sendFile(path.join(__dirname, "public/Html/index.html"));
});

// Auth routes
app.use("/auth", authRoutes);

// Simple protected example (keeps existing behavior but returns session id if DB not wired)
function requireLogin(req, res, next) {
    console.log('Checking login for request to', req.path);
    if (!req.session || !req.session.userId) {
        return res.redirect('/'); // or 401 for APIs
    }
    console.log('User is logged in with userId:', req.session.userId);
    next();
}

// Return profile + stats for the logged-in user
app.get('/profile', requireLogin, async (req, res) => {
    try {
        const userRes = await pool.query(
            'SELECT id, username, email FROM users WHERE id = $1',
            [req.session.userId]
        );
        console.log("blabla");
        console.log('User query result:', userRes);
        if (!userRes.rows.length) return res.status(404).json({ error: 'User not found' });
        const user = userRes.rows[0];
        console.log('Fetched user:', user);

        let flashcardsStudied = 0;
        let achievementsUnlocked = 0;
        let studyStreak = 0;

        try {
            const statsRes = await pool.query(
                'SELECT flashcardsstudied, achievementsunlocked, studystreak FROM users WHERE id = $1',
                [user.id]
            );
            console.log('Stats query result:', statsRes);
            if (statsRes.rows.length) {
                const s = statsRes.rows[0];
                flashcardsStudied = s.flashcardsstudied || 0;
                achievementsUnlocked = s.achievementsunlocked || 0;
                studyStreak = s.studystreak || 0;
                console.log('Fetched stats from user table:', s);
            }
        } catch (e) {
            console.warn('Stats lookup failed, returning defaults', e.message || e);
        }

        res.json({
            username: user.username,
            email: user.email,
            flashcardsStudied,
            achievementsUnlocked,
            studyStreak
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get("/:page", (req, res) => {
    const page = req.params.page;
    if (page.startsWith(".")) return res.status(404).send("Not found");

    const filePath = path.join(__dirname, "public/Html", `${page}.html`);
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) return res.status(404).send("Page not found");
        res.sendFile(filePath);
    });
});

app.post('/logout', (req, res) => {
    if (!req.session.userId) {
        console.error('No session found');
        console.log('Logout attempted without a session');
        return res.status(400).json({ message: 'No session' });
    }

    else {
        req.session.destroy(err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Logout failed' });
            }

            res.clearCookie('connect.sid');
            console.log('Session destroyed, user logged out');
            res.json({ message: 'Logged out successfully' });
        });
    }
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
// ...existing code...