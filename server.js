// Declara variável do express.
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const fs = require('fs');
const pdf = require('html-pdf');

app.get('/generate-pdf', function(req, res){
	const html = fs.readFileSync('index.html').toString()
	
    const options = {
        type: 'pdf',
        format: 'A4',
        orientation: 'portrait'
    }

    pdf.create(html, options).toBuffer((err, buffer) => {
        if(err) return res.status(500).json(err)
        
        res.end(buffer)
    })
})

app.get('/', function(req, res){
	res.send("TESTANDO");
});

app.listen(process.env.port || 8080, (req, res) => {
	console.log("Positivo e operante!");
});
