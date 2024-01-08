const logoutRoutes = (app, db) => {
    app.post('/logout', async function(req, res) {
        const { username } = req.body;

        db.run('UPDATE users SET token = NULL WHERE username = ?', [username], (err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send('Utilisateur déconnecté avec succès');
            }
        });
    });
}