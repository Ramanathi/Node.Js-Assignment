const express = require('express');
const app = express();
const jwt     = require('jsonwebtoken');
const path = require('path');
const download = require('image-downloader');
const fs = require('fs');
const resizeImg = require('resize-img');
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./jwtoken');
app.use('/assets', express.static('assets'));
app.use('/thumbnails', express.static('thumbnails'));
app.set('view engine', 'ejs');


app.get('/', (req,res) => {
	res.render('home');
});

app.get('/home', (req,res) => {
	res.render('home');
});


app.get('/login',(req,res)=>{
	// Mock user
	const user = {
		id : 1,
		username : 'Ramanathi'
	};
	const token = jwt.sign(user, 'secretkey');
	localStorage.setItem("jwttoken", token);
	res.render('logined');
	//res.json({token}); can be used to display the token
});

app.get('/image', validity, (req,res)=>{

	let url = req.query.url;
	if(url !== undefined) {
	let ext = path.extname(url);
	if(ext === '.bmp' || ext === '.jpg' || ext ==='.png'){
		//downloading image
		const options = {
		 url: url,
		 dest: './images'
		};

		download.image(options)
		.then(({ filename, image }) => {
			
			//thumbnail generation
			resizeImg(fs.readFileSync(filename), {width:50, height:50}).then(buf => {
				fs.writeFileSync("./thumbnails/"+ path.basename(filename), buf);
			res.render('image', {path : './thumbnails/' + path.basename(filename)});
		}).catch((err) => {
			res.send("Error");
		});
 
	})
	}

	else{
		res.send('File extensions allowed- [bmp,png,jpg]');
	}
}
else {
	res.send("Please follow the instructions on home page");
}
});


app.get('*', function(req, res){
  res.send('404 error, Page not found and please follow the instructions on home page !!');
});

//validating JWT
function validity(req,res,next){
	let token = localStorage.getItem("jwttoken");
	if(token){
		jwt.verify(token, 'secretkey', function(err, decoded) {
			if (err) {
				res.render('unauthorized');

			}
			else{
				next();
			}
		});
	}
	else{
		res.render('unauthorized');
	}
	
};


app.listen(3000,() => {console.log("app running on port 3000");});