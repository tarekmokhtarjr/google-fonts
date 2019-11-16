import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import axios from 'axios';
import * as dbtools from './initDB';

dbtools.initDB();
const app = express();
let session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: true
}));

const router = express.Router()
const staticFiles = express.static(path.join(__dirname, '../../client/build'))
app.use(staticFiles);

router.post('/login', (req, res) => {
  if(req.query.username && req.query.password){
    dbtools.Users.find({'username': req.query.username, 'password': req.query.password}).exec( function (err, users) {
      if (err) {
        session.login = 'Error';
        res.send("Error");
      }else{
        if(users.length == 1){
          session.login = 'success';
          session.user = 'admin';
          res.send("Success");
        }else{
          session.login = 'fail';
          res.send("Authentication failed");
        }
      }
    });
  }
});

router.post('/fonts', (req, res) => {
  try {
    axios.get(process.env.API_URI,
      {
        json: true
      })
      .then(response => {
        res.json({
          login: session.login, 
          user: session.username, 
          fonts: response.data
        });
      })
      .catch();
  } catch (error) {
    console.log(error);
  } 
});

app.use(router);

// any routes not picked up by the server api will be handled by the react router
app.use('/*', staticFiles);

app.set('port', (process.env.PORT || 3002));
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`);
});
