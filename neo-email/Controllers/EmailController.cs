using Microsoft.AspNetCore.Mvc;
using neo_email.Models;
using neo_email.Services;

namespace neo_email.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly EmailService _emailService;

        public EmailController(EmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendEmail([FromBody] EmailModel emailModel)
        {
            var result = await _emailService.SendEmailAsync(emailModel);
            if (result)
                return Ok(new { message = "Email sent successfully!" });

            return BadRequest(new { message = "Failed to send email." });
        }
    }
}
