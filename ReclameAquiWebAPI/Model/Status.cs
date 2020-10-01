using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReclameAquiWebAPI.Model
{
    [Table("Status")]
    public class Status
    {
        [Column("Id")]
        [Key]
        [DatabaseGenerated
        (DatabaseGeneratedOption.Identity)]
        [Required]
        public long Id { get; set; }

        [Column("Descricao")]
        [Required]
        [StringLength(50)]
        [MinLength(1)]
        public string Descricao { get; set; }

        [Column("Cor")]
        [StringLength(50)]
        [MinLength(1)]
        public string Cor { get; set; }

    }
    public class Token
    {
        public string TokenDef { get; set; }
    }
    public class FTP
    {
        public string Host { get; set; }
        public string Login { get; set; }
        public string Senha { get; set; }
    }
}