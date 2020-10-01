using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartImoveisWebAPI.Model
{
    [Table("Endereco")]
    public class Endereco
    {
        [Column("Id")]
        [Key]
        [DatabaseGenerated
        (DatabaseGeneratedOption.Identity)]
        [Required]
        public long Id { get; set; }

        [Column("Logradouro")]
        public string Logradouro { get; set; }

        [Column("Numero")]
        public string Numero { get; set; }

        [Column("Complemento")]
        public string Complemento { get; set; }

        [Column("Bairro")]
        public string Bairro { get; set; }

        [Column("Cidade")]
        public string Cidade { get; set; }

        [Column("UF")]
        public string UF { get; set; }

        [Column("CEP")]
        public string CEP { get; set; }

        [Column("Latitude")]
        [StringLength(20)]
        public string Latitude { get; set; }

        [Column("Longitude")]
        [StringLength(20)]
        public string Longitude { get; set; }
    }
}