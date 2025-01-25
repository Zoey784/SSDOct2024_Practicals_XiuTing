const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { poolPromise } = require("../dbConfig");

async function registerUser(req, res) {
    const { username, password, role } = req.body;

    if (!["member", "librarian"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
    }

    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("username", username)
            .query("SELECT * FROM Users WHERE username = @username");

        if (result.recordset.length > 0) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool
            .request()
            .input("username", username)
            .input("passwordHash", hashedPassword)
            .input("role", role)
            .query("INSERT INTO Users (username, passwordHash, role) VALUES (@username, @passwordHash, @role)");

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function login(req, res) {
    const { username, password } = req.body;

    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("username", username)
            .query("SELECT * FROM Users WHERE username = @username");

        const user = result.recordset[0];
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.user_id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { registerUser, login };
