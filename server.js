const express=require('express');
const templatesjs = require('templatesjs');
const server=express();
const fs = require('fs');
const bodyParser=require('body-parser');
const fileUpload =require('express-fileupload');
const nodemailer = require('nodemailer');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true
}));

server.use(fileUpload());
templatesjs.dir = "./templates/";

server.get('/',function(req,res){
  fs.readFile("index.html", function(err,data){ // provided the file above is ./ index.html
    if(err)
    throw err;
    templatesjs.set(data,function(err,dat){
      if(err)
      throw err;
      res.write(dat);
      res.end();
    });
  });
});
server.get('/flexerp',function(req,res){
  fs.readFile("flexerp.html", function(err,data){ // provided the file above is ./ flexerp.html
    if(err)
    throw err;
    templatesjs.set(data,function(err,dat){
      if(err)
      throw err;
      res.write(dat);
      res.end();
    });
  });
});
server.get('/flexAnalytics',function(req,res){
  fs.readFile("flexanalytics.html", function(err,data){ // provided the file above is ./ analytics.html
    if(err)
    throw err;
    templatesjs.set(data,function(err,dat){
      if(err)
      throw err;
      res.write(dat);
      res.end();
    });
  });
});

server.get('/partnerOverview',function(req,res){
  fs.readFile("partneroverview.html", function(err,data){ // provided the file above is ./ partneroverview.html
    if(err)
    throw err;
    templatesjs.set(data,function(err,dat){
      if(err)
      throw err;
      res.write(dat);
      res.end();
    });
  });
});

server.get('/partnerConnect',function(req,res){
  fs.readFile("partnerconnect.html", function(err,data){ // provided the file above is ./ partnerconnect.html
    if(err)
    throw err;
    templatesjs.set(data,function(err,dat){
      if(err)
      throw err;
      res.write(dat);
      res.end();
    });
  });
});
server.get('/careers',function(req,res){
  fs.readFile("careers.html", function(err,data){ // provided the file above is ./ carrers.html
    if(err)
    throw err;
    templatesjs.set(data,function(err,dat){
      if(err)
      throw err;
      res.write(dat);
      res.end();
    });
  });
});
server.get('/contact',function(req,res){
  fs.readFile("contact.html", function(err,data){ // provided the file above is ./ contact.html
    if(err)
    throw err;
    templatesjs.set(data,function(err,dat){
      if(err)
      throw err;
      res.write(dat);
      res.end();
    });
  });
});
//Forms data
server.post('/contact',function(req,res){
  if(req){
    var emailType="contact";
    var data={
      "name":req.body.name,
       "phone":req.body.phone,
        "email":req.body.email,
        "message":req.body.message
    }
    var mailErr=sendMail(emailType,data);
    //console.log(x);
    if(mailErr==0)
    {
      fs.readFile("emailsuccess.html", function(err,data){
        if(err)
        throw err;
        templatesjs.set(data,function(err,dat){
          if(err)
          throw err;
          res.write(dat);
          res.end();
        });
      });
    }
    else {
      fs.readFile("emailfail.html", function(err,data){
        if(err)
        throw err;
        templatesjs.set(data,function(err,dat){
          if(err)
          throw err;
          res.write(dat);
          res.end();
        });
      });
    }
  }
});
server.post('/partnerConnect',function(req,res){
  if(req){
    var emailType="partnerConnect";
    var data={
      "fname":req.body.first_name,
      "lname":req.body.last_name,
      "primary_role":req.body.primary_role,
      "job_title":req.body.job_title,
      "company":req.body.company,
      "discover":req.body.discover,
        "plat_interest":req.body.plat_interest,
        "comments":req.body.comments,
        "email":req.body.email
    }
    var mailErr=sendMail(emailType,data);
    //console.log(x);
    if(mailErr==0)
    {
      fs.readFile("emailsuccess.html", function(err,data){
        if(err)
        throw err;
        templatesjs.set(data,function(err,dat){
          if(err)
          throw err;
          res.write(dat);
          res.end();
        });
      });
    }
    else {
      fs.readFile("emailfail.html", function(err,data){
        if(err)
        throw err;
        templatesjs.set(data,function(err,dat){
          if(err)
          throw err;
          res.write(dat);
          res.end();
        });
      });
    }
  }
});
server.post('/careers',function(req,res){
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }
  else
{
    var emailType="careers";
    var data={
      "fname":req.body.first_name,
      "lname":req.body.last_name,
      "phone":req.body.phone,
      "email":req.body.email,
      "address":req.body.address,
      "city":req.body.city,
        "country":req.body.country,
        "salary":req.body.salary,
        "hourlyRate":req.body.hourlyRate,
        "eligibility":req.body.eligibility,
        "relocate":req.body.relocate,
        "availabilityDate":req.body.availabilityDate,
        "resume":req.files.resume.name,
        "comments":req.body.comments
    }
    var fileErr=resumeUpload(req.files.resume)
    var mailErr=sendMail(emailType,data);
    console.log(mailErr);
    console.log(fileErr);
    if(mailErr==0 && fileErr==0 )
    {
      fs.readFile("emailsuccess.html", function(err,data){
        if(err)
        throw err;
        templatesjs.set(data,function(err,dat){
          if(err)
          throw err;
          res.write(dat);
          res.end();
        });
      });
    }
    else {
      fs.readFile("emailfail.html", function(err,data){
        if(err)
        throw err;
        templatesjs.set(data,function(err,dat){
          if(err)
          throw err;
          res.write(dat);
          res.end();
        });
      });
    }
  }
});
function sendMail(emailType,data)
{
  var errorFlag=0;
  var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'brownboi741@gmail.com',
    pass: 'boibrown741'
  }
});


