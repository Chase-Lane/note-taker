const express = require('express');
const fs = require('fs');
const PORT = 3000;
const path = require('path');
const app = express();
const dbinfo = require('./db/db.json');
const { readFromFile, readAndAppend } = require('./fsUtils');
const { v4: uuidv4 } = require('uuid');


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });
  
  // POST Route for a new UX/UI tip
  app.post('/notes', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
  });

app.listen(PORT)