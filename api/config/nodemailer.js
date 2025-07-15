import nodemailer from "nodemailer";
import ENV from "./ENV.js";


const transport = nodemailer.createTransport({
    auth: {
        user: ENV.EMAIL,
        pass: ENV.EMAIL_PASS
    },
    service: "gmail",

})


const resetPasswordEmailBuilder = (value) => `
<!DOCTYPE html>
<html lang="en" style="margin: 0; padding: 0;">
  <head>
    <meta charset="UTF-8" />
    <title>Reset Password OTP</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #1f2937; /* bg-gray-800 */
        font-family: sans-serif;
      }

      .container {
        background-color: #111827; /* bg-gray-900 */
        border-radius: 8px;
        padding: 40px;
        color: #ffffff;
        width: 600px;
        margin: 0 auto;
      }

      .title {
        color: #3b82f6; /* blue-500 */
        font-size: 28px;
        text-align: center;
        margin-bottom: 20px;
      }

      .text {
        color: #d1d5db; /* gray-300 */
        font-size: 16px;
        text-align: center;
      }

      .otp-box {
        display: inline-block;
        background-color: #3b82f6; /* blue-500 */
        color: white;
        padding: 14px 24px;
        border-radius: 6px;
        font-size: 22px;
        letter-spacing: 4px;
        font-weight: bold;
        margin: 30px auto;
      }

      .info {
        color: #9ca3af; /* gray-400 */
        font-size: 14px;
        text-align: center;
      }

      .footer {
        color: #6b7280; /* gray-500 */
        font-size: 13px;
        text-align: center;
        margin-top: 40px;
      }

      .divider {
        margin: 40px 0;
        border: none;
        border-top: 1px solid #374151; /* gray-700 */
      }
    </style>
  </head>

  <body>
    <table width="100%" cellpadding="0" cellspacing="0" style="padding: 20px;">
      <tr>
        <td>
          <table cellpadding="0" cellspacing="0" class="container">
            <tr>
              <td>
                <h1 class="title">Reset Your Password</h1>
                <p class="text">
                  We received a request to reset your password. Use the OTP below to complete the process. This code is valid for the next 10 minutes.
                </p>
                <div style="text-align: center;">
                  <span class="otp-box">${value}</span>
                </div>
                <p class="info">
                  If you did not request a password reset, you can ignore this email.
                </p>
                <hr class="divider" />
                <p class="footer">
                  &copy; 2025 Your CSHUB. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>


`

export { transport , resetPasswordEmailBuilder}