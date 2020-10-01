using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReclameAquiWebAPI.Model
{
    [Table("ConteudoReclamacao")]
    public class ConteudoReclamacao
    {
        [Column("Id")]
        [Key]
        [DatabaseGenerated
        (DatabaseGeneratedOption.Identity)]
        [Required]
        public long Id { get; set; }

        [Column("ReclamacaoId")]
        [Required]
        [ForeignKey("Reclamacao")]
        public long ReclamacaoId { get; set; }
        public Reclamacao Reclamacao { get; set; }

        [Column("Conteudo")]
        [Required]
        [MinLength(1)]
        public string Conteudo { get; set; }

        [Column("FlagCliente")]
        [Required]
        public bool FlagCliente { get; set; }


        [Column("DataSave")]
        [Description("DEFAULT NULL")]
        public DateTime DataSave { get; set; }

    }

    public class Resposta
    {
        public string nomePerfil { get; set; }
        public string fotoPerfil { get; set; }
        public string textoResposta { get; set; }
        public string horaResposta { get; set; }
    }

    public class RespostaRetorno
    {
        public List<Resposta> Respostas { get; set; }
    }

    public class CounteudoSave
    {
        public long ReclamacaoId { get; set; }
        public string Conteudo { get; set; }
        public bool FlagCliente { get; set; }
    }

}