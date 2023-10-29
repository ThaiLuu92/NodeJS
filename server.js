import { createServer } from "http";
import url from "url";
import fs from "fs";
import querystring from "querystring";
import "dotenv/config";
import { handleRequest } from "./utils/util.js";
import { error } from "console";
import { handleLoginRequest } from "./utils/loginUtil.js";

const server = createServer((req, res) => {
  const { pathname, query } = url.parse(req.url);

  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET") {
    if (pathname === "/api/courses") {
      handleRequest(req, res, query, "src/models/courses.json");
    } else if (pathname === "/api/users") {
      handleRequest(req, res, query, "src/models/users.json");
    } else if (pathname === "/api/category") {
      handleRequest(req, res, query, "src/models/category.json");
    } else if (pathname === "/api/lessons") {
      handleRequest(req, res, query, "src/models/lessons.json");
    } else if (pathname === "/api/oders") {
      handleRequest(req, res, query, "src/models/oders.json");
    } else {
      res.write("Không tìm thấy đường dẫn");
    }
  }

  if (req.method === "POST") {
    if (pathname === "/api/login") {
      handleLoginRequest(req, res);
    }
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
