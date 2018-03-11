const request = require('request');
const bigInt = require ('big-integer');
const crypto = require ('crypto');

var text = "Mensaje que vamos a cifrar";


//LO QUE HACE EL CLIENTE ES:
//1) GET DEL SERVER PARA OBTENER "e" Y "n"
//2) DADO UN MENSAJE DE PRUEBA, CIFRARLO CON LA PUBLIC KEY DEL SERVER Y ENVIARSELO


request({
        uri: 'http://localhost:4200/askPublicKeyParam',
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    },

    function(error, response, body) {

        if (error)
            console.log("error")
        else{

            //r es la respuesta del get al endpoint /askPublicKeyParam
            var r = JSON.parse(body)

            //creamos las variables que obtendrá el cliente del server: "e" y "n"
            var e = bigInt(r.e);
            var n = bigInt(r.n);


            //ciframos el mensaje de prueba con la public key del serves
            //**************************************************************************FALTA***********++




            var cipher = crypto.createCipher('aes192', key.toString(16));
            var encrypted = cipher.update(text, 'utf8', 'hex');
            encrypted += cipher.final('hex');




            //*******PREGUNTAR COMO SE HACIA LA PUBLIC KEY DADO e Y n*******************************


            //hacemos un mensaje que contendrá el mensaje de prueba declarado arriba cifrado
            var  message = {};
            message.message = encrypted;

            //hacemos el post contra el endpoint /cipheredMessage
            request({
                url: 'http://localhost:4200/cipheredMessage',
                method: 'POST',
                body: message,
                json: true
            }, function(error, response, body){
                if (error)
                    console.log("error")
                else
                    console.log(body);
            });


        }

    }