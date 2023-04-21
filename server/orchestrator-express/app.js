const express = require('express')
const axios = require('axios')
const app = express()
const port = 4000
// const userAPI = 'http://localhost:4001/users'
// const Redis = require('ioredis')
// const redis = new Redis();
const router = require('./routers/index')
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

