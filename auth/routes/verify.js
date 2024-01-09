const verifyRoutes = (app, db) => {
    app.post('/verify', async function(req, res) {
        const { token } = req.body;

        const existingUser = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE token = ?', [token], (err, row) => {
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

        res.status(201).send({message: 'Utilisateur vérifié avec succès', user: {
            username: existingUser.username,
        }});
    });
}

module.exports = verifyRoutes;