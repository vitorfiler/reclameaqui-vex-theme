using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReclameAquiWebAPI.Model
{
    [Table("Login")]
    public class Login
    {
        [Column("Id")]
        [Key]
        [DatabaseGenerated
        (DatabaseGeneratedOption.Identity)]
        [Required]
        public long Id { get; set; }

        [Column("Usuario")]
        [Required]
        [StringLength(200)]
        [MinLength(1)]
        public string Usuario { get; set; }

        [Column("Senha")]
        [Required]
        [StringLength(200)]
        [MinLength(1)]
        public string Senha { get; set; }

        [Column("ClienteId")]
        public long? ClienteId { get; set; }
        public Cliente Cliente { get; set; }

        [Column("EmpresaId")]
        public long? EmpresaId { get; set; }
        public Empresa Empresa { get; set; }

        [Column("Perfil")]
        [Description("1- Cliente, 2-Empresa")]
        public int Perfil { get; set; }
    }

    public class PostLogin
    {
        [Required]
        public string Usuario { get; set; }
        [Required]
        public string Senha { get; set; }
    }
}