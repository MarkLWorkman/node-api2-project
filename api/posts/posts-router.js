const express = require("express");
const posts = require("./posts-model");

const router = express.Router();

router.get("/", (req, res) => {
  posts
    .find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({
        message: "The posts information could not be retrieved",
      });
    });
});

router.get("/:id", (req, res) => {
  posts
    .findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "The post information could not be retrieved",
      });
    });
});

router.post("/", (req, res) => {
  const { title, contents } = req.body;

  if (title && contents) {
    posts
      .insert(req.body)
      .then(({ id }) => {
        posts.findById(id).then((post) => {
          res.status(201).json(post);
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "There was an error while saving the post to the database",
        });
      });
  } else {
    res.status(400).json({
      message: "Please provide title and contents for the post",
    });
  }
});

router.put("/:id", (req, res) => {
  const { title, contents } = req.body;

  if (title && contents) {
    posts
      .update(req.params.id, req.body)
      .then((count) => {
        if (count > 0) {
          posts.findById(req.params.id).then((post) => {
            res.status(200).json(post);
          });
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist",
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: "The post information could not be modified",
        });
      });
  } else {
    res.status(400).json({
      message: "Please provide title and contents for the post",
    });
  }
});

router.delete;

router.get;

module.exports = router;
