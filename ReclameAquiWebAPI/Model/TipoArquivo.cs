using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReclameAquiWebAPI.Model
{
    [Table("TipoArquivo")]
    public class TipoArquivo
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

    }
}