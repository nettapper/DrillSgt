var SQLite = require('react-native-sqlite-storage')

var main = function () {
  var testing = true;
  var db = SQLite.openDatabase({name: 'my.db', location: 'default'}, successcb, errorcb);
  populateDatabase(db, testing);  // adds the Exercises, bool to say if testing
  // getWorkout().then((d) => {
  //   console.log("ddd", d);
  //   return insertWorkout(10, "Pushups", 100, 5, 1);
  // }).then(() => {
  //   return getWorkout();
  // }).then((d) => {
  //   console.log("ddd prime", d);
  // }).catch((err) => {console.log("ddd err", err)});
  insertCurrent("Situps", 222).then(() => {
    console.log("gc", getCurrent());
  });
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
  db.executeSql("CREATE TABLE IF NOT EXISTS Current (id INT PRIMARY KEY NOT NULL, name TEXT NOT NULL, count INT NOT NULL, time DATETIME NOT NULL, FOREIGN KEY (name) REFERENCES Exercise (name))", [], successcb, errorcb);

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

  db.executeSql('INSERT INTO Current (id, name, count, time) VALUES (0, "Pushups", 21, "2004-03-02 05:34:56");', []);
}

export function countExerciseFailure() {
  return new Promise(function(resolve, reject) {
    var db = SQLite.openDatabase({name: 'my.db', location: 'default'}, successcb, errorcb);
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
          resolve(max);
        }
      },
      function (error) {
        reject("Exercise count failures failed.");
      });
  });
}

export function countExerciseComplete() {
  return new Promise(function(resolve, reject) {
    var db = SQLite.openDatabase({name: 'my.db', location: 'default'}, successcb, errorcb);
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
          resolve(max);
        }
      },
      function (error) {
        reject("Exercise count complete failed.");
      });
  });
}

export function randomExercise() {
  return new Promise(function(resolve, reject) {
    var db = SQLite.openDatabase({name: 'my.db', location: 'default'}, successcb, errorcb);
    db.executeSql('SELECT * FROM Exercise', [],
      function (data) {
        e = undefined;
        if(data && data["rows"] && data["rows"]["length"]) {
          r = Math.floor(Math.random() * (data["rows"]["length"]))  // 0 to length-1 inclusive
          e = data["rows"]["item"](r);
        }
        resolve(e);
      },
      function (error) {
        reject("Exercise random selection failed.");
      });
  });
}

export function getCurrent() {
  return new Promise(function(resolve, reject) {
    var db = SQLite.openDatabase({name: 'my.db', location: 'default'}, successcb, errorcb);
    db.executeSql('SELECT * FROM Current', [],
      function (data) {
        cs = [];
        if(data && data["rows"] && data["rows"]["length"]) {
          for(var i=0; i < data["rows"]["length"]; i++) {
            cs.push(data["rows"]["item"](i));
          }
        }
        resolve(cs);
      },
      function (error) {
        reject("getCurrent failed");
      });
  });
}

export function removeCurrentById(id) {
  return new Promise(function(resolve, reject) {
    var db = SQLite.openDatabase({name: 'my.db', location: 'default'}, successcb, errorcb);
    db.executeSql('DELETE FROM Current where id = ?', [id],
      function (data) {
        resolve();
      },
      function (error) {
        reject("removeCurrentById failed");
      });
  });
}

export function getWorkout() {
  return new Promise(function(resolve, reject) {
    var db = SQLite.openDatabase({name: 'my.db', location: 'default'}, successcb, errorcb);
    db.executeSql('SELECT * FROM Workout', [],
      function (data) {
        ws = [];
        if(data && data["rows"] && data["rows"]["length"]) {
          for(var i=0; i < data["rows"]["length"]; i++) {
            ws.push(data["rows"]["item"](i));
          }
        }
        resolve(ws);
      },
      function (error) {
        reject("getWorkout failed");
      });
  });
}

var getMaxCurrentId = function() {
  return new Promise(function(resolve, reject) {
    var db = SQLite.openDatabase({name: 'my.db', location: 'default'}, successcb, errorcb);
    db.executeSql('SELECT Max(id) FROM Current', [],
      function (data) {
        var max = undefined;
        for(var i=0; i < data["rows"]["length"]; i++) {
          if(max === undefined)
            max = data["rows"]["item"](i)["Max(id)"];
          else
            max = max > data["rows"]["item"](i) ? max : data["rows"]["item"](i)["Max(id)"];
        }
        resolve(max);
      },
      function (error) {
        reject("getMaxCurrentId failed");
      });
  });
}

var insertCurrent = function(name, count) {
  return new Promise(function(resolve, reject) {
    getMaxCurrentId().then((maxID) => {
      var currentId = maxID + 1;
      var db = SQLite.openDatabase({name: 'my.db', location: 'default'}, successcb, errorcb);
      var n = 1; // num of minutes to advance the time // TODO rand time
      db.executeSql('INSERT INTO Current (id, name, count, time) VALUES (?, ?, ?, datetime(\'now\', \'localtime\', \'+' + n + ' minutes\'))',
        [currentId, name, count],
        function () {
          resolve(currentId);
        },
        function (error) {
          console.log('insertCurrent failed', error);
          reject("insertCurrent failed");
        });
    }).catch((err) => {
      console.log("couldn't getMaxCurrentId in insertCurrent", err);
      reject("couldn't getMaxCurrentId in insertCurrent");
    });
  });
}

export function randomExerciseAndInsertCurrent() {
  return new Promise(function(resolve, reject) {
    randomExercise().then((ex) => {
      return insertCurrent(ex.name, ex.startCount);  // TODO not startCount
    }).then((currentId) => {
      resolve(currentId);
    }) .catch((err) => {
      console.log("something went wrong in randomExerciseAndInsertCurrent", err);
      reject(err);
    });
  });
}

var getMaxWorkoutId = function() {
  return new Promise(function(resolve, reject) {
    var db = SQLite.openDatabase({name: 'my.db', location: 'default'}, successcb, errorcb);
    db.executeSql('SELECT Max(id) FROM Workout', [],
      function (data) {
        var max = undefined;
        for(var i=0; i < data["rows"]["length"]; i++) {
          if(max === undefined)
            max = data["rows"]["item"](i)["Max(id)"];
          else
            max = max > data["rows"]["item"](i) ? max : data["rows"]["item"](i)["Max(id)"];
        }
        resolve(max);
      },
      function (error) {
        reject("getMaxWorkoutId failed");
      });
  });
}

export function insertWorkout(name, count, difficulty, completed) {
  return new Promise(function(resolve, reject) {
    getMaxWorkoutId().then((maxID) => {
      var workoutId = maxID + 1;
      var db = SQLite.openDatabase({name: 'my.db', location: 'default'}, successcb, errorcb);
      db.executeSql('INSERT INTO Workout (id, name, count, time, difficulty, completed) VALUES (?, ?, ?, datetime(\'now\', \'localtime\'), ?, ?)',
        [workoutId, name, count, difficulty, completed],
        function () {
          resolve(workoutId);
        },
        function (error) {
          console.log('insertWorkout failed', error);
          reject("insertWorkout failed");
        });
    }).catch((err) => {
      console.log("couldn't getMaxWorkoutId in insertWorkout", err);
      reject("couldn't getMaxWorkoutId in insertWorkout");
    });
  });
}


main();
