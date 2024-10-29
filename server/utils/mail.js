const nodemailer = require("nodemailer");

const sendMail = (email, subject, body) => {
    const transporter = nodemailer.createTransport({
        host: process.env.HOST, 
        port: 465, 
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        }
    });
    
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${subject}</title>
        </head>
        <body>
            ${body}
        </body>
        </html>`
      };
    
      transporter.sendMail(mailOptions, async(error, data) => {
        if (error) return {status: 400, message: "Wysałanie email się nie powiodło"};
        else return {status: 200, message: "Email wysłany poprawnie"};
      });
}

module.exports = {sendMail};
