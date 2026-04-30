import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/common/config/db.js";

const port = process.env.port || 5000;
const uri = process.env.mongodb_uri;

const start = async () => {
  await connectDB(uri);
  app.listen(port, () => {
    console.log(`Server is running at ${port} smoothly.`);
  });
};

start().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
