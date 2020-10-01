using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReclameAquiWebAPI.Model
{
    [Table("Empresa")]
    public class Empresa
    {
        [Column("Id")]
        [Key]
        [DatabaseGenerated
        (DatabaseGeneratedOption.Identity)]
        [Required]
        public long Id { get; set; }

        [Column("Site")]
        [StringLength(200)]
        [MinLength(1)]
        public string Site { get; set; }

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

        [Column("Email2")]
        [StringLength(200)]
        public string Email2 { get; set; }

        [Column("DataCadastro")]
        public DateTime? DataCadastro { get; set; }

        [Column("CNPJ")]
        [Required]
        [MinLength(1)]
        [StringLength(14)]
        public string CNPJ { get; set; }

        [Column("Responsavel")]
        [StringLength(200)]
        [MinLength(1)]
        public string Responsavel { get; set; }

        [Column("Telefone")]
        [StringLength(20)]
        public string Telefone { get; set; }

        [Column("CelularResponsavel")]
        [StringLength(20)]
        public string CelularResponsavel { get; set; }

        [Column("EnderecoId")]
        public long? EnderecoId { get; set; }

        public Endereco EnderecoEmpresa{ get; set; }

        [Column("FotoPerfil")]
        [StringLength(200)]
        public string FotoPerfil { get; set; }

        [Column("Descricao")]
        public string Descricao { get; set; }
    }
}