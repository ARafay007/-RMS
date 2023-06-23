import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Yo! baby this end point is working');
});

app.listen(4321, () => {
  console.log('App is runnning http://localhost:4321/');
})