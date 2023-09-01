import mail from "@sendgrid/mail";

async function sendEmail(to, from, subject, fullname, message) {
  mail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    await mail.send({
      to: to,
      from: from,
      subject: subject,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>The HTML5 Herald</title>
        <meta name="description" content="The HTML5 Herald">
        <meta name="author" content="SitePoint">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />

        <link rel="stylesheet" href="css/styles.css?v=1.0">

      </head>

      <body>
        <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">
              </div>
              <div class="container" style="margin-left: 20px;margin-right: 20px;">
              <h3>Hello ${fullname}, </h3>
              <div style="font-size: 16px;">
              <p>${message}</p>
              </div>
              <p class="footer" style="font-size: 16px;padding-bottom: 20px;border-bottom: 1px solid #D1D5DB;">Regards,<br>Make My Memories<br>Bangalore Office<br>Contact No: +91 9199264472</p>
              <div class="footer-links" style="display: flex;justify-content: center;align-items: center;">
                <a href="https://opentechlab.in/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Website</a>
                <a href="https://opentechlab.in/blog" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Blog</a>
                <a href="https://github.com/Aadil673/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">GitHub</a>
                <a href="https://instagram.com/heyaadil/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Instagram</a>
                <a href="https://www.linkedin.com/in/aadil-hussain-82a19a81/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">LinkedIn</a>
                <a href="https://twitter.com/aadilanalytics/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Twitter</a>

              </div>
              </div>
      </body>
      </html>`,
     });
  } catch (error) {
    console.log("sendgrid API error: ");
    console.log(error.response.body);
    return error;
  }

  return { success: `Email has been sent successfully to ${to}!` };
}

export default sendEmail;