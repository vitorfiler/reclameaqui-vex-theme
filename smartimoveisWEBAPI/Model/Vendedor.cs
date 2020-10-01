using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartImoveisWebAPI.Model
{
    [Table("Vendedor")]
    public class Vendedor
    {
        [Column("Id")]
        [Key]
        [DatabaseGenerated
        (DatabaseGeneratedOption.Identity)]
        [Required]

        public long Id { get; set; }
        [Column("Nome")]
        [Required]
        [StringLength(200)]
        [MinLength(1)]
        public string Nome { get; set; }

        [Column("Email")]
        [Required]
        [StringLength(200)]
        [MinLength(1)]
        public string Email { get; set; }

        [Column("Celular")]
        [Required]
        [StringLength(11)]
        [MinLength(1)]
        public string Celular { get; set; }

        [Column("Facebook")]
        public string Facebook { get; set; }

        [Column("Twitter")]
        public string Twitter { get; set; }

        [Column("Linkedin")]
        public string Linkedin { get; set; }

        [Column("Instagram")]
        public string Instagram { get; set; }

        [Column("Apresentacao")]
        public string Apresentacao { get; set; }

        [Column("Usuario")]
        [Required]
        [StringLength(20)]
        [MinLength(1)]
        public string Usuario { get; set; }

        [Column("Senha")]
        [Required]
        [StringLength(200)]
        [MinLength(1)]
        public string Senha { get; set; }

        [Column("PefilAdmin")]
        [Required]
        public bool PefilAdmin { get; set; }

        [Column("Token")]
        public string Token { get; set; }

        [Column("Foto")]
        public string Foto { get; set; }
    }

    public class PostLogin
    {
        [Required]
        public string Usuario { get; set; }
        [Required]
        public string Senha { get; set; }
    }
}
