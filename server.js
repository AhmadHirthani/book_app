var express=require('express');
var app=express();

var cors=require('cors');

require('dotenv').config();
app.set('view engine','ejs');

app.use(cors());
app.use(express.urlencoded({extended:true}));
PORT=process.env.PORT||3100;



app.get('/hello', function(request,response){
response.status(200).render('./pages/index',{
wellcomeMessage:'helloWorld'
});
})
app.listen(PORT,function(){
console.log(`listening on port ${PORT}`);
})