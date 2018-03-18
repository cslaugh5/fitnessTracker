const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

let items = [];
let id = 0;
let goal = '';
let total = '';
//let exercises = [];

app.get('/api/items', (req, res) => {
  res.send(items);
});

app.get('/api/items/goal', (req, res) => {
  goal = goal.toString()
  res.send(goal);
});

app.get('/api/items/total', (req, res) => {
  total = total.toString();
  res.send(total);
});
/*
app.get('/api/items/exercises', (req, res) => {
  res.send(exercises);
});
*/
app.post('/api/items', (req, res) => {
  id = id + 1;
  let item = {id:id, text:req.body.text, minutes:req.body.minutes, selected:req.body.selected};
  items.push(item);
  res.send(item);
});

app.post('/api/items/goal', (req, res) => {
  goal = req.body.goal;
  goal = goal.toString();
  res.send(goal);
});

app.post('/api/items/total', (req, res) => {
  total = 0;
  items.forEach(item => {
    var minutes = item.minutes;
    minutes = Number(minutes)
    total += minutes;
  })
  total = total.toString();
  res.send(total);
});
/*
app.post('/api/items/exercises', (req, res) => {
  exercises = [];
  let running = false;
  let biking = false;
  let abs = false;
  let weights = false;
  items.forEach(item => {
    if (item.selected == "Running") {
      if (!running) {
        running = true;
        exercises.push("Running")
      }
    }
    else if (item.selected == "Biking") {
      if (!biking) {
        biking = true;
        exercises.push("Biking")
      }
    }
    else if (item.selected == "Abs") {
      if (!abs) {
        abs = true;
        exercises.push("Abs")
      }
    }
    else if (item.selected == "Weights") {
      if (!weights) {
        weights = true;
        exercises.push("Weights")
      }
    }
  res.send(exercises);
  });
});
*/
app.put('/api/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let itemsMap = items.map(item => { return item.id; });
  let index = itemsMap.indexOf(id);
  let item = items[index];
  item.text = req.body.text;
  item.minutes = req.body.minutes;
  item.selected = req.body.selected;
  // handle drag and drop re-ordering
  if (req.body.orderChange) {
    let indexTarget = itemsMap.indexOf(req.body.orderTarget);
    items.splice(index,1);
    items.splice(indexTarget,0,item);
  }
  res.send(item);
});

app.delete('/api/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = items.map(item => { return item.id; }).indexOf(id);
  if (removeIndex === -1) {
    res.status(404).send("Sorry, that item doesn't exist");
    return;
  }
  items.splice(removeIndex, 1);
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
