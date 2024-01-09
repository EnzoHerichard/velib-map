require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginRoutes = (app, db) => {
    app.post('/login', async function(req, res) {
        const { username, password } = req.body;

        db.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {
            if (err) {
                res.status(500).send(err);
            } else if (row === undefined) {
                res.status(401).send('Utilisateur inconnu');
            } else {
                const valid = await bcrypt.compare(password, row.password);
                if (valid) {
                    const token = jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
                    db.run('UPDATE users SET token = ? WHERE username = ?', [token, username], (err) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.status(200).send({ token, username });
                        }
                    });
                } else {
                    res.status(401).send('Mot de passe incorrect');
                }
            }
        });
    });
}
module.exports = loginRoutes;
