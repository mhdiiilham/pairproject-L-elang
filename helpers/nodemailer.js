const nodemailer = require('nodemailer');
function sendEmail(email, item, nominal){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: `slimyhebat@gmail.com`,
               pass: `NabilaR6`
           }
       });
    
       const mailOptions = {
        from: `slimyhebat@gmail.com`,
        to: `${email}`,
        subject: 'Selamat!',
        html: `
        <h1>Selamat!</h1>
        <h2>Anda dinyatakan memang dalam pelelangan ${item} dengan nominal: ${nominal}</h2>
        <h2>Tapi boong, karena kita tidak punya item tersebut. HAHAHA!</h2>
        <img src="https://photo-invivo.com/wp-content/uploads/2019/03/crying-laughing-meme-wonderfully-funny-laughing-and-crying-face-memes-mojly-of-crying-laughing-meme.jpg" width="400" height="400">
        `
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
}
module.exports = sendEmail;