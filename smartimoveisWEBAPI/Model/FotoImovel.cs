using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartImoveisWebAPI.Model
{
    [Table("FotoImovel")]
    public class FotoImovel
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
        public Imovel oImovel { get; set; }
    }

    public class FotosImovelReturn
    {
        public List<FotoImovel> FotosImovel { get; set; }
        public List<FotoAreaImovel> FotosAreaImovel { get; set; }
        public List<FotoPlantaImovel> FotosPlantaImovel { get; set; }
    }

    public class FotoImovelUpdate
    {
        public long ImovelId { get; set; }
        public long FotoId { get; set; }
        public int Ordem { get; set; }
        public int TipoFoto { get; set; }
    }

    public class FotoImovelDelete
    {
        public long ImovelId { get; set; }
        public long FotoId { get; set; }
        public int TipoFoto { get; set; }
    }
}
