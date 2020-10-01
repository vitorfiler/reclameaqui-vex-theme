using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReclameAquiWebAPI.Model
{
    [Table("Arquivo")]
    public class Arquivo
    {
        [Column("Id")]
        [Key]
        [DatabaseGenerated
        (DatabaseGeneratedOption.Identity)]
        [Required]
        public long Id { get; set; }

        [Column("IdReferencia")]
        [Required]
        public long IdReferencia { get; set; }

        [Column("TipoArquivoId")]
        [Required]
        [ForeignKey("ConteudoReclamacao")]
        public long TipoArquivoId { get; set; }
        public TipoArquivo TipoArquivo { get; set; }

        [Column("TipoUploadId")]
        [Required]
        [ForeignKey("ConteudoReclamacao")]
        public long TipoUploadId { get; set; }
        public TipoUpload TipoUpload { get; set; }

        [Column("NomeArquivo")]
        [Required]
        [StringLength(200)]
        [MinLength(1)]
        public string NomeArquivo { get; set; }

        [Column("CaminhoArquivo")]
        [Required]
        [StringLength(200)]
        [MinLength(1)]
        public string CaminhoArquivo { get; set; }
    }

    public class ListArquivos
    {
        public List<ArquivoInd> Arquivos { get; set; }
    }
    public class ArquivoInd
    {
        public List<string> Arquivo { get; set; }
    }

    public class ListNomeArquivos
    {
        public List<NomeArquivoInd> NomeArquivos { get; set; }
    }
    public class NomeArquivoInd
    {
        public List<string> NomeArquivo { get; set; }
    }


}