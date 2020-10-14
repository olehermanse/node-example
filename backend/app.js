const express = require("express");
const app = express();

const Session = require("../libcommon/libcommon.js").Session;

const sessions = {};

app.use(express.static("frontend/dist"));

app.get("/:id/", (req, res) => {
  res.sendFile("./index.html", { root: "frontend/dist" });
});

app.use(express.json());

app.get("/api/sessions/:id", (req, res) => {
  const id = req.params.id;
  if (!(id in sessions)) {
    sessions[id] = new Session();
  }
  res.send(sessions[id]);
});

app.post("/api/sessions/:id", (req, res) => {
  const id = req.params.id;
  if (!(id in sessions)) {
    sessions[id] = Session.from(req.body);
  }
  res.send(sessions[id]);
});

module.exports = {
  app,
};
