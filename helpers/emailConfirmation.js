const nodemailer = require('nodemailer');
function sendEmail(email, salt){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: `lelang.noreply@gmail.com`,
               pass: `lelangElang1`
           }
       });
       
       
       const mailOptions = {
        from: `lelang.noreply@gmail.com`,
        to: `${email}`,
        subject: 'Please Confirm Your Email!',
        html: `
        <h1>Selamat Datang & Selamat Bergabung di L'Elang</h1>
        <h2>Akun anda telah terdaftar sebagai user kami, tapi belum aktif :(</h2>
        <h2>Biar aktif yuk konfirmasi emailnya, Masukan nomer dibawah di halaman konfirmasi :)</h2>
        <h1>CODE: ${salt}</h1>
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





