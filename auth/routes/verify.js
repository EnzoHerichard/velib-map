const verifyRoutes = (app, db) => {
    app.post('/verify', async function(req, res) {
        const { username, token } = req.body;

        const existingUser = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
        
        if (existingUser === undefined) {
            res.status(401).send('Utilisateur inexistant');
            return;
        }

        if (existingUser.token !== token) {
            res.status(401).send('Token invalide');
            return;
        }

        res.send('Utilisateur vérifié avec succès');
    });
}