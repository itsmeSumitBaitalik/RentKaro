import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

export const sendEmailToAdmin = async (name, subject, email, message) => {
    try {
        const transporter = nodemailer.createTransport({
            secure:true,
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_PASSWORD
            }
        });
        await transporter.sendMail({
            from: process.env.ADMIN_EMAIL,
            to: email, 
            subject: `${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n <h1>Message: ${message}</h1>`,
            html:`<div>
            <h1>Hey there!</h1>
            <p>This is to inform you that your website ${message}</p>
            <p>Thank you</p>
            <p>Your sincerly</p>
            <p>${name}</p>
            </div>`
        });

        return { success: true, message: "Email sent successfully!" };

    } catch (error) {
        console.error("Error sending email: ", error);
        return { success: false, message: "Failed to send email!" };
    }
};
