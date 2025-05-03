const express = require('express');
const bodyParser = require('body-parser');
const { getProductData, getStockData } = require('./services/dataservice');

const app = express();
const port = 5000;

app.use(bodyParser.json());

// Example routes
app.get('/api/product-analysis', async (req, res) => {
  try {
    const data = await getProductData(req.query);  // Pass query params for filtering
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product data' });
  }
});

app.get('/api/stock-availability', async (req, res) => {
  try {
    const data = await getStockData(req.query);  // Pass query params for filtering
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});
