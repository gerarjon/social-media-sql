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
app.use('/api', router)

// DB
const db = require('./models');

db.sequelize.sync().then(()=>{
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}.`)
  })
})
