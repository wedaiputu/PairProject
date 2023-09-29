// Happy coding guys
// Oke

const express = require('express')
const app = express()
const port = 3000
const router = require('./routes/index')

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }));

app.use('/', router)



app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})



// npx sequelize-cli model:generate --name Admin --attributes name:string,emial:string,password:string,role:string
// npx sequelize-cli model:generate --name Stores --attributes name:string,code:date,location:string,category:string

// npx sequelize-cli migration:generate --name salary:integer