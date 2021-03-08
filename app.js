// const express = require('express');
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const fs = require("fs");

const app = require("express")();
Sentry.init({
  dsn:
    "https://9abc5a1d45f14379b4c0c71f2956a6ba@o525665.ingest.sentry.io/5666737",
  release: "sentry-express",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// All controllers should live here
app.get("/", function rootHandler(req, res) {
  fs.readFile("jasfkdhjsdaf");
  res.send("dsafldsaf");
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  //@ts-ignore
  res.end(res.sentry + "\n");
});

app.listen(3000, () => {
  console.log("server start");
});
