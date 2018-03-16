var app = new Vue({
  el: '#app',
  data: {
    items: [],
    text: '',
    minutes: '',
    show: 'all',
    drag: {},
    selected: '',
    goal: '',
    total: '',
    biking: false,
    running: false,
    abs: false,
    weights: false,
    exercises: [],
  },
  created: function() {
    this.getItems();
    },
  computed: {
    yourExercises: function() {
      console.log(this.item.selected);
      if (this.item.selected === "Biking") {
        biking = true;
      }
      else if (this.item.selected === "Running") {
        running = true;
      }
      else if (this.item.selected === "Abs") {
        abs = true;
      }
      else if (item.selected === "Weights") {
        weights = true;
      }
     //return exercises;
    },
  },
  methods: {
     getItems: function() {
      axios.get("/api/items").then(response => {
        this.items = response.data;
        return true;
      }).catch(err => {
      });
    },
    addItem: function() {
      axios.post("/api/items", {
        text: this.text,
        minutes: this.minutes,
        selected: this.selected,
      }).then(response => {
        this.text = "";
        this.selected = '';
        this.getItems();
        return true;
      }).catch(err => {
      });
    },

    getGoal: function() {
      axios.get("/api/goal").then(response => {
        this.goal = response.data;
        return true;
      }).catch(err => {
      });
    },
    addGoal: function() {
      axios.post("/api/goal", {
        goal: this.goal,
      }).then(response => {
        this.goal = "";
        this.getGoal();
        return true;
      }).catch(err => {
      });
    },
    deleteItem: function(item) {
      axios.delete("/api/items/" + item.id).then(response => {
        this.getItems();
        return true;
      }).catch(err => {
      });
    },
    dragItem: function(item) {
      this.drag = item;
    },
    dropItem: function(item) {
      axios.put("/api/items/" + this.drag.id, {
        text: this.drag.text,
        minutes: this.drag.minutes,
        selected: this.drag.selected,
        orderChange: true,
        orderTarget: item.id
      }).then(response => {
        this.getItems();
        return true;
      }).catch(err => {
      });
    },
    totalCalcualtion: function() {
      axios.get("/api/items/total").then(response => {
        this.total = response.data;
        return true;
      }).catch(err => {
      });
    },
    upMinutes: function(item) {
      item.minutes -= 5;
      item.minutes += 10;
      axios.put("/api/items/" + item.id, {
        text: item.text,
        minutes: item.minutes,
        selected: item.selected,
        orderChange: false,
      }).then(response => {
        return true;
      }).catch(err => {
      });
    },
    downMinutes: function(item) {
      if (item.minutes === 5) {
        item.minutes = 5;
      }
      else {
        item.minutes -= 5;
      }
      axios.put("/api/items/" + item.id, {
        text: item.text,
        minutes: item.minutes,
        selected: item.selected,
        orderChange: false,
      }).then(response => {
        return true;
      }).catch(err => {
      });
    },
  },
});
