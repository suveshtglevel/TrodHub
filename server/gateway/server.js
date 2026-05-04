import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Health check
app.get('/', (req, res) => {
  res.send('API Gateway is running');
});

// Proxy helper
const proxy = (serviceName, port) => {
  return createProxyMiddleware({
    target: `http://localhost:${port}`,
    changeOrigin: true,

    pathRewrite: {
      [`^/api/v1/${serviceName}`]: '',
    },

    onProxyReq: (proxyReq, req) => {
      console.log(
        `[Gateway] ${req.method} ${req.originalUrl} → ${serviceName}-service`
      );
    },

    onError: (err, req, res) => {
      console.error(`[Gateway Error] ${serviceName} service is down`);
      res.status(500).json({
        success: false,
        message: `${serviceName} service unavailable`,
      });
    },
  });
};

// MANUAL ROUTES (just add one line per service)
app.use('/api/v1/auth', proxy('auth', 5001));
// app.use('/api/v1/users', proxy('users', 5002));
// app.use('/api/v1/products', proxy('products', 5003));
// app.use('/api/v1/orders', proxy('orders', 5004));


// Start server
app.listen(port, () => {
  console.log(`Gateway running on port ${port}`);
});