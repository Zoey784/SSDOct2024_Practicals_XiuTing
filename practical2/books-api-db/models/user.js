const sql = require("mssql");
const dbConfig = require("../dbConfig");

class User {
    constructor(id, username, email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }

    static async createUser(user) {
        let pool;
        try {
            pool = await mssql.connect(config);
            const result = await pool.request()
                .input('username', mssql.NVarChar, user.username)
                .input('email', mssql.NVarChar, user.email)
                .query(`INSERT INTO Users (username, email) 
                        OUTPUT INSERTED.id, INSERTED.username, INSERTED.email 
                        VALUES (@username, @email)`);

            return result.recordset[0];
        } catch (err) {
            console.error('Error creating user:', err);
            throw err;
        } finally {
            pool?.close();
        }
    }

    static async getAllUsers() {
        let pool;
        try {
            pool = await mssql.connect(config);
            const result = await pool.request()
                .query('SELECT id, username, email FROM Users');

            return result.recordset;
        } catch (err) {
            console.error('Error fetching users:', err);
            throw err;
        } finally {
            pool?.close();
        }
    }

    static async getUserById(id) {
        let pool;
        try {
            pool = await mssql.connect(config);
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .query('SELECT id, username, email FROM Users WHERE id = @id');

            return result.recordset[0] || null;
        } catch (err) {
            console.error('Error fetching user by ID:', err);
            throw err;
        } finally {
            pool?.close();
        }
    }

    static async updateUser(id, updatedUser) {
        let pool;
        try {
            pool = await mssql.connect(config);
            const result = await pool.request()
                .input('id', mssql.Int, id)
                .input('username', mssql.NVarChar, updatedUser.username)
                .input('email', mssql.NVarChar, updatedUser.email)
                .query(`UPDATE Users 
                        SET username = @username, email = @email 
                        WHERE id = @id`);

            return { message: 'User updated successfully' };
        } catch (err) {
            console.error('Error updating user:', err);
            throw err;
        } finally {
            pool?.close();
        }
    }

    static async deleteUser(id) {
        let pool;
        try {
            pool = await mssql.connect(config);
            await pool.request()
                .input('id', mssql.Int, id)
                .query('DELETE FROM Users WHERE id = @id');

            return { message: 'User deleted successfully' };
        } catch (err) {
            console.error('Error deleting user:', err);
            throw err;
        } finally {
            pool?.close();
        }
    }

    static async searchUsers(searchTerm) {
        const connection = await sql.connect(dbConfig);
    
        try {
          const query = `
            SELECT *
            FROM Users
            WHERE username LIKE '%${searchTerm}%'
              OR email LIKE '%${searchTerm}%'
          `;
    
          const result = await connection.request().query(query);
          return result.recordset;
        } catch (error) {
          throw new Error("Error searching users"); // Or handle error differently
        } finally {
          await connection.close(); // Close connection even on errors
        }
      }

      static async getUsersWithBooks() {
        const connection = await sql.connect(dbConfig);
    
        try {
          const query = `
            SELECT u.id AS user_id, u.username, u.email, b.id AS book_id, b.title, b.author
            FROM Users u
            LEFT JOIN UserBooks ub ON ub.user_id = u.id
            LEFT JOIN Books b ON ub.book_id = b.id
            ORDER BY u.username;
          `;
    
          const result = await connection.request().query(query);
    
          // Group users and their books
          const usersWithBooks = {};
          for (const row of result.recordset) {
            const userId = row.user_id;
            if (!usersWithBooks[userId]) {
              usersWithBooks[userId] = {
                id: userId,
                username: row.username,
                email: row.email,
                books: [],
              };
            }
            usersWithBooks[userId].books.push({
              id: row.book_id,
              title: row.title,
              author: row.author,
            });
          }
    
          return Object.values(usersWithBooks);
        } catch (error) {
          throw new Error("Error fetching users with books");
        } finally {
          await connection.close();
        }
      }
}

module.exports = User;
