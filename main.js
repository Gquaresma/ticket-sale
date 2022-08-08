require('dotenv').config()
const server = require("./route");

const port = process.env.PORT || 3001;
const host = process.env.HOST || "localhost";

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
