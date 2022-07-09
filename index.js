const express = require('express');
const app = express();
const cors = require('cors')
const router = express.Router();
const PORT = process.env.PORT || 3001;
const path = require('path');

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
app.use(express.static(path.join(__dirname, './client/build')));

db.sequelize.sync()
  .then(()=> 
    {
      app.listen(PORT, () => {
        console.log(`Listening on ${PORT}.`)
      })
    }
  )
  .catch( err => 
    { console.log(err) }
  )
