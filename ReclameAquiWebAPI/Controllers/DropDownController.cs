using ReclameAquiWebAPI.Model;
using ReclameAquiWebAPI.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;

namespace ReclameAquiWebAPI.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class DropDownController : ControllerBase
    {
        private readonly IReclameAquiRepository _repo;
        private readonly IConfiguration _config;
        public DropDownController(IReclameAquiRepository reclameAquiRepository, IConfiguration config)
        {
            _repo = reclameAquiRepository;
            _config = config;
        }

        #region "GET"
        [HttpGet]
        [Produces(typeof(CategoriaMaeFilha))]
        public async Task<IActionResult> Get(string Token)
        {   
            var TokenApi = new Token
            {
                TokenDef = _config.GetValue<string>("Token:TokenDef")

            };
            if (TokenApi.TokenDef != Token)
            {
                return this.StatusCode(StatusCodes.Status401Unauthorized, $"O Token informado não é autorizado.");
            }
            try
            {
                var listaRetorno = new DropDownRetorno();
                var listaDropDown = new List<DropDown>();
                var listaCategoriaRetorno = new List<CategoriaRetorno>();
                var categorias = await _repo.GetAllCategoriasAsync();
                var categoriasRel = await _repo.GetAllCategoriasMaeFilhasAsync();

                var categoriasMaes = categorias.Where(x => x.FlagMae).ToList();

                foreach (var mae in categoriasMaes)
                {
                    var categoriasFilhas = categoriasRel.Where(x => x.CategoriaIdMae == mae.Id).ToList();
                    listaCategoriaRetorno = new List<CategoriaRetorno>();
                    foreach (var filha in categoriasFilhas)
                    {
                        var filhaCompleta = categorias.Where(x => x.Id == filha.CategoriaIdFilha).FirstOrDefault();
                        var objRetorno = new CategoriaRetorno
                        {
                            label = filhaCompleta.Nome,
                            route = "/" + filhaCompleta.NomeMenu,
                            type = "link"
                        };
                        listaCategoriaRetorno.Add(objRetorno);
                    }
                    listaDropDown.Add(new DropDown { 
                    Categoria = listaCategoriaRetorno
                    });
                }
                listaRetorno.Categorias = listaDropDown;

                return Ok(listaRetorno);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Ocorreu um erro no banco de Dados.{ex.Message}");
            }
        }
        #endregion
    }
}