const express = require('express');
const Datastore = require('nedb');


const app = express();
//aggiungo deployment
const port = process.env.PORT;
/*
app.listen(3000, () => 
  console.log('Starting server: http://localhost:3000')
);
*/
//aggiungo port al posto di 3000

app.listen(port, () => {
  console.log('Starting server at ${port}');
});

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});
