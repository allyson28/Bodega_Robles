const express=require('express');
const mysql=require('mysql2');
const cors=require('cors');

const app=express();

app.use(cors());

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'bodega_robles'
});

db.connect((err)=>{
    if(err){
        console.log('Error BD:',err);
        return;
    }
    console.log('Conectado a MySQL');
});

app.get('/usuarios',(req,res)=>{

    db.query(
        'SELECT * FROM usuarios',
        (err,result)=>{

            if(err){
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

});

app.listen(3000,()=>{

console.log('Servidor corriendo');

});