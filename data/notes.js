const express = require("express");
const server = express();

server.get("/", (req, res) => {
  res.send("hello web");
});

server.get("/hubs", (req, res) => {
  Hubs.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(
      res.status(500).json(error => {
        {
          message: "error getting the list of hubs";
        }
      })
    );
});

// create hub
server.post("/hubs", (req, res) => {
  const hubInformation = req.body;

  Hubs.add(hubInformation)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      res.status(500).json({ message: "error adding the hub" });
    });
});

// delete hub
server.delete("/hubs/:id", (req, res) => {
  const hubId = req.params.id;

  Hubs.remove(hubId)
    .then(hub => {
      res.status(200).json({ message: "deleted" });
    })
    .catch(error => {
      res.status(500).json({ message: "something went wrong" });
    });
});

// update hub
server.put("/hubs/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Hubs.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "hub not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "error updating the hub" });
    });
});

const port = 8000;
server.listen(port, () => {
  console.log("api running");
});
