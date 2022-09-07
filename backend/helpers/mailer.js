const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const oauth_link = 'https://developers.google.com/oauthplayground';
const { EMAIL, MAILING_ID, MAILING_SECRET, MAILING_REFRESH } = process.env;


const auth = new OAuth2(
    MAILING_ID,
    MAILING_SECRET,
    MAILING_REFRESH,
    oauth_link,
);

const sendverificationEmail = (email, name, url) => {
    auth.setCredentials({
        refresh_token: MAILING_REFRESH,
    });
    const accessToken = auth.getAccessToken();
    const stmp = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: EMAIL,
            clientId: MAILING_ID,
            clientSecret: MAILING_SECRET,
            refreshToken: MAILING_REFRESH,
            accessToken,
        },
    })
    const mailOptions = {
			from: EMAIL,
			to: email,
			subject: "NdoOr Email Verification",
			html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998"><img src="https://cdn.pixabay.com/photo/2015/05/17/10/51/facebook-770688_640.png" width="30px" alt="sadsdag"><span>Action require: Activate your facebook account</span></div><div style="padding:1rem 0;border-top:1px solid #eee;border-bottom:1px solid #eee;color:black;font-size:17px;font-family:Roboto"><span>Hello ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">Your recently vreated an accont on Facebook. To complete your registriation, please confirm youraccount</span></div><a href="${url}" style="width:200px;padding:10px 15px;background:#4c649b;text-decoration:none;font-weight:600;color:white;font-family:Roboto">Confirm your account </a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#aaa">Facebook allows you to stay in touch with all your friends. once registered on facebook, you can sharephotos, organize events and much more.</span></div></div>`,
		};
    stmp.sendMail(mailOptions, (err,res) => {
        if (err) return err;
        return res;
    })

        



    
}
    
    
module.exports = sendverificationEmail;
