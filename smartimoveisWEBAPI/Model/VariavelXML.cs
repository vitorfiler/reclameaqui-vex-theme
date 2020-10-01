using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartImoveisWebAPI.Model
{
    [Table("VariavelXML")]
    public class VariavelXML
    {
        [Column("Id")]
        [Key]
        [DatabaseGenerated
        (DatabaseGeneratedOption.Identity)]
        [Required]
        public long Id { get; set; }

        [Column("Nome")]
        [Required]
        [StringLength(50)]
        [MinLength(1)]
        public string Nome { get; set; }

        [Column("Descricao")]
        [Required]
        [StringLength(50)]
        [MinLength(1)]
        public string Descricao { get; set; }
    }
}
