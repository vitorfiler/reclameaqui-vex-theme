using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReclameAquiWebAPI.Model
{
    [Table("Cliente")]
    public class Cliente
    {
        [Column("Id")]
        [Key]
        [DatabaseGenerated
        (DatabaseGeneratedOption.Identity)]
        [Required]
        public long Id { get; set; }

        [Column("Nome")]
        public string Nome { get; set; }

        [Column("DataNascimento")]
        public DateTime DataNascimento { get; set; }

        [Column("CPF")]
        public string CPF { get; set; }

        [Column("Genero")]
        public string Genero { get; set; }

        [Column("Celular")]
        public string Celular { get; set; }

        [Column("EnderecoId")]
        public long? EnderecoId { get; set; }

        public Endereco EnderecoCliente { get; set; }

        [Column("Email")]
        public string Email { get; set; }

        [Column("FotoPerfil")]
        [StringLength(200)]
        public string FotoPerfil { get; set; }
    }
}