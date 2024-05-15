import app from "./app.js";
import { config } from "dotenv";
config({ path: "./.env" });
import { connectDB } from "./db/index.js";

connectDB()
  .then(() => {
    app.listen(4000, () =>
      console.log(`App is Listening on port ${process.env.PORT}`)
    );
  })
  .catch((error) => {
    console.log(`MongoDB Connection Failed ${error}`);
  });
