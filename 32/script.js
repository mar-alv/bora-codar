const sqlCode = document.getElementById("sql-code");
var editor = CodeMirror.fromTextArea(sqlCode, {
  mode: "text/x-sql",
  lineNumbers: false,
  autofocus: false
});
