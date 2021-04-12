const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const connection = require("./database/database")
const askModel = require("./database/Ask")

//Database

connection.authenticate().then(() => {
    console.log("conexao feita com  banco de dados")
})
.catch((msgError) =>{
    console.log(msgError)
})


app.set('view engine','ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())


app.get("/", (req,res) =>{
    askModel.findAll({raw:true,order:[['id','DESC']]}).then((date) =>{
        res.render("index",{
            ask: date
        });
    })
})

app.get('/question',(req,res) =>{
    res.render("question")
})

app.post("/salvapergunta",(req,res) => {
    var title = req.body.title;
    var description = req.body.description;
    askModel.create({
        title: title,
        describe: description
    }).then(() => {
        res.redirect('/')
    })

})

app.listen(8080,() => {
    console.log("App rodando")
});
