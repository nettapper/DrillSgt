var SQLite = require('react-native-sqlite-storage')

var main = function () {
  var db = SQLite.openDatabase({name: 'my.db', location: 'default'}, successcb, errorcb);
  populateDatabase(db);
  queryExercise(db);
}

var successcb = function () {
  console.log("successcb");
}

var errorcb = function () {
  console.log("errorcb");
}

var populateDatabase = function (db) {
  // Drop the tables
  var dropStmts = [
    "DROP TABLE IF EXISTS Exercise",
    "DROP TABLE IF EXISTS Workout",
    "DROP TABLE IF EXISTS Current"
  ];
  var bigStr = dropStmts.join(';\n');
  db.executeSql(bigStr, [], successcb, errorcb);

  // Create the tables
  var createStmt = [
      "CREATE TABLE IF NOT EXISTS Exercise (name TEXT PRIMARY KEY NOT NULL, startCount INT NOT NULL)",
      "CREATE TABLE IF NOT EXISTS Workout (id INT PRIMARY KEY NOT NULL, name TEXT NOT NULL, count INT NOT NULL, difficulty INT NOT NULL, time DATETIME NOT NULL, FOREIGN KEY (name) REFERENCES Exercise (name))",
      "CREATE TABLE IF NOT EXISTS Current (id INT PRIMARY KEY NOT NULL, name TEXT NOT NULL, count INT NOT NULL, FOREIGN KEY (name) REFERENCES Exercise (name))"
    ];
  var bigStr = createStmt.join(';\n');
  db.executeSql(bigStr, [], successcb, errorcb);

  // Insert values
  db.executeSql('INSERT INTO Exercise (name, startCount) VALUES ("Pushups", 10);', []);
  db.executeSql('INSERT INTO Exercise (name, startCount) VALUES ("Situps", 20);', []);
  db.executeSql('INSERT INTO Exercise (name, startCount) VALUES ("Diamond Pushups", 15);', []);
}

var queryExercise = function(db) {
  db.executeSql('SELECT * FROM Exercise', [2],
    function () {
      console.log("select succeded", errorcb);
    },
    function (error) {
      console.log("select failed", error);
    });
};

main();
