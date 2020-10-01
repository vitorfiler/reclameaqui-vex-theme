using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartImoveisWebAPI.Model
{
    [Table("XML")]
    public class XML
    {
        [Column("Id")]
        [Key]
        [DatabaseGenerated
        (DatabaseGeneratedOption.Identity)]
        [Required]
        public long Id { get; set; }
        [Column("ParceiroId")]
        [Required]
        public long ParceiroId { get; set; }
        [Column("XmlImovelInicio")]
        [Required]
        [StringLength(50)]
        [MinLength(1)]
        public string XmlImovelInicio { get; set; }
        [Column("XmlImovelCorpo")]
        [Required]
        [MinLength(1)]
        public string XmlImovelCorpo { get; set; }
        [Column("XmlImovelFim")]
        [Required]
        [MinLength(1)]
        public string XmlImovelFim { get; set; }
        [Column("XmlFotosInicio")]
        [Required]
        [MinLength(1)]
        public string XmlFotosInicio { get; set; }
        [Column("XmlFotosCorpo")]
        [Required]
        [MinLength(1)]
        public string XmlFotosCorpo { get; set; }
        [Column("XmlFotosFim")]
        [Required]
        [MinLength(1)]
        public string XmlFotosFim { get; set; }
        [Column("XmlVideosInicio")]
        [Required]
        [MinLength(1)]
        public string XmlVideosInicio { get; set; }
        [Column("XmlVideosCorpo")]
        [Required]
        [MinLength(1)]
        public string XmlVideosCorpo { get; set; }
        [Column("XmlVideosFim")]
        [Required]
        [MinLength(1)]
        public string XmlVideosFim { get; set; }
    }
}
