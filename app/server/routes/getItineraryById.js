const getItineraryByIdRoute = (app, db) => {
    app.get('/itinerary/:id', async function(req, res) {
        const id = req.params.id;
        db.get('SELECT * FROM itinerary WHERE id = ?', [id], (err, row) => {
            return res.json(row);
        });
    });
}

module.exports = getItineraryByIdRoute;