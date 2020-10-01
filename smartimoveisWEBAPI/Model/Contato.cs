using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartImoveisWebAPI.Model
{
    [Table("Contato")]
    public class Contato
    {
        [Column("Id")]
        [Key]
        [DatabaseGenerated
        (DatabaseGeneratedOption.Identity)]
        [Required]
        public long Id { get; set; }

        [Column("Nome")]
        [Required]
        [StringLength(150)]
        [MinLength(1)]
        public string Nome { get; set; }

        [Column("Email")]
        [Required]
        [StringLength(150)]
        [MinLength(1)]
        public string Email { get; set; }

        [Column("Telefone")]
        [Required]
        [StringLength(11)]
        [MinLength(1)]
        public string Telefone { get; set; }

        [Column("Mensagem")]
        [Required]
        [MinLength(1)]
        public string Mensagem { get; set; }

        [Column("Status")]
        [Required]
        [StringLength(50)]
        [MinLength(1)]
        public string Status { get; set; }

        [Column("DataAbertura")]
        public DateTime DataAbertura { get; set; }
    }
    public class ContatoStatusUpdate
    {
        public long contatoId { get; set; }
        public string status { get; set; }
    }
}
