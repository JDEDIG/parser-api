const express = require('express');
const Mercury = require('@postlight/mercury-parser');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/parser', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const result = await Mercury.parse(url);
    res.json(result);
  } catch (err) {
    console.error('Error parsing URL:', err);
    res.status(500).json({ error: 'Failed to parse URL' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mercury Parser API running on port ${PORT}`);
});
