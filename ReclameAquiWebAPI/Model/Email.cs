using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReclameAquiWebAPI.Model
{
    public class Email
    {
        [Required]
        public string Subject { get; set; }
        [Required]
        public string Empresa { get; set; }
        [Required]
        public string Cliente { get; set; }
        [Required]
        public string EmailBody { get; set; }
        public string Mensagem { get; set; }
        [Required]
        public string EmailDestino { get; set; }
        [Required]
        public int Status { get; set; }
    }
}
