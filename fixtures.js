var SQLite = require('react-native-sqlite-storage')

var main = function () {
  var db = SQLite.openDatabase({name: 'my.db', location: 'default'}, successcb, errorcb);
  populateDatabase(db);
}

var successcb = function () {
  console.log("successcb");
}

var errorcb = function () {
  console.log("errorcb");
}

var populateDatabase = function (db) {
  var dropStmts = [
    "DROP TABLE IF EXISTS Exercise",
    "DROP TABLE IF EXISTS Workout"
  ];
  var bigStr = dropStmts.join(';\n');

  database.executeSql(bigStr, [],
    function () {
      // db.transaction(queryEmployees,errorcb,function() {
      //   console.log("Processing completed");
      // });
    },
    function (error) {
      // TODO
    });
}
