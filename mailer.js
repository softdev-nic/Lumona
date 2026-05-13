const {resend} = require('resend');
require('dotenv').config()
const client = new resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
    try {
        const response  = await client.emails.send({
            from: "support@lumona.site",
            to,
            subject,
            html
        });
        console.log(response)
        return{
            success:true,
            response
        }


        }catch(error){
            return{
                success:false,
                error
            }
            }

        }
        module.exports = sendEmail;