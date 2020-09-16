const express  = require('express');
const Crawler = require('./Crawler')
const app = express();

let port = 3000
app.listen(port, (err) => {
    if(err) {
        console.log('==> [-]  falha na aplicação');
    } else {
        console.log(`==> [+] aplicação funcionando na porta ${port}`);
    }
});