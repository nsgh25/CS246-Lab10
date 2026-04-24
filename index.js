/**
Name: Noah Serwin
Date: 23 April 2026
Description: This API lets the user select from a list of current generation processors and graphics cards
made by AMD, NVIDIA or Intel based on the desired price range.
Bugs: none known
Reflection (including LLM use): After cloning the Lab 10 repo, I went on Newegg.com to find the lowest prices
that certain PC components were listed at. I made it so the query string takes four parameters: brand name, part type,
minimum price, and maximum price. I now feel a bit more comfortable with seeing how express works in a simple program
like this.
*/

import express from "express";

const app = express();
const port = process.env.PORT || 3000; // Use Codespaces port

app.get("/", (req, res) => {
  res.send(`
    <h1>Computer Parts API</h1>
    <body style="font-size: large;">
    This API lets you see the prices of various current generation computer parts
    sold on Newegg.com (current lowest prices as of making this). You can search by brand
    (AMD, Intel, or NVIDIA) and type (CPU or GPU). Parts that are listed will be between
    your specified min_price and max_price (in USD). Brand name and part type are not case sensitive. 
    <h2>Examples:</h2>
    <h3>http://localhost:3000/partslist?type=cpu&brand=intel&min_price=100&max_price=500</h3>
    <h3>http://localhost:3000/partslist?type=GPU&brand=nVidia&min_price=500&max_price=1200</h3>
    </body>
    `);
});

/**
 * Takes a reqest and sorts through the computerParts array to find parts that meet the query parameters.
 * If parts are found, it returns a JSON string with the models and prices.
 */
app.get("/partslist", (req, res) => {
  let type = req.query.type;
  let brand = req.query.brand;
  let min_price = parseFloat(req.query.min_price);
  let max_price = parseFloat(req.query.max_price);
  let selectedParts = [];

  if (type.toUpperCase() === 'CPU' && brand.toUpperCase() === 'NVIDIA') {
    res.send('NVIDIA does not currently make x86 architecture CPUs. Please specify AMD or Intel or change type to GPU.');
  }
  else {
    for (let part of computerParts) {
      if (part.type === type.toUpperCase() && part.brand.toUpperCase() === brand.toUpperCase() &&
        part.price >= min_price && part.price <= max_price) {
        selectedParts.push({ model: `${part.brand} ${part.model}`, price: part.price });
      }
    }
    if (selectedParts.length === 0) {
      res.send('No parts matched the query. Check spelling or try changing min or max price.');
    }
    else {
      res.json(selectedParts);
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//list of parts I found on Newegg
const computerParts = [
  { type: 'CPU', brand: 'Intel', model: 'Core Ultra 5 225F', price: 162.27 },
  { type: 'CPU', brand: 'Intel', model: 'Core Ultra 5 225', price: 179.98 },
  { type: 'CPU', brand: 'Intel', model: 'Core Ultra 5 245KF', price: 195.00 },
  { type: 'CPU', brand: 'Intel', model: 'Core Ultra 5 250KF Plus', price: 209.99 },
  { type: 'CPU', brand: 'Intel', model: 'Core Ultra 5 250K Plus', price: 219.99 },
  { type: 'CPU', brand: 'Intel', model: 'Core Ultra 7 265KF', price: 279.99 },
  { type: 'CPU', brand: 'Intel', model: 'Core Ultra 7 265K', price: 319.99 },
  { type: 'CPU', brand: 'Intel', model: 'Core Ultra 7 265F', price: 359.99 },
  { type: 'CPU', brand: 'Intel', model: 'Core Ultra 7 265', price: 379.99 },
  { type: 'CPU', brand: 'Intel', model: 'Core Ultra 9 285K', price: 557.00 },
  { type: 'CPU', brand: 'AMD', model: 'Ryzen 5 9600X', price: 199.99 },
  { type: 'CPU', brand: 'AMD', model: 'Ryzen 7 9700X', price: 339.00 },
  { type: 'CPU', brand: 'AMD', model: 'Ryzen 9 9900X', price: 394.00 },
  { type: 'CPU', brand: 'AMD', model: 'Ryzen 7 9800X3D', price: 464.00 },
  { type: 'CPU', brand: 'AMD', model: 'Ryzen 7 9850X3D', price: 489.00 },
  { type: 'CPU', brand: 'AMD', model: 'Ryzen 9 9950X', price: 519.99 },
  { type: 'CPU', brand: 'AMD', model: 'Ryzen 9 9950X3D', price: 657.00 },
  { type: 'CPU', brand: 'AMD', model: 'Ryzen 9 9950X3D2', price: 899.00 },
  { type: 'GPU', brand: 'NVIDIA', model: 'Geforce RTX 5050', price: 289.99 },
  { type: 'GPU', brand: 'NVIDIA', model: 'Geforce RTX 5060', price: 329.99 },
  { type: 'GPU', brand: 'NVIDIA', model: 'Geforce RTX 5060 Ti 8GB', price: 379.99 },
  { type: 'GPU', brand: 'NVIDIA', model: 'Geforce RTX 5060 Ti 16GB', price: 514.99 },
  { type: 'GPU', brand: 'NVIDIA', model: 'Geforce RTX 5070', price: 635.99 },
  { type: 'GPU', brand: 'NVIDIA', model: 'Geforce RTX 5070 Ti', price: 999.99 },
  { type: 'GPU', brand: 'NVIDIA', model: 'Geforce RTX 5080', price: 1299.99 },
  { type: 'GPU', brand: 'NVIDIA', model: 'Geforce RTX 5090', price: 3599.99 },
  { type: 'GPU', brand: 'AMD', model: 'Radeon RX 9060 XT 8GB', price: 359.99 },
  { type: 'GPU', brand: 'AMD', model: 'Radeon RX 9060 XT 16GB', price: 439.99 },
  { type: 'GPU', brand: 'AMD', model: 'Radeon RX 9070', price: 629.99 },
  { type: 'GPU', brand: 'AMD', model: 'Radeon RX 9070 XT', price: 709.99 },
  { type: 'GPU', brand: 'Intel', model: 'Arc A380', price: 139.99 },
  { type: 'GPU', brand: 'Intel', model: 'Arc B570', price: 259.99 },
  { type: 'GPU', brand: 'Intel', model: 'Arc B580', price: 289.99 }
]