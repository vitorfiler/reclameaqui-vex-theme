using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using Microsoft.Extensions.Configuration;
using SmartImoveisWebAPI.Repository;
using SmartImoveisWebAPI.Model;

namespace ReclameAquiWebAPI.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class ImoveisController : ControllerBase
    {
        private readonly ISmartImoveisRepository _repo;
        private readonly IConfiguration _config;

        public ImoveisController(ISmartImoveisRepository smartImoveisRepository, IConfiguration config)
        {
            _repo = smartImoveisRepository;
            _config = config;
        }
        #region "GET"

        [HttpGet]
        [Produces(typeof(ImoveisReturn))]
        public async Task<IActionResult> Get(string Token, bool? Ativos = true)
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
                var listaImovels = await _repo.GetAllImoveisAtivosAsync(Ativos);
                var listaId = new List<long>();
                var listaReferencia = new List<string>();
                var listaFotoFachada = new List<string>();
                var listaEdificioCondominio = new List<string>();
                var listaTipo = new List<string>();
                var listaPreco = new List<string>();
                var listaDataAlteracao = new List<string>();
                var listaNomeImovel = new List<string>();

                foreach (var imovel in listaImovels)
                {
                    listaId.Add(imovel.Id);
                    listaReferencia.Add(imovel.Referencia);
                    var listaFotosImovel = await _repo.GetFotosImovelByIdAsync(imovel.Id);
                    var fotoImovelZero = listaFotosImovel.Where(x => x.Ordem == 0).FirstOrDefault();
                    if (fotoImovelZero != null)
                        listaFotoFachada.Add(fotoImovelZero.Caminho);
                    else
                        listaFotoFachada.Add("");
                    if (imovel.oEdificio != null)
                        listaEdificioCondominio.Add(imovel.oEdificio.Nome);
                    else
                        listaEdificioCondominio.Add("");
                    listaTipo.Add(imovel.Tipo);
                    if (imovel.PrecoVenda > 0)
                        listaPreco.Add(imovel.PrecoVenda.ToString());
                    else
                        listaPreco.Add(imovel.PrecoLocacao.ToString());
                    listaNomeImovel.Add(imovel.Nome);
                    listaDataAlteracao.Add(imovel.DataAlteracao.ToString("dd/MM/yyyy"));
                }
                var retorno = new ImoveisReturn();
                retorno.imoveis = new Imoveis
                {
                    data_alteracao = listaDataAlteracao,
                    edificio_condominio = listaEdificioCondominio,
                    foto_fachada = listaFotoFachada,
                    preco = listaPreco,
                    referencia = listaReferencia,
                    tipo = listaTipo,
                    id = listaId,
                    nome_imovel = listaNomeImovel
                };

                return Ok(retorno);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Ocorreu um erro no banco de Dados.{ex.Message}");
            }
        }

        [HttpGet("GetById")]
        [Produces(typeof(Imovel))]
        public async Task<IActionResult> Get(string Token, long ImovelId, bool? Ativos = true)
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
                var listaImovels = await _repo.GetImovelByIdAsync(ImovelId);
                return Ok(listaImovels);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Ocorreu um erro no banco de Dados.{ex.Message}");
            }
        }

        [HttpGet("fotos-imovel")]
        [Produces(typeof(FotosImovelReturn))]
        public async Task<IActionResult> Get(string Token, long ImovelId)
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
                var listaFotoImovel = await _repo.GetFotosImovelByIdAsync(ImovelId);
                var listaFotoAreaImovel = await _repo.GetFotosAreaImovelByIdAsync(ImovelId);
                var listaFotoPlantaImovel = await _repo.GetFotosPlantaImovelByIdAsync(ImovelId);
                var retorno = new FotosImovelReturn
                {
                    FotosImovel = listaFotoImovel.ToList(),
                    FotosAreaImovel = listaFotoAreaImovel.ToList(),
                    FotosPlantaImovel = listaFotoPlantaImovel.ToList()
                };

                return Ok(retorno);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Ocorreu um erro no banco de Dados.{ex.Message}");
            }
        }

        #endregion

        #region "POST"
        [HttpPost]
        [Produces(typeof(Imovel))]
        public async Task<IActionResult> Post(Imovel model, string Token)
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
                var Imovel = await _repo.GetImovelByRefAsync(model.Nome);
                if (Imovel != null)
                {
                    return this.StatusCode(StatusCodes.Status401Unauthorized, "Imovel ja existe com essa Referencia.");
                }
                _repo.Add(model);
                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/Imoveis/GetById/{model.Id}",model);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou.{ex.Message}");
            }
            return BadRequest();
        }
        [HttpPost("Video")]
        public async Task<IActionResult> Post(VideoTable model, string Token)
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
                _repo.Add(model);
                if (await _repo.SaveChangesAsync())
                {
                    return this.StatusCode(StatusCodes.Status200OK, model);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou.{ex.Message}");
            }
            return BadRequest();
        }

        [HttpPut]
        public async Task<IActionResult> Put(Imovel model, string Token)
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
                var Imovel = await _repo.GetImovelByIdAsync(model.Id);
                if (Imovel == null) return NotFound();

                _repo.Update(model);

                if (await _repo.SaveChangesAsync())
                {
                    return this.StatusCode(StatusCodes.Status200OK, model);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou.{ex.Message}");
            }
            return BadRequest();
        }

        [HttpPut("fotos-imovel-ordem")]
        public async Task<IActionResult> Put(FotoImovelUpdate model, string Token)
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
                if (model.TipoFoto == 2) //Imovel
                {
                    var fotos = await _repo.GetFotosImovelByIdAsync(model.ImovelId);
                    if (fotos.Count() <= 0) return NoContent();
                    var foto = fotos.Where(x => x.Id == model.FotoId).FirstOrDefault();
                    foto.Ordem = model.Ordem;
                    _repo.Update(foto);
                }
                else if (model.TipoFoto == 6) //Area
                {
                    var fotos = await _repo.GetFotosAreaImovelByIdAsync(model.ImovelId);
                    if (fotos.Count() <= 0) return NoContent();
                    var foto = fotos.Where(x => x.Id == model.FotoId).FirstOrDefault();
                    foto.Ordem = model.Ordem;
                    _repo.Update(foto);
                }
                else if (model.TipoFoto == 7) //Planta
                {
                    var fotos = await _repo.GetFotosPlantaImovelByIdAsync(model.ImovelId);
                    if (fotos.Count() <= 0) return NoContent();
                    var foto = fotos.Where(x => x.Id == model.FotoId).FirstOrDefault();
                    foto.Ordem = model.Ordem;
                    _repo.Update(foto);
                }
                else
                {
                    return NotFound();
                }

                if (await _repo.SaveChangesAsync())
                {
                    return this.StatusCode(StatusCodes.Status200OK);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou.{ex.Message}");
            }
            return BadRequest();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long ImovelId, string Token)
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
                var Imovel = await _repo.GetImovelByIdAsync(ImovelId);
                if (Imovel == null) return NotFound();

                Imovel.FlagAtivo = false;
                _repo.Update(Imovel);

                await _repo.SaveChangesAsync();
                return Ok();
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou. {ex.Message}");
            }
        }
        [HttpDelete("imoveis-fotos-delete")]
        public async Task<IActionResult> Delete(FotoImovelDelete model, string Token)
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
                if (model.TipoFoto == 2) //Imovel
                {
                    var fotos = await _repo.GetFotosImovelByIdAsync(model.ImovelId);
                    if (fotos.Count() <= 0) return NoContent();
                    var foto = fotos.Where(x => x.Id == model.FotoId).FirstOrDefault();

                    _repo.Delete(foto);
                }
                else if (model.TipoFoto == 6) //Area
                {
                    var fotos = await _repo.GetFotosAreaImovelByIdAsync(model.ImovelId);
                    if (fotos.Count() <= 0) return NoContent();
                    var foto = fotos.Where(x => x.Id == model.FotoId).FirstOrDefault();

                    _repo.Delete(foto);
                }
                else if (model.TipoFoto == 7) //Planta
                {
                    var fotos = await _repo.GetFotosPlantaImovelByIdAsync(model.ImovelId);
                    if (fotos.Count() <= 0) return NoContent();
                    var foto = fotos.Where(x => x.Id == model.FotoId).FirstOrDefault();

                    _repo.Delete(foto);
                }
                else
                {
                    return NotFound();
                }

                if (await _repo.SaveChangesAsync())
                {
                    return this.StatusCode(StatusCodes.Status200OK);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou. {ex.Message}");
            }
            return BadRequest();
        }
        #endregion
    }
}