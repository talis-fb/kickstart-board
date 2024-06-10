// import * as express from 'express';
// import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';
// import {startServer } from './index'

// startServer()

// const app = express();

// app.use(
//   '/api',
//   createProxyMiddleware({
//     rewe
//   }),
// );


// app.listen(3000);

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
// const {startServer } = require('./index')
import {startServer }  from './index'

startServer()

const app = express();

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:3001',
    // changeOrigin: true,
  }),
);

app.listen(3000, () => console.log("Listen on 3000"));