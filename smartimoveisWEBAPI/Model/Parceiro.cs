using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartImoveisWebAPI.Model
{
    [Table("Parceiro")]
    public class Parceiro
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

        [Column("NomeArquivoXml")]
        [Required]
        [StringLength(50)]
        [MinLength(1)]
        public string NomeArquivoXml { get; set; }

        [Column("TagSimples")]
        [StringLength(50)]
        [MinLength(1)]
        public string TagSimples { get; set; }

        [Column("TagDestaque")]
        [StringLength(50)]
        [MinLength(1)]
        public string TagDestaque { get; set; }

        [Column("TagSuperDestaque")]
        [StringLength(50)]
        [MinLength(1)]
        public string TagSuperDestaque { get; set; }
    }
}
