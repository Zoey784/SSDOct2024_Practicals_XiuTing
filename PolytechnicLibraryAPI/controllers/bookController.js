const { poolPromise } = require("../dbConfig");

async function getAllBooks(req, res) {
    try {
        const pool = await poolPromise;
        const result = await pool.query("SELECT * FROM Books");
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function updateBookAvailability(req, res) {
    const { bookId } = req.params;
    const { availability } = req.body;

    if (!["Y", "N"].includes(availability)) {
        return res.status(400).json({ message: "Invalid availability value" });
    }

    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("bookId", bookId)
            .input("availability", availability)
            .query(
                "UPDATE Books SET availability = @availability WHERE book_id = @bookId"
            );

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book availability updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { 
    getAllBooks,
    updateBookAvailability
 };
