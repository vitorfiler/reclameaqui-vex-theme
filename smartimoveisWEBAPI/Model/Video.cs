using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartImoveisWebAPI.Model
{
    [Table("VideosImovel")]
    public class VideoTable
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

        [Column("Link")]
        [Required]
        [StringLength(65535)]
        [MinLength(1)]
        public string Link { get; set; }

        [Column("ImovelId")]
        [Required]
        public long ImovelId { get; set; }

    }

}
