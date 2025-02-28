const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();


const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

app.post("/send", async (req, res) => {
    const { to, subject, html,img1 } = req.body;
    const emailTemplate = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
             <div style="display:flex;flex-direction:row;">
                <img src="${img1}" alt="Logo" style="max-width: 100px; max-height:500px">
                <div style="background: #f9f9f9; padding: 10px; border-radius: 5px;">
                    ${html}
                </div>
            </div>
             <div style="text-align:center;align-items: center;justify-content: center;">
                <img src="https://drive.google.com/uc?id=1CBjNvbrIQhbuklwdaeof1Y04ENakdY0Q" alt="promo text" width=50% />
            </div>
        </div>
    `;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject,
            html:emailTemplate
        });
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error sending email", error });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
