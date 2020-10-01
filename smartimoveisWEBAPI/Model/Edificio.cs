using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartImoveisWebAPI.Model
{
    [Table("Edificio")]
    public class Edificio
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

        [Column("Zelador")]
        [Required]
        [StringLength(150)]
        [MinLength(1)]
        public string Zelador { get; set; }

        [Column("Referencia")]
        [Required]
        [StringLength(20)]
        [MinLength(1)]
        public string Referencia { get; set; }

        [Column("Telefone1")]
        public string Telefone1 { get; set; }

        [Column("Telefone2")]
        public string Telefone2 { get; set; }

        [Column("Celular1")]
        public string Celular1 { get; set; }

        [Column("Celular2")]
        public string Celular2 { get; set; }

        [Column("EnderecoId")]
        [ForeignKey("Endereco")]
        public long EnderecoId { get; set; }
        public Endereco oEndereco { get; set; }

        [Column("FlagAtivo")]
        public bool FlagAtivo { get; set; }
    }

    public class AllEdificiosReturn
    {
        public List<long> id { get; set; }
        public List<string> nome { get; set; }
        public List<string> zelador { get; set; }
        public List<string> referencia { get; set; }
        public List<string> telefone1 { get; set; }
        public List<string> telefone2 { get; set; }
        public List<string> celular1 { get; set; }
        public List<string> celular2 { get; set; }
        public List<bool> flagAtivo { get; set; }
        //public List<string> endereco { get; set; }
        public List<Endereco> enderecos { get; set; }
    }

}
