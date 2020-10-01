using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReclameAquiWebAPI.Model
{
    [Table("Categoria")]
    public class Categoria
    {
        [Column("Id")]
        [Key]
        [DatabaseGenerated
        (DatabaseGeneratedOption.Identity)]
        [Required]
        public long Id { get; set; }

        [Column("Nome")]
        [Required]
        [StringLength(100)]
        [MinLength(1)]
        public string Nome { get; set; }

        [Column("NomeMenu")]
        [Required]
        [StringLength(100)]
        [MinLength(1)]
        public string NomeMenu { get; set; }

        [Column("Foto")]
        [Required]
        [StringLength(255)]
        [MinLength(1)]
        public string Foto { get; set; }

        [Column("FlagMae")]
        [Required]
        public bool FlagMae { get; set; }

        [Column("Cor")]
        [Required]
        [StringLength(7)]
        [MinLength(1)]
        public string Cor { get; set; }

    }

    public class DropDown
    {
        public List<CategoriaRetorno> Categoria { get; set; }
    }

    public class CategoriasMenu
    {
        public List<CategoriasMenuClass> Linha { get; set; }
    }

    public class CategoriaRetorno
    {
        public string label { get; set; }
        public string type { get; set; }
        public string route { get; set; }
    }

    public class CategoriasMenuClass
    {
        public string nomeMae { get; set; }
        public string nomeFilha { get; set; }
        public string cor { get; set; }
        public string rota { get; set; }
        public string foto { get; set; }
        public string idCategoriaMae { get; set; }
        public string idCategoriaFilha { get; set; }
    }

    public class CategoriasMenuRetorno
    {
        public List<CategoriasMenu> Linhas { get; set; }
    }

    public class DropDownRetorno
    {
        public List<DropDown> Categorias { get; set; }
    }

    [Table("CategoriaMaeFilha")]
    public class CategoriaMaeFilha
    {
        [Column("Id")]
        [Key]
        [DatabaseGenerated
        (DatabaseGeneratedOption.Identity)]
        [Required]
        public long Id { get; set; }

        [Column("CategoriaIdFilha")]
        [Required]
        public long CategoriaIdFilha { get; set; }

        [Column("CategoriaIdMae")]
        [Required]
        public long CategoriaIdMae { get; set; }
    }

}