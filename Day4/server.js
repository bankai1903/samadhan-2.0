
const express = require('express');
const app = express();


app.get('/api/hello', (req, res) => {
  res.json({ message: "Hello, World!" });
});


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
