const updateUserName = (app, db) => {
    app.post('/updateUserName/:id', async function(req, res) {
        const newUsername = req.body.newUsername;
        const id = req.params.id;

        db.run('UPDATE users SET username= ? WHERE id = ?', [newUsername, id], (err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send({message: 'Utilisateur modifié avec succès'});
            }
        });
    });
}

module.exports = updateUserName;