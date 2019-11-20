const nodemailer = require('nodemailer');
function sendEmail(email, nominal, item){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: `lelang.noreply@gmail.com`,
               pass: `lelangElang1`
           }
       });
    
       const mailOptions = {
        from: `lelangElang1@gmail.com`,
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