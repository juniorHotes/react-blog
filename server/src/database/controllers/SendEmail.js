const nodemailer = require("nodemailer")
const config = require('../../config.json')

async function main(data) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  const to = data.to || "juniorhotes53@gmail.com"

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: config.blog_name,
    to: to,
    subject: data.subject,
    html: `<style>${styles}</style>${data.html}`,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = { main }

const styles = `
.container h1 {
  text-align: center
}
.container-buttons {
  margin-top: 40px;
  text-align: center
}
.link {
  text-decoration: none;
  padding: 12px;
  background: #00adef;
  color: white;
  text-align: center;
  border: none
}
`
