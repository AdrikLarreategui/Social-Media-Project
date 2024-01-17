const express = require('express')
const app = express()
const PORT = 3000
const { dbConnection } = require('./src/config/config')

dbConnection()
app.use(express, json())
app.use('users', require('./src/routes/users'))
// app.use('posts', require('./'))
// app.use('comments', require('./'))

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))