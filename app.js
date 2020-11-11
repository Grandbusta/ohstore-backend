const express=require('express');
const bodyparser=require('body-parser');
const app=express();
const port=process.env.PORT||9000

//Routes
const productRoute=require('./api/routes/product')
const userRoute=require('./api/routes/user')

//middlewares
const headers = require('./api/middlewares/headers');
const errors = require('./api/middlewares/errors');

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


app.use('/products',productRoute)
app.use('/users',userRoute)

app.use(headers.headers);
app.use(errors.defineError);
app.use(errors.defaultError);


app.listen(port,()=>{console.log('server connected')});