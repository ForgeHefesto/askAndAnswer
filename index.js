const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const connection = require("./database/database")
const askModel = require("./database/Ask")
const answerModel = require("./database/Answer")


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
app.post("/answer",(req,res) =>{
    var describe = req.body.ansuer
    var ansuerId = req.body.ask
    answerModel.create({
        describe: describe,
        askId: ansuerId
    }).then(() =>{
        res.redirect(`/question/${ansuerId}`)
    })

})
app.get("/question/:id",(req,res) =>{
    var id = req.params.id
    askModel.findOne({
        where: {id: id}
    }).then(date =>{
        if(date != undefined){
            answerModel.findAll({
                where:{askId: date.id}
            }).then(response => {
                res.render('ask',{
                    ask:date,
                    response: response
                })           
            })
        }else{
            res.redirect('/')
        }
    })
})
app.listen(8080,() => {
    console.log("App rodando")
});
