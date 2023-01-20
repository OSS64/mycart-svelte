import fastify from "fastify";
import usersRoutes from "./routes/users";
import productRoutes from "./routes/products";
import env from "dotenv";
import db from "./config/index";
import cors from "@fastify/cors";

env.config();
const PORT = process.env.PORT;
const URI = process.env.MONGODB_URI;

const app = fastify({ logger: true });
app.register(cors, {
  // put your options here
  origin: "*",
  preflight: true,
});
// Activate plugins below:
app.register(db, { URI });
app.register(usersRoutes);
app.register(productRoutes);

/* app.addHook("onSend", async function (request, reply) {
  reply.headers({
    "Access-Control-Allow-Origin": "*",
  });
}); */

// create server
const startServer = async () => {
  try {
    await app.listen(PORT);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

startServer();
