const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
import constants from '../constants';
import {startServer }  from './index'

const { SERVER, PROXY_SERVER } = constants

startServer()

const app = express();

app.use('/api/data', express.static(path.join(__dirname, 'data','uploaded')));

app.use(
  '/api',
  createProxyMiddleware({
    target: `http://localhost:${SERVER}`,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
  }),
);


app.use(express.static(path.join(__dirname, '..','dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(PROXY_SERVER, () => console.log(`Proxy - Listen on ${PROXY_SERVER}`));