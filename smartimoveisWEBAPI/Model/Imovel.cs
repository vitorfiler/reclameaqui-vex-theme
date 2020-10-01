using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartImoveisWebAPI.Model
{
    [Table("Imovel")]
    public class Imovel
    {
        [Column("Id")]
        [Key]
        [DatabaseGenerated
        (DatabaseGeneratedOption.Identity)]
        [Required]
        public long Id { get; set; }

        [Column("Nome")]
        [Required]
        [StringLength(50)]
        [MinLength(1)]
        public string Nome { get; set; }

        [Column("Referencia")]
        [Required]
        [StringLength(20)]
        [MinLength(1)]
        public string Referencia { get; set; }

        [Column("Descricao")]
        [Required]
        [StringLength(65535)]
        [MinLength(1)]
        public string Descricao { get; set; }

        [Column("Tipo")]
        public string Tipo { get; set; }

        [Column("PrecoVenda")]
        public decimal PrecoVenda { get; set; }

        [Column("PrecoLocacao")]
        public decimal PrecoLocacao { get; set; }

        [Column("PrecoCondominio")]
        public decimal PrecoCondominio { get; set; }

        [Column("Complemento")]
        [StringLength(50)]
        public string Complemento { get; set; }

        [Column("AreaUtil")]
        public int AreaUtil { get; set; }

        [Column("AreaTotal")]
        public int AreaTotal { get; set; }

        [Column("QtdDormitorios")]
        public int QtdDormitorios { get; set; }

        [Column("QtdSuites")]
        public int QtdSuites { get; set; }

        [Column("QtdBanheiros")]
        public int QtdBanheiros { get; set; }

        [Column("QtdSalas")]
        public int QtdSalas { get; set; }

        [Column("QtdVagas")]
        public int QtdVagas { get; set; }

        [Column("QtdElevador")]
        public int QtdElevador { get; set; }

        [Column("QtdUnidadesAndar")]
        public int QtdUnidadesAndar { get; set; }

        [Column("AnoConstrucao")]
        public int AnoConstrucao { get; set; }

        [Column("ArmarioCozinha")]
        public bool ArmarioCozinha { get; set; }

        [Column("ArmarioEmbutido")]
        public bool ArmarioEmbutido { get; set; }

        [Column("EstacionamentoVisitantes")]
        public bool EstacionamentoVisitantes { get; set; }

        [Column("Piscina")]
        public bool Piscina { get; set; }

        [Column("QuadraSquash")]
        public bool QuadraSquash { get; set; }

        [Column("QuadraTenis")]
        public bool QuadraTenis { get; set; }

        [Column("QuadraPoliesportiva")]
        public bool QuadraPoliesportiva { get; set; }

        [Column("SalaGinastica")]
        public bool SalaGinastica { get; set; }

        [Column("SalaoFestas")]
        public bool SalaoFestas { get; set; }

        [Column("SalaoJogos")]
        public bool SalaoJogos { get; set; }

        [Column("Sauna")]
        public bool Sauna { get; set; }

        [Column("Varanda")]
        public bool Varanda { get; set; }

        [Column("Lavabo")]
        public bool Lavabo { get; set; }

        [Column("DepositoSubsolo")]
        public bool DepositoSubsolo { get; set; }

        [Column("Closet")]
        public bool Closet { get; set; }

        [Column("Hidromassagem")]
        public bool Hidromassagem { get; set; }

        [Column("Lareira")]
        public bool Lareira { get; set; }

        [Column("AndarInteiro")]
        public bool AndarInteiro { get; set; }

        [Column("MeioAndar")]
        public bool MeioAndar { get; set; }

        [Column("SalaAlmoco")]
        public bool SalaAlmoco { get; set; }

        [Column("SalaJantar")]
        public bool SalaJantar { get; set; }

        [Column("SalaIntima")]
        public bool SalaIntima { get; set; }

        [Column("Brinquedoteca")]
        public bool Brinquedoteca { get; set; }

        [Column("Playground")]
        public bool Playground { get; set; }

        [Column("Churrasqueira")]
        public bool Churrasqueira { get; set; }

        [Column("Copa")]
        public bool Copa { get; set; }

        [Column("DependenciaEmpregados")]
        public bool DependenciaEmpregados { get; set; }

        [Column("Despensa")]
        public bool Despensa { get; set; }

        [Column("Edicula")]
        public bool Edicula { get; set; }

        [Column("Quintal")]
        public bool Quintal { get; set; }

        [Column("FlagAtivo")]
        public bool? FlagAtivo { get; set; }

        [Column("FlagDestaque")]
        public bool? FlagDestaque { get; set; }

        [Column("FlagSuperDestaque")]
        public bool? FlagSuperDestaque { get; set; }

        [Column("EnderecoId")]
        [ForeignKey("Endereco")]
        public long? EnderecoId { get; set; }

        public Endereco oEndereco { get; set; }

        [Column("EdificioId")]
        [ForeignKey("Edificio")]
        public long? EdificioId { get; set; }

        public Edificio oEdificio { get; set; }

        [Column("DataAlteracao")]
        public DateTime DataAlteracao { get; set; }

        [Column("UsuarioAlteracao")]
        public bool UsuarioAlteracao { get; set; }
    }

    public class ImoveisReturn
    {
        public Imoveis imoveis { get; set; }
    }
    public class Imoveis
    {
        public List<long> id { get; set; }
        public List<string> referencia { get; set; }
        public List<string> foto_fachada { get; set; }
        public List<string> edificio_condominio { get; set; }
        public List<string> tipo { get; set; }
        public List<string> preco { get; set; }
        public List<string> data_alteracao { get; set; }
        public List<string> nome_imovel { get; set; }
    }
}
