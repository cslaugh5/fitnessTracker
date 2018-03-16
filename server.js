const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

let items = [];
let id = 0;
let goal = 0;
let total = 0;
let exercise = [];

app.get('/api/items', (req, res) => {
  res.send(items);
});

app.get('/api/items/total', (req, res) => {
  total = 0;
  items.forEach(item => {
    total += item.minutes;
  });
  res.send(total);
});

app.get('/api/goal', (req, res) => {
  res.send(goal);
});

app.post('/api/items', (req, res) => {
  id = id + 1;
  let item = {id:id, text:req.body.text, minutes:req.body.minutes, selected:req.body.selected};
  items.push(item);
  res.send(item);
});

app.post('/api/goal', (req, res) => {
  goal={goal:req.body.goal};
  res.send(goal);
});

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
