using ReclameAquiWebAPI.Model;
using ReclameAquiWebAPI.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System;
using System.IO;
using System.Net.Http.Headers;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using Microsoft.Extensions.Configuration;

namespace ReclameAquiWebAPI.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IReclameAquiRepository _repo;
        private readonly IConfiguration _config;
        public EmailController(IReclameAquiRepository reclameAquiRepository, IConfiguration config)
        {
            _repo = reclameAquiRepository;
            _config= config;
        }

        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Post(Email model, string Token)
        {   
            var TokenApi = new Token
            {
                TokenDef = _config.GetValue<string>("Token:TokenDef")

            };
            if (TokenApi.TokenDef != Token)
            {
                return this.StatusCode(StatusCodes.Status401Unauthorized, $"O Token informado não é autorizado.");
            }
            try
            {
                var emailBody = model.EmailBody;
                // create email message
                var email = new MimeMessage();
                email.Sender = MailboxAddress.Parse("envioemail@alvimsolutions.com.br");
                email.To.Add(MailboxAddress.Parse(model.EmailDestino));
                email.Subject = model.Subject;
                email.Body = new TextPart(TextFormat.Html) { Text = emailBody };

                // send email
                using var smtp = new SmtpClient();
                smtp.Connect("email-ssl.com.br", 465, SecureSocketOptions.SslOnConnect);
                smtp.Authenticate("envioemail@alvimsolutions.com.br", "Alv!m123");
                smtp.Send(email);
                smtp.Disconnect(true);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        private string RetornaStatusReclamacao(int id)
        {
            switch (id)
            {
                case 1: return "Aguardando Analise";
                case 2: return "Iniciada";
                case 3: return "Improcedente";
                case 4: return "Respondido";
                case 5: return "Finalizado";
                case 6: return "Cancelada";
            }
            return "";
        }
    }
}