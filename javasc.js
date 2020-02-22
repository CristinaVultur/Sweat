var express = require('express');
var javasc = express();
var fs = require('fs');

const session = require('express-session')
const formidable = require('formidable');
const crypto = require('crypto');
const util = require('util');
const nodemailer = require("nodemailer");

const http=require('http')
const socket = require('socket.io');
const server = new http.createServer(javasc);  
var  io= socket(server)
io = io.listen(server);

javasc.use(express.static(__dirname));
javasc.use(session({
  secret: 'abcdefg',
  resave: true,
  saveUninitialized: false
}));

var conexiune_index
io.on("connection", (socket) => {  
    console.log("Conectare!");
	conexiune_index=socket
    socket.on('disconnect', () => {conexiune_index=null;console.log('Deconectare')});
});
javasc.get('/', function(req, res) {
     res.render('html/index', {user: req.session.username})
});
javasc.get('/logout', function(req, res) {
	
    req.session.destroy();
	res.render('html/logout');
});

serverPass="tralala";
function getJson(numeFis){
	let textFis = fs.readFileSync(numeFis);
	return JSON.parse(textFis);
}

function saveJson(obJson, numeFis){
	let data = JSON.stringify(obJson);
	fs.writeFileSync(numeFis, data);
}


async function trimiteMail(username, email) {
	  let transporter = nodemailer.createTransport({
		service: 'gmail',

    secure: false,
    auth: {
      user: "crisuvultur5@gmail.com",
      pass: "ifucking3cake" 
    },
	    tls: {
        rejectUnauthorized: false
    }
  });

  let info = await transporter.sendMail({
    from: '"The sweat life" <crisuvultur5@gmail>',
    to: email,
    subject: "new user", 
    text: "HI, "+username, 
    html: "<p>HI, "+username+"</p>" 
  });

  console.log("Message sent: %s", info.messageId);
}

javasc.get('/contact', function(req, res) {
    res.render('html/contact', {user: req.session.username});
});
javasc.get('/register', function(req, res) {
    res.redirect('/contact');
});
javasc.post('/contact', (req, res) => {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {

		let rawdata = fs.readFileSync('useri.json');
		let jsfis = JSON.parse(rawdata);
		var cifru = crypto.createCipher('aes-128-cbc', 'mypassword');
		var encrParola= cifru.update(fields.parola, 'utf8', 'hex');
		encrParola+=cifru.final('hex');
		console.log(fields.parola+ " "+encrParola);
		jsfis.useri.push({id:jsfis.lastId, username:fields.username, nume:fields.nume, email: fields.email, parola: encrParola, dataInreg: new Date()});
		jsfis.lastId++;
		res.render('html/contact', {user: req.session.username, rsstatus:"ok"});

		saveJson(jsfis,'useri.json')
		trimiteMail(fields.username, fields.email).catch((err) => {console.log(err)})
    });
	
});
 
javasc.set('view engine', 'ejs');
javasc.get('/', function(req, res) {
     res.render('html/index', {user: req.session.username})
});

javasc.get('/index', function(req, res) {
     res.render('html/index', {user: req.session.username})
});
javasc.post('/', function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {

		
		jsfis=getJson('useri.json')
		console.log(jsfis.useri);
		var cifru = crypto.createCipher('aes-128-cbc', 'mypassword');//creez un obiect de tip cifru cu algoritmul aes
		var encrParola= cifru.update(fields.parola, 'utf8', 'hex');//cifrez parola
		encrParola+=cifru.final('hex');
		let user=jsfis.useri.find(function(x){
			
			return (x.username==fields.username&& x.parola == encrParola );
		});
		if(user){
			console.log(user);
			console.log(user.parola);
			console.log(encrParola);
			req.session.username=user;
		}
		console.log(__filename);
		console.log(req.session.username);
		res.render('html/index',{user: req.session.username});
	});


});
javasc.post('/index', function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {

		
		jsfis=getJson('useri.json')
		console.log(jsfis.useri);
		var cifru = crypto.createCipher('aes-128-cbc', 'mypassword');//creez un obiect de tip cifru cu algoritmul aes
		var encrParola= cifru.update(fields.parola, 'utf8', 'hex');//cifrez parola
		encrParola+=cifru.final('hex');
		let user=jsfis.useri.find(function(x){
			
			return (x.username==fields.username&& x.parola == encrParola );
		});
		if(user){
			console.log(user);
			console.log(user.parola);
			console.log(encrParola);
			req.session.username=user;
		}
		console.log(__filename);
		console.log(req.session.username);
		res.render('html/index',{user: req.session.username});
	});


});

javasc.get('/gain', function(req, res) {
     res.render('html/gain', {user: req.session.username})
});
javasc.get('/index', function(req, res) {
     res.render('html/index', {user: req.session.username})
});
javasc.get('/recepies', function(req, res) {
    res.render('html/recepies', {user: req.session.username})
});
javasc.get('/tips', function(req, res) {
     res.render('html/tips', {user: req.session.username})
});
javasc.get('/workouts', function(req, res) {
    
	let rawdata = fs.readFileSync('exercitii.json');
	let jsfis = JSON.parse(rawdata);
	console.log(jsfis.exercitiu);	
	res.render('html/workouts',{exercitiu:jsfis.exercitiu,user: req.session.username});
	
});
javasc.get('/', function(req, res) {
     res.render('html/index', {user: req.session.username})
});

javasc.use(function(req,res){
    res.status(404).render('html/404');
});

javasc.use('/css', express.static('css'));

/*javasc.get('/', function (req, res) {
    const file = fs.readFileSync('../css/proiect.css', 'utf8');
    const newFile = file.replace('"{process.env.BROWSER_REFRESH_URL}"', process.env.BROWSER_REFRESH_URL);
    res.send(newFile);
})
*/
javasc.use('/script', express.static('script'));
javasc.use('/img', express.static('img'));
javasc.use('/uploads', express.static('uploads'));
javasc.listen(8081);
console.log('Aplicatia se va deschide pe portul 8081.');