using neo_email.Models;
using MailKit.Net.Smtp;
using MimeKit;

namespace neo_email.Services
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<bool> SendEmailAsync(EmailModel emailModel)
        {
            var emailSettings = _configuration.GetSection("EmailSettings");
            var senderEmail = emailSettings["SenderEmail"];
            var senderPassword = emailSettings["SenderPassword"];
            var smtpServer = emailSettings["SmtpServer"];
            var smtpPort = int.Parse(emailSettings["SmtpPort"]);

            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("Your Name", senderEmail));
            emailMessage.To.Add(new MailboxAddress("", emailModel.To));
            emailMessage.Subject = emailModel.Subject;
            emailMessage.Body = new TextPart("html") { Text = emailModel.Body };

            using var client = new SmtpClient();
            try
            {
                await client.ConnectAsync(smtpServer, smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
                await client.AuthenticateAsync(senderEmail, senderPassword);
                await client.SendAsync(emailMessage);
                await client.DisconnectAsync(true);
                return true;
            }
            catch (Exception ex) 
            {
                return false;
            }
        }
    }
}
