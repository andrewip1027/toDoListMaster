const express = require('express')
const path = require('path')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const app = express()
app.use(express.static('public'))
app.use(express.json())

const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// Connection URL
const dbUrl = 'mongodb://localhost:27017';

// Database Name
const dbName = 'todolist';

// Collection Name
const collectionName = 'tasks';

app.post('/addTask', function (req, res) {
  console.log('addTask body:', req.body);
  if ('title' in req.body) {
    MongoClient.connect(dbUrl, function(err, client) {
      assert.equal(null, err);
      console.log('Connected successfully to server');
    
      const db = client.db(dbName);
      
      const collection = db.collection(collectionName);
    
      collection.insertOne({
        'title': req.body.title,
      }, (err, result) => {
        assert.equal(err, null);
        client.close();
      });
    });
  }
  res.sendStatus(200);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
