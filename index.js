const express = require('express');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

const db = require('./models');

db.sequelize.sync().then(()=>{
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}.`)
  })
})
