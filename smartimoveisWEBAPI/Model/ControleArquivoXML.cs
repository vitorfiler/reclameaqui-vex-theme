using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartImoveisWebAPI.Model
{
    [Table("ControleArquivoXML")]
    public class ControleArquivoXML
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

        [Column("FlagArquivoXML")]
        public bool FlagArquivoXML { get; set; }

        [Column("DataSolicitacao")]
        public DateTime DataSolicitacao { get; set; }

        [Column("Mensagem")]
        public string Mensagem { get; set; }

    }
}
