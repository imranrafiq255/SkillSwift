const app = require("./app.js");
const databaseConnection = require("./config/database.config.js");
databaseConnection();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is connected on: ${PORT}`);
});
