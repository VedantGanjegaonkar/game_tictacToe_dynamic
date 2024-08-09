import 'reflect-metadata';
import * as express from 'express';
import mongoose from 'mongoose';
import  * as cors from 'cors';
import * as path from 'path';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './inversify.config';

const port = process.env.PORT || 3000;

// Set up default mongoose connection
mongoose.connect('mongodb+srv://vedantsg112233:MzUFmOl5GA6oCL77@cluster0.rfaqwkb.mongodb.net/shaligram?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('connected to DB');
  });

// Create a new instance of InversifyExpressServer
const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  // Middlewares
  app.use(cors());
  app.use("/public/uploads", express.static(path.join(__dirname, '/public/uploads')));
  app.use(express.json());
});

// Start the server
const app = server.build();
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
