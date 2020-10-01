using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReclameAquiWebAPI.Model
{
    [Table("Reclamacao")]
    public class Reclamacao
    {
        [Column("Id")]
        [Key]
        [DatabaseGenerated
        (DatabaseGeneratedOption.Identity)]
        [Required]
        public long Id { get; set; }

        [Column("ClienteId")]
        [Required]
        [ForeignKey("Cliente")]
        public long ClienteId { get; set; }
        public Cliente Cliente { get; set; }

        [Column("EmpresaId")]
        [Required]
        [ForeignKey("Empresa")]
        public long EmpresaId { get; set; }
        public Empresa Empresa { get; set; }

        [Column("StatusId")]
        [Required]
        [ForeignKey("Status")]
        public long StatusId { get; set; }
        public Status Status { get; set; }

        [Column("Titulo")]
        [Required]
        [StringLength(50)]
        [MinLength(1)]
        public string Titulo { get; set; }

        [Column("FlagCovid")]
        public bool FlagCovid { get; set; }

        [Column("TelContato")]
        [Required]
        [StringLength(12)]
        [MinLength(11)]
        public string TelContato { get; set; }

        [Column("TelContato2")]
        [StringLength(12)]
        public string TelContato2 { get; set; }

        [Column("DataAbertura")]
        [Description("DEFAULT NULL")]
        public DateTime DataAbertura { get; set; }

        [Column("DataEncerramento")]
        [Description("DEFAULT NULL")]
        public DateTime? DataEncerramento { get; set; }

        [Column("DataInicioTratativa")]
        [Description("DEFAULT NULL")]
        public DateTime? DataInicioTratativa { get; set; }

    }
    public class reclamacaoEmpresa
    {
        public List<string> urlFoto { get; set; }
        public List<string> idReclamacao { get; set; }
        public List<string> titulo { get; set; }
        public List<string> body { get; set; }
        public List<string> statusId { get; set; }
        public List<string> status { get; set; }
        public List<string> statusCor { get; set; }
        public List<string> tempoDecorrido { get; set; }
        public List<string> nomeReclamante { get; set; }
        public ListArquivos listaArquivos { get; set; }
        public ListNomeArquivos listaNomeArquivos { get; set; }
    }

    public class reclamacaoEmpresaReturn
    {
        public List<reclamacaoEmpresa> Reclamacoes { get; set; }
    }

    public class reclamacaoConsumidorReturn
    {
        public List<reclamacaoConsumidor> Reclamacoes { get; set; }
    }

    public class reclamacaoConsumidor
    {
        public List<string> id { get; set; }
        public List<string> statusId { get; set; }
        public List<string> status { get; set; }
        public List<string> statusCor { get; set; }
        public List<string> data { get; set; }
        public List<string> empresa { get; set; }
        public List<string> tituloReclamacao { get; set; }
        public List<string> tempoDecorrido { get; set; }
        public List<string> body { get; set; }
        public List<string> urlFoto { get; set; }
        public List<string> nomeReclamante { get; set; }
        public ListArquivos listaArquivos { get; set; }
        public ListNomeArquivos listaNomeArquivos { get; set; }
    }


}