const bcrypt = require('bcrypt');

const registerRoutes = (app, db) => {
    app.post('/register', async function(req, res) {
        const { username, password } = req.body;

        db.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (row) {
                return res.status(409).send('Utilisateur déjà existant');
            }

            try {
                // Si l'utilisateur n'existe pas, hasher le mot de passe et l'insérer dans la base de données
                const hashedPassword = await bcrypt.hash(password, 10);
                db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.status(201).send({message: 'Utilisateur créé avec succès'});
                });
            } catch (hashError) {
                return res.status(500).send(hashError);
            }
        });
    });
};

module.exports = registerRoutes;
