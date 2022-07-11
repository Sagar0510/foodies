const nodemailer = require("nodemailer");

module.exports.sendMail = async function sendMail(data) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "sagarsolanki2000@gmail.com",
      pass: process.env.GMAIL_PASSWORD,
    },
  });
  try {
    let info = await transporter.sendMail({
      from: '"Sagar Singh 👻" <sagarsolanki2000@gmail.com>', // sender address
      to: "datguyy666@gmail.com", // data.email, // list of receivers
      subject: "Welcome!", // Subject line
      text: "Reset your password to get started!", // plain text body
      html: `
    <h1>click on the below link to reset your password</h1>
    <h3>link : ${data.resetLink} </h3>
    `, // html body
    });

    // console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    res.json(error);
  }
};
