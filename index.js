import "dotenv/config";
import { createApp } from "./src/app.js";
import { connectDB } from "./src/utils/db.js";

async function start() {
  try {
    const port = process.env.port;
    const uri = process.env.mongo_uri;
    await connectDB(uri).then(() =>
      console.log("MongoDB connected successfully."),
    );
    const app = createApp();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

start();
