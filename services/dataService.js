// Correct import of BigQuery from @google-cloud/bigquery
const { BigQuery } = require('@google-cloud/bigquery');

// Initialize BigQuery client once
const bigQuery = new BigQuery();

// Query function for product data
const getProductData = async (filters) => {
  // Connect to BigQuery and fetch the product analysis data
  const query = `SELECT * FROM \`hackathon-458706.hackathon_dataset.product_sales_stock_spends_combined\` WHERE platform IN (${filters.platforms.map(p => `'${p}'`).join(', ')})`;

  const options = {
    query,
    useLegacySql: false,
  };

  const [rows] = await bigQuery.query(options);
  return rows;
};

// Query function for stock data
const getStockData = async (filters) => {
  // Connect to BigQuery and fetch stock availability data
  const query = `SELECT * FROM \`hackathon-458706.hackathon_dataset.city-product_sales_stock_price_combined\` WHERE platform = '${filters.platform}'`;

  const options = {
    query,
    useLegacySql: false,
  };

  const [rows] = await bigQuery.query(options);
  return rows;
};

module.exports = { getProductData, getStockData };
