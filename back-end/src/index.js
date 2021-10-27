import express from "express";
import bodyParser from "body-parser";
import urlShortener from "node-url-shortener";
import cors from "cors";
import { sequelize } from "../models/db.js";
import UserRoutes from './routes/UserRoutes.js';
import CompanyRoutes from './routes/CompanyRoutes.js';
import ProjectRoutes from './routes/ProjectRoutes.js';
import UserHistoryRoutes from './routes/UserHistoryRoutes.js';
import TicketRoutes from './routes/TicketRoutes.js';

const app = express();
var port = process.env.PORT || 3000;
if (!process.env.DATABASE_URL) {
  port = 3000;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.end("¡Welcome!");
});

app.post("/url", function (req, res) {
  const url = req.body.url;
  urlShortener.short(url, function (err, shortUrl) {
    res.send(shortUrl);
  });
});

app.use('/api/user', UserRoutes);
app.use('/api/company', CompanyRoutes);
app.use('/api/project', ProjectRoutes);
app.use('/api/userHistory', UserHistoryRoutes);
app.use('/api/ticket', TicketRoutes);


sequelize
  .sync({ force: false, logging: console.log })
  .then(() => {
    console.log("¡We connect to the database!");

    app.listen(port, function () {
      console.log("¡Server up in port " + port + "!");
    });
  })
  .catch((error) => {
    console.log(error);
  });
