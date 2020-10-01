using ReclameAquiWebAPI.Model;
using ReclameAquiWebAPI.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using Microsoft.Extensions.Configuration;

namespace ReclameAquiWebAPI.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class CategoriasController : ControllerBase
    {
        private readonly IReclameAquiRepository _repo;
        private readonly IConfiguration _config;
        
        public CategoriasController(IReclameAquiRepository reclameAquiRepository, IConfiguration config)
        {
            _repo = reclameAquiRepository;

             _config = config;
        }
        #region "GET"
        [HttpGet("/api/todas-categorias")]
        [Produces(typeof(CategoriasMenuRetorno))]
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
                var listaRetorno = new CategoriasMenuRetorno();
                var listaCategoriasMenu = new List<CategoriasMenu>();
                var listaCategoriaRetorno = new List<CategoriasMenuClass>();
                var categorias = await _repo.GetAllCategoriasAsync();
                var categoriasRel = await _repo.GetAllCategoriasMaeFilhasAsync();
                var categoriasMaes = categorias.Where(x => x.FlagMae).ToList();
                var count = 0;
                listaCategoriaRetorno = new List<CategoriasMenuClass>();
                foreach (var mae in categoriasMaes)
                {
                    var maeCompleta = categorias.Where(x => x.Id == mae.Id).FirstOrDefault();
                    var categoriasFilhas = categoriasRel.Where(x => x.CategoriaIdMae == mae.Id).ToList();
                    foreach (var filha in categoriasFilhas)
                    {
                        var filhaCompleta = categorias.Where(x => x.Id == filha.CategoriaIdFilha).FirstOrDefault();
                        var objRetorno = new CategoriasMenuClass
                        {
                            nomeMae = maeCompleta.Nome,
                            nomeFilha = filhaCompleta.Nome,
                            rota = filhaCompleta.NomeMenu,
                            cor = maeCompleta.Cor,
                            foto = filhaCompleta.Foto,
                            idCategoriaFilha = filhaCompleta.Id.ToString(),
                            idCategoriaMae = maeCompleta.Id.ToString()
                        };
                        listaCategoriaRetorno.Add(objRetorno);
                        if (count == 3)
                        {
                            listaCategoriasMenu.Add(new CategoriasMenu
                            {
                                Linha = listaCategoriaRetorno
                            });
                            listaCategoriaRetorno = new List<CategoriasMenuClass>();
                            count = 0;
                        }
                        else count++;
                    }

                }
                if (listaCategoriaRetorno.Count > 0)
                {
                    listaCategoriasMenu.Add(new CategoriasMenu
                    {
                        Linha = listaCategoriaRetorno
                    });
                    listaCategoriaRetorno = new List<CategoriasMenuClass>();
                }
                listaRetorno.Linhas = listaCategoriasMenu;

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