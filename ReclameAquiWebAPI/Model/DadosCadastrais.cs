using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReclameAquiWebAPI.Model
{
    public class AtualizaEmail
    {
        [Required]
        public long Id { get; set; }

        [Required]
        public string Email { get; set; }

        public string Email2 { get; set; }

    }

    public class AtualizaSenha
    {
        [Required]
        public long Id { get; set; }

        [Required]
        public string Password { get; set; }


    }
}