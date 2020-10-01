using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartImoveisWebAPI.Model
{
    [Table("ParceiroCarga")]
    public class ParceiroCarga
    {
        [Column("Id")]
        [Key]
        [DatabaseGenerated
        (DatabaseGeneratedOption.Identity)]
        [Required]

        public long Id { get; set; }

        [Column("ParceiroId")]
        [ForeignKey("Parceiro")]
        [Required]
        public long ParceiroId { get; set; }
        public Parceiro oParceiro { get; set; }

        [Column("AnuncioSimples")]
        [Required]
        public int AnuncioSimples { get; set; }

        [Column("Destaque")]
        [Required]
        public int Destaque { get; set; }

        [Column("SuperDestaque")]
        [Required]
        public int SuperDestaque { get; set; }

    }
}
