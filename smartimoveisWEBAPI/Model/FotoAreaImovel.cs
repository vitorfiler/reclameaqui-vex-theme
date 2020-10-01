using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartImoveisWebAPI.Model
{
    [Table("FotoAreaImovel")]
    public class FotoAreaImovel
    {
        [Column("Id")]
        [Key]
        [DatabaseGenerated
        (DatabaseGeneratedOption.Identity)]
        [Required]
        public long Id { get; set; }

        [Column("NomeFoto")]
        [Required]
        [StringLength(255)]
        [MinLength(1)]
        public string NomeFoto { get; set; }

        [Column("Caminho")]
        [Required]
        [StringLength(255)]
        [MinLength(1)]
        public string Caminho { get; set; }

        [Column("Ordem")]
        [Required]
        public int Ordem { get; set; }

        [Column("ImovelId")]
        [ForeignKey("Imovel")]
        public long ImovelId { get; set; }
        public Imovel Imovel { get; set; }
    }
}
