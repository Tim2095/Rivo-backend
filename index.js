const app = require('./app')


app.get('/', (req, res) => {
  res.send('Hello World')
})


const PORT = 3000

app.listen(PORT, () => {
  console.log`the app is running at port ${PORT}`
})