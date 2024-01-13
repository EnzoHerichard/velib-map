const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const loginRoute = require("./authRoutes/login");
const registerRoute = require("./authRoutes/register");
const logoutRoute = require("./authRoutes/logout");
const verifyRoute = require("./authRoutes/verify");
const updateUsernameRoute = require("./authRoutes/updateUsername");
const createItineraryRoute = require("./pdfRoutes/create");
const getItineraryByIdRoute = require("./pdfRoutes/getItineraryById");
const getUserItinerariesRoute = require("./pdfRoutes/getUserItineraries");



const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', loginRoute)
app.use('/auth', registerRoute)
app.use('/auth', updateUsernameRoute)
app.use('/auth', logoutRoute)
app.use('/auth', verifyRoute)
app.use('/pdf', createItineraryRoute)
app.use('/pdf', getItineraryByIdRoute)
app.use('/pdf', getUserItinerariesRoute)

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
