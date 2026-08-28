import nodemailer from "nodemailer";
import { TicketTemplate } from "../../public/Templates/TicketTemplate";
import { authenticateAdmin } from "../../lib/adminAuth";

async function SendEmail(req, res) {
    // Authenticate admin
    const adminEmail = authenticateAdmin(req, res);
    if (!adminEmail) return; // 401 already sent

    const body = await req.body;
    let emailList = [];
    if (body.email1 !== '') {
        emailList.push(body.email1);
    }
    if (body.email2 !== '') {
        emailList.push(body.email2);
    }
    try {
        await sendConfirmationMail(emailList)
        res.send({ status: 200, message: "Emails sent successfully" });
    } catch (e){
        console.log(e);
        res.send({ status: 500, message: "Emails not sent" });
    }
}

async function sendConfirmationMail(email) {
    var mailOptions = {
        to: email,
        from: 'TEDxShiv Nadar University <tedx.club@snu.edu.in>',
        subject: `Ticket Confirmation`,
        html: TicketTemplate(),
    };
    let transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        from: 'tedx.club@snu.edu.in',
        auth: {
            user: "tedx.club@snu.edu.in",
            pass: process.env.GMAIL_PASS,
        },
        secure: true,
    });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
    });
}

export default SendEmail;