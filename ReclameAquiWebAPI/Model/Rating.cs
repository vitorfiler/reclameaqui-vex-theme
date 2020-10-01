using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReclameAquiWebAPI.Model
{
    [Table("Rating")]
    public class Rating
    {
        [Column("Id")]
        [Key]
        [DatabaseGenerated
        (DatabaseGeneratedOption.Identity)]
        [Required]
        public long Id { get; set; }

        [Column("NotaRating")]
        [Required]
        public int NotaRating { get; set; }

        [Column("NotaSolucao")]
        [Required]
        public int NotaSolucao { get; set; }

        [Column("FlagVoltariaNegocios")]
        [Required]
        public bool FlagVoltariaNegocios { get; set; }

        [Column("ReclamacaoId")]
        [Required]
        public long ReclamacaoId { get; set; }
    }

    [Table("VW_RATING")]
    public class VwRating
    {
        [Column("Id")]
        [Key]
        [DatabaseGenerated
        (DatabaseGeneratedOption.Identity)]
        [Required]
        public long Id { get; set; }
        [Column("EmpId")]
        public string EmpId { get; set; }
        [Column("Nome")]
        public string Nome { get; set; }
        [Column("Quantidade")]
        public string Quantidade { get; set; }
        [Column("QuantidadeFechada")]
        public string QuantidadeFechada { get; set; }
        [Column("FotoEmp")]
        public string FotoEmp { get; set; }
        [Column("NotaRating")]
        public decimal NotaRating { get; set; }
        [Column("NotaSolucao")]
        public decimal NotaSolucao { get; set; }
        [Column("FlagVoltariaNegocios")]
        public decimal FlagVoltariaNegocios { get; set; }
        [Column("CategoriaId")]
        public long CategoriaId { get; set; }
        [Column("DataEncerramentoReclamacao")]
        public DateTime? DataEncerramentoReclamacao { get; set; }
        [Column("DataAberturaReclamacao")]
        public DateTime DataAberturaReclamacao { get; set; }
        [Column("DataCadastroEmp")]
        public DateTime DataCadastroEmp { get; set; }
    }

    public class RatingRetono
    {
        public string ranking { get; set; }
        public string dataAtualizacao { get; set; }
        public List<string> posicao { get; set; }
        public List<string> nome { get; set; }
        public List<string> valor { get; set; }
        public List<string> fotoEmpresa { get; set; }

    }

    public class RankingsRetorno
    {
        public List<RatingRetono> Rankings { get; set; }
    }

    public class RankingQuantidade
    {
        public string nome { get; set; }
        public int quantidade { get; set; }
        public string fotoEmp { get; set; }
    }
   
}
