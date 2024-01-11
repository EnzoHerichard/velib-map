const getUserItinerariesRoute = (app, db) =>{
    app.get('/itineraries/:id', async function(req, res) {
        const id = req.params.id;
        db.all('SELECT * FROM itinerary WHERE user_id = ?', [id], (err, rows) => {
            return res.json(rows);
        });
    });
}

module.exports = getUserItinerariesRoute;