var restify = require('restify');

var server = restify.createServer();

var nodemailer = require('nodemailer');

var moment = require('moment');

var port = process.env.PORT || 3000;

server.use(restify.bodyParser({ mapParams: true }));

server.get('email', (req,res,next) =>  
{
    res.json([{sku: 'ab48cicj36734', asin: 'B015E8UTIU', upc: '888462500449',
        title: 'Apple iPhone 6s 64 GB US Warranty Unlocked Cellphone - Retail Packaging (Rose Gold)',
        image: 'http://ecx.images-amazon.com/images/I/91DpCeCgSBL._SL1500_.jpg' }]);
    next();
});

server.post('correo', (req, res, next) =>
{
	let data = req.body || {}
	var tiempo = new Date();
	var tiempoF = moment(tiempo, 'DD/MM/YYYY', true).format('MMMM Do YYYY, h:mm:ss a');
	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user: 'kabska1999@gmail.com',
	    pass: 'thebeatles99'
	  }
	});

	var mailOptions = {
	  from: 'kabska1999@gmail.com',
	  to: data.destinatario,
	  subject: data.asunto,
	  text: data.texto + ' ' + tiempoF
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});
	res.json(data)
	console.log(data);
	next();
});

server.listen(port, function() {  
    console.log('%s listening at %s', server.name, server.url);
});