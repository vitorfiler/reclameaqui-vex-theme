using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartImoveisWebAPI.Model
{
    [Table("FotoEdificio")]
    public class FotoEdificio
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

        [Column("EdificioId")]
        [ForeignKey("Edificio")]
        public long EdificioId { get; set; }
        public Edificio oEdificio { get; set; }
    }
    public class FotosEdificioReturn
    {
        public List<FotoEdificio> FotosEdificio { get; set; }
        public List<FotoAreaEdificio> FotosAreaEdificio { get; set; }
        public List<FotoPlantaEdificio> FotosPlantaEdificio { get; set; }
    }
    public class FotoEdificioUpdate
    {
        public long EdficioId { get; set; }
        public long FotoId { get; set; }
        public int Ordem { get; set; }
        public int TipoFoto { get; set; }
    }
    public class FotoEdificioDelete
    {
        public long EdficioId { get; set; }
        public long FotoId { get; set; }
        public int TipoFoto { get; set; }
    }
}
