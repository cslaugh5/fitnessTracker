var app = new Vue({
  el: '#app',
  data: {
    items: [],
    text: '',
    minutes:'',
    show: 'all',
    drag: {},
    selected: '',
    goal: '',
    total: '',
    exercises: [],
  },
  created: function() {
    this.getItems();
    },
  computed: {
  },
  methods: {
     getItems: function() {
      axios.get("/api/items").then(response => {
        this.items = response.data;
        this.addTotal();
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
        this.addTotal();
        //this.addExercises();
        return true;
      }).catch(err => {
      });
    },
    getGoal: function() {
      axios.get("/api/items/goal").then(response => {
        this.goal = response.data.toString();
        return true;
      }).catch(err => {
      });
    },
    addGoal: function() {
      axios.post("/api/items/goal", {
        goal: this.goal,
      }).then(response => {
        this.getGoal();
        return true;
      }).catch(err => {
      });
    },
    getTotal: function() {
      axios.get("/api/items/total").then(response => {
        this.total = response.data.toString();
        return true;
      }).catch(err => {
      });
    },
    addTotal: function() {
      axios.post("/api/items/total", {
        total: '',
      }).then(response => {
        this.getTotal();
        return true;
      }).catch(err => {
      });
    },
    /*
    getExercises: function() {
      axios.get("/api/items/exercises").then(response => {
        this.exercises = response.data;
        return true;
      }).catch(err => {
      });
    },
    addExercises: function() {
      this.exercises = [];
      axios.post("/api/items/exercises", {
        running: this.running,
        biking: this.biking,
        abs: this.abs,
        weights: this.weights,
        exercises: this.exercises,
      }).then(response => {
        this.running = false;
        this.biking = false;
        this.abs = false;
        this.weights = false;
        this.getExercises();
        return true;
      }).catch(err => {
      });
    },
    */
    deleteItem: function(item) {
      this.addTotal();
      axios.delete("/api/items/" + item.id).then(response => {
        this.getItems();
        this.addTotal();
        //this.addExercises();
        return true;
      }).catch(err => {
      });
    },
    dragItem: function(item) {
      this.drag = item;
    },
    dropItem: function(item) {
      this.addTotal();
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
    upMinutes: function(item) {
      item.minutes -= 5;
      item.minutes += 10;
      this.addTotal();
      axios.put("/api/items/" + item.id, {
        text: item.text,
        minutes: item.minutes,
        selected: item.selected,
        orderChange: false,
      }).then(response => {
        this.addTotal();
        return true;
      }).catch(err => {
      });
    },
    downMinutes: function(item) {
      this.addTotal();
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
        this.addTotal();
        return true;
      }).catch(err => {
      });
    },
  },
});


