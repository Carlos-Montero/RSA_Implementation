const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bigInt = require ('big-integer');
const crypto = require ('crypto');
//import java.math.*;

var app = express();

//generamos "p" y "q"

var p = bigInt(4);
var bits = bigInt(1024);
while(!p.isPrime())
    p = bigInt.randBetween(bigInt(2).pow(bits.minus(1)),bigInt(2).pow(bits).minus(1));

var q = bigInt(4);
var bits2 = bigInt(1024);
while(!q.isPrime())
    q = bigInt.randBetween(bigInt(2).pow(bits2.minus(1)),bigInt(2).pow(bits2).minus(1));


//calculamos "n"
n = new BigInteger("0");
n = p.multiply(q);

//calculamos phi de n
phin = new BigInteger("0");
phin = (p.minus(1)).multiply((q.minus(1)))

//elegir numero coprimo de phi de n; EN ESTE CASO, PRIMO DE FERMAT
e = new BigInteger("65537");

//calculamos d donde e*d = 1 mod phi de n
d = new BigInteger("0");
var exp = -1;
d = e.modPow(exp, n);





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




//******ENDPOINTS*******

//Endpoint askPublicKeyParam, LE PASA AL CLIENTE e Y n, para que cifre con la public key del server
app.get('/askPublicKeyParam', function (req,res){
    var response= {};
    response.e=e;
    response.n=n;
    res.status(200).send(response)
});

//Endpoint cipheredMessage, recibe un mensaje cifrado con su public key y con la private lo descifra y lo muestra por consola
app.post('/cipheredMessage', function(req, res){

    var mEncrypted = req.body.message;
    var mDecrypted;

    //********************FALTA************************************************


    //desencriptamos el mensaje recibido del cliente
    var decipher = crypto.createDecipher('aes192', key.toString(16));
    mDecrypted = decipher.update(mEncrypted, 'hex', 'utf8');
    mDecrypted += decipher.final('utf8');

    console.log("El mensaje del cliente desencriptado es: ", mDecrypted);


    //*************************************************************************

    res.status(200).send("ok")
});


app.listen(4200);
console.log("Server listeneing on port 4200");

