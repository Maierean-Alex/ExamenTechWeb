const app = require("./app");
const db = require("./db");

app.listen(process.env.PORT || 8080, () => {
  db.sync();
  console.log("server started");
});