switch (emailType) {
  case 'contact':
    var mailOptions = {
      from: 'brownboi741@gmail.com',
      to: 'terrorjoseph@gmail.com',
      subject: 'Edufex contact',
      html: '<p>Hi<br/> My name is '+data['name']+' I would like to tell you '+data['message']+'<br/> For more information you can call me at '+data['phone']+' or email me at '+data['email']+'</p>'
    };
    break;
    case 'partnerConnect':
      var mailOptions = {
        from: 'brownboi741@gmail.com',
        to: 'terrorjoseph@gmail.com',
        subject: 'Edufex Partner Connect',
        html: '<p>Hi<br/> My name is '+data['fname']+' '+data['lname']+'<br/> I work at '+data['company']+' as a '+data['job_title']+' whose Primary role is '+data['primary_role']+'<br/> I found your platfrom through '+data['discover']+' I think we can partner with '+data['plat_interest']+' and '+data['comments']+'<br/> For more information you can email me at '+data['email']+'</p>'
      };

      break;
      case 'careers':
        var mailOptions = {
          from: 'brownboi741@gmail.com',
          to: 'terrorjoseph@gmail.com',
          subject: 'Edufex Apply Career',
          html: '<p>Hi<br/> My name is '+data['fname']+' '+data['lname']+'<br/> I stay at '+data['address']+' in '+data['city']+' , '+data['country']+' <br/>you can find my resume at http://localhost:3001/uploads/'+data['resume']+'<br/> I would like salary of'+data['salary']+' or an hour rate of '+data['hourlyRate']+'<br/> my eligibility is '+data['eligibility']+'<br/>willing to relocate: '+data['relocate']+'<br/>I am available to join from '+data['availabilityDate']+' <br/>For more information you can email me at '+data['email']+' or call me at '+data['phone']+'<br/>Comments : '+data['comments']+'</p>'
        };

        break;1
  default:

}
console.log(mailOptions);
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
    errorFlag=1;
  } else {
    console.log('Email sent: ' + info.response);
  }
});
return errorFlag;
}
function resumeUpload(fileData)
{
  var errorFlag=0;
  var file=fileData;
      var filename=file.name;

      if (!fs.existsSync("./upload/")){
        fs.mkdirSync("./upload/");

        file.mv("./upload/"+filename,function(err){
        if(err){
          console.log("err");
          //alert("error occured");
          errorFlag= 1;
        }
        else{
          console.log("uploaded");
        //alert("File uploaded sucessfully");



        }
      });
    }
    return errorFlag;
  }

server.use(express.static(__dirname+'/assets'));
server.listen(3001);
console.log("server ready at 3001");
