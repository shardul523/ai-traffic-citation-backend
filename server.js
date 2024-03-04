const { join } = require("path");
const { connect } = require("mongoose");
require("dotenv").config({ path: join(__dirname, ".env.local") });

const app = require("./app");

const PORT = process.env.PORT;
const MONGO_URI = process.env.DATABASE_URI.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

connect(MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Some error occured in connection", err));

const server = app.listen(PORT, () => {
  console.log("Server started at port", PORT);
});

process.on("beforeExit", () => server.close());
