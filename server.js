const express=require('express')
const path=require('path')
const items=require('./items')

//console.log(items.items)

const app=express()

const imgUrl='https://kulhavikruno.000webhostapp.com/diois_img/'
const items1=[
    {name:'iPhone11', description:'descr',price: 4800, category:'mobile', brand:'Apple',
    url:imgUrl+'iPhone11.jpg'},
    {name:'iPhone12', description:'descr',price: 6200, category:'mobile', brand:'Apple',
    url:imgUrl+'iPhone12.jpg'},
    {name:'iPhone13', description:'descr',price: 7800, category:'mobile', brand:'Apple',
    url:imgUrl+'iPhone13.jpg'},
    {name:'A70', description:'descr',price: 400, category:'mobile', brand:'Samsung',
    url:imgUrl+'a70.jpg'},
    {name:'A71', description:'descr',price: 500, category:'mobile', brand:'Samsung',
    url: imgUrl+'a71.jpg'},
    {name:'S21', description:'descr',price: 700, category:'mobile', brand:'Samsung',
    url:imgUrl+'s21.jpg'}
    ]



app.use(express.static('public'))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }))

app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/items',(req,res)=>{
    //res.render('items', {items})
    res.render('items', {items1})
})

app.get('/register',(req,res)=>{
    
    res.render('register',{errorMessage:''})
})

app.post('/regsucc',(req,res)=>{
    //console.log(req.body.username)

    if(req.body.username==='')
        //res.render('error',{errorMessage:'empty fields'})
        res.render('register',{errorMessage:'empty fields'})
    else
        res.render('registrsucc',{username:req.body.username,password:req.body.password})
})


app.get('/api',(req,res)=>{
    //res.send('hi')
    //res.send({name:'John', surname:'Wayne'})
    res.send(items)
})

let itemFilt=[{name:'def',price:99}]
app.post('/apifilter',(req,res)=>{
    console.log(req.body.name) 
    itemFilt=items1.filter(item=>item.name===req.body.name)
    console.log(itemFilt)
   
    res.redirect('/sel')
})

app.get('/sel',(req,res)=>{
    
    res.render('selecteditem', {itemFilt})

})

app.listen(process.env.PORT||3000)