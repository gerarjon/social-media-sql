const express = require('express');
const app = express();
const cors = require('cors')
const router = express.Router();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Routes
const routes = require('./routes');
app.use(routes);

// DB
const db = require('./models');

// Default behavior: send every unmatched route request to the React app (in production)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Serve up static assets 
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

db.sequelize.sync().then(()=>{
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}.`)
  })
})
