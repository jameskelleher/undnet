let express = require('express');
let path = require('path');

let app = express();

let public = path.join(__dirname, '..', 'public');
app.use(express.static(public));
app.use(express.json());

let blogs = [
  'https://james-kelleher.notion.site/Setting-Up-a-Server-414aa83422dd809b9562e5ae7f17e756',
  'https://james-kelleher.notion.site/Week-1-Server-and-Firewall-Setup-3dbaa83422dd804ea359db70a2a22017',
  'https://james-kelleher.notion.site/Week-2-Traceroute-3dfaa83422dd8086a822de6c2007132c',
  'https://james-kelleher.notion.site/Week-3-tcpdump-and-Packet-Analysis-3e9aa83422dd80d6a5fad7d65aefab5c',
  'https://james-kelleher.notion.site/Week-4-Readings-3eeaa83422dd80ccb2b5f2cfd2f04ed3',
];

app.get('/hitme', (req, res) => {
  let ix = Math.floor(Math.random() * blogs.length);
  res.redirect(blogs[ix]);
});

app.post('/greet', (req, res) => {
  console.log('post request');
  const { first, last } = req.body;
  res.send(`nice to meet you ${first} ${last}\n`);
});

app.get('/get', (req, res) => {
  console.log('get request');
  res.send('api get!\n');
});

app.get('/api/311/recent', async (req, res) => {
  try {
    const url = 'https://data.cityofnewyork.us/resource/erm2-nwe9.json' +
      '?$order=created_date DESC&$limit=20';
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Upstream failed' });
    }
    res.json(await response.json());
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch 311 data' });
  }
});

let server = app.listen(3000, () => {
  let port = server.address().port;
  console.log(`server listening on port ${port}`);
});
