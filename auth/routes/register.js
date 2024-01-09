const bcrypt = require('bcrypt');

const registerRoutes = (app, db) => {
    app.post('/register', async function(req, res) {
        const { username, password } = req.body;

        const existingUser = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
        
        if (existingUser !== undefined ) {
            res.status(401).send('Utilisateur déjà existant');
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send('Utilisateur créé avec succès');
            }
        });
    });
};

module.exports = registerRoutes;
