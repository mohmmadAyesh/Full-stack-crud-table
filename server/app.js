const express=require('express');
const router=require('./routes/route.js');
const cors=require('cors');
const handleErrors=require('./middlewares/handleErrors.js');
const app=express();
// use cors middleware so the browser wont reject http:// cause of security concerns
app.use(cors())
app.use(express.urlencoded({ extended:false}));
app.use(express.json());
app.use('/api',router);
// use handleError middleware
app.use(handleErrors);
async function startServer(){
    try{
         app.listen(5000,()=>{
            console.log(handleErrors);
            console.log('App is listening on port 5000');
            });
     }catch(e){
         console.log(e);
     }
}
startServer();
