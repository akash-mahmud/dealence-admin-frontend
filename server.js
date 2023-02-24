"use-strict";
import dotenv from "dotenv";

import express from "express";
import http from "http";

import helmet from "helmet";
import path from "path";
import logger from "morgan";

import cors from "cors";
import compression from "compression";
import { fileURLToPath } from "url";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "http://localhost:4000",
      "http://localhost:4001",
      "https://www.localfreshfoods.co.uk",
      "https://admin.localfreshfoods.co.uk",
      "https://api.localfreshfoods.co.uk",
    ],
  })
);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      //  "default-src" used as fallback for any undeclared directives
      "default-src": ["'self'"],
      // I have stripe_set up
      "script-src": ["'self'", "'unsafe-inline'", "js.stripe.com"],
      connectSrc: [
        "'self'",
        "https://api.cloudinary.com",
        "http://localhost:8000",
        "https://admin.localfreshfoods.co.uk",
        "http://api.localfreshfoods.co.uk",
        "https://kit-pro.fontawesome.com",
      ],
      "style-src": [
        "'self'",
        "'unsafe-inline'",
        "fonts.googleapis.com",
        "https://cdn.jsdelivr.net",
      ],
      "frame-src": ["'self'", "js.stripe.com"],
      "font-src": [
        "'self'",
        "fonts.googleapis.com",
        "fonts.gstatic.com",
        "res.cloudinary.com/",
      ],
      "img-src": ["'self'", "data:", "https://res.cloudinary.com"],
    },
    reportOnly: false,
  })
);
app.use(compression());
app.use(express.static(path.join(__dirname, "build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
const port = normalizePort(process.env.PORT || "3001");
app.set("port", port);
const server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}
