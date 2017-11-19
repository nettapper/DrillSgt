var SQLite = require('react-native-sqlite-storage')

var main = function () {
  var testing = true;
  var db = SQLite.openDatabase({name: 'my.db', location: 'default'}, successcb, errorcb);
  populateDatabase(db, testing);  // adds the Exercises, bool to say if testing
  queryExercise(db);
  queryWorkout(db);
  queryCurrent(db);
}

var successcb = function () {
  console.log("successcb");
}

var errorcb = function () {
  console.log("errorcb");
}

var populateDatabase = function (db, testing) {
  // Drop the tables
  var dropStmts;
  if(testing) {
    console.log("Testing is true, dropping all tables");
    db.executeSql("DROP TABLE IF EXISTS Workout", [], successcb, errorcb);
    db.executeSql("DROP TABLE IF EXISTS Current", [], successcb, errorcb);
  }
  db.executeSql("DROP TABLE IF EXISTS Exercise", [], successcb, errorcb);

  // Create the tables
  db.executeSql("CREATE TABLE IF NOT EXISTS Exercise (name TEXT PRIMARY KEY NOT NULL, startCount INT NOT NULL)", [], successcb, errorcb);
  db.executeSql("CREATE TABLE IF NOT EXISTS Workout (id INT PRIMARY KEY NOT NULL, name TEXT NOT NULL, count INT NOT NULL, difficulty INT NOT NULL, time DATETIME NOT NULL, completed BOOL NOT NULL, FOREIGN KEY (name) REFERENCES Exercise (name))", [], successcb, errorcb);
  db.executeSql("CREATE TABLE IF NOT EXISTS Current (id INT PRIMARY KEY NOT NULL, name TEXT NOT NULL, count INT NOT NULL, FOREIGN KEY (name) REFERENCES Exercise (name))", [], successcb, errorcb);

  // Insert values
  db.executeSql('INSERT INTO Exercise (name, startCount) VALUES ("Pushups", 10);', []);
  db.executeSql('INSERT INTO Exercise (name, startCount) VALUES ("Situps", 20);', []);
  db.executeSql('INSERT INTO Exercise (name, startCount) VALUES ("Diamond Pushups", 15);', []);

  if(testing) addExampleData(db);
}

var addExampleData = function(db) {
  // Insert values
  db.executeSql('INSERT INTO Workout (id, name, count, difficulty, time, completed) VALUES (1, "Pushups", 10, 1, "2004-01-01 02:34:56", 1);', []);
  db.executeSql('INSERT INTO Workout (id, name, count, difficulty, time, completed) VALUES (2, "Pushups", 11, 1, "2004-01-02 02:34:56", 1);', []);
  db.executeSql('INSERT INTO Workout (id, name, count, difficulty, time, completed) VALUES (3, "Situps", 20, 3, "2004-01-02 05:34:56", 1);', []);
  db.executeSql('INSERT INTO Workout (id, name, count, difficulty, time, completed) VALUES (4, "Diamond Pushups", 15, 5, "2004-01-02 05:34:56", 0);', []);
  db.executeSql('INSERT INTO Workout (id, name, count, difficulty, time, completed) VALUES (5, "Pushups", 20, 4, "2004-03-02 05:34:56", 1);', []);

  db.executeSql('INSERT INTO Current (id, name, count) VALUES (10, "Pushups", 21);', []);
}

var queryExercise = function(db) {
  db.executeSql('SELECT * FROM Exercise', [],
    function (data) {
      console.log("select Exercise succeded");
      if(data && data["rows"] && data["rows"]["length"]) {
        for(var i=0; i < data["rows"]["length"]; i++) {
          console.log(data["rows"]["item"](i));
        }
      }
    },
    function (error) {
      console.log("select failed", error);
    });
};

var queryWorkout = function(db) {
  db.executeSql('SELECT * FROM Workout', [],
    function (data) {
      console.log("select Workout succeded");
      if(data && data["rows"] && data["rows"]["length"]) {
        for(var i=0; i < data["rows"]["length"]; i++) {
          console.log(data["rows"]["item"](i));
        }
      }
    },
    function (error) {
      console.log("select failed", error);
    });
};

var queryCurrent = function(db) {
  db.executeSql('SELECT * FROM Current', [],
    function (data) {
      console.log("select Current succeded");
      if(data && data["rows"] && data["rows"]["length"]) {
        for(var i=0; i < data["rows"]["length"]; i++) {
          console.log(data["rows"]["item"](i));
        }
      }
    },
    function (error) {
      console.log("select failed", error);
    });
};

var completedAndFailedWorkout = function() {  // TODO export
  var db = SQLite.openDatabase({name: 'my.db', location: 'default'}, successcb, errorcb);
  completedAndFailedExercisesWithDB(db);
}

var completedAndFailedWorkoutWithDB = function(db) {
  var ret = {};  // the return obj

  db.executeSql('SELECT count(*) FROM Workout where completed = 1', [],
    function (data) {
      console.log("select Current succeded");
      if(data && data["rows"] && data["rows"]["length"]) {
        max = undefined;
        for(var i=0; i < data["rows"]["length"]; i++) {
          if(max === undefined)
            max = data["rows"]["item"](i)["count(*)"];
          else
            max = max > data["rows"]["item"](i) ? max : data["rows"]["item"](i)["count(*)"];
        }
        ret["Completed"] = max;
      }
    },
    function (error) {
      console.log("select failed", error);
    });

  db.executeSql('SELECT count(*) FROM Workout where completed = 0', [],
    function (data) {
      console.log("select Current succeded");
      if(data && data["rows"] && data["rows"]["length"]) {
        max = undefined;
        for(var i=0; i < data["rows"]["length"]; i++) {
          if(max === undefined)
            max = data["rows"]["item"](i)["count(*)"];
          else
            max = max > data["rows"]["item"](i) ? max : data["rows"]["item"](i)["count(*)"];
        }
        ret["Failed"] = max;
      }
    },
    function (error) {
      console.log("select failed", error);
    });

  console.log(ret);
  return ret;
}

main();

module.exports = {
  completedAndFailedWorkout
}
