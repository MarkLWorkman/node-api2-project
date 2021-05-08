const express = require("express");
const postsRouter = require("./posts/posts-router");

const server = express();

server.use(express.json());
server.use(postsRouter);

module.exports = server;
