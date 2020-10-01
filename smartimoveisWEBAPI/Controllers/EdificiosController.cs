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
    public class EdificiosController : ControllerBase
    {
        private readonly ISmartImoveisRepository _repo;
        private readonly IConfiguration _config;

        public EdificiosController(ISmartImoveisRepository smartImoveisRepository, IConfiguration config)
        {
            _repo = smartImoveisRepository;
            _config = config;
        }
        #region "GET"

        [HttpGet("/api/edificios-condominios")]
        [Produces(typeof(AllEdificiosReturn))]
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
                var listaEdificios = await _repo.GetAllEdificiosAtivosAsync(Ativos);
                var listaId = new List<long>();
                var listaNome = new List<string>();
                var listaZelador = new List<string>();
                var listaTelefone1 = new List<string>();
                var listaTelefone2 = new List<string>();
                var listaCelular1 = new List<string>();
                var listaCelular2 = new List<string>();
                var listaReferencia = new List<string>();
                var listaFlagAtivo = new List<bool>();
                //var listaEndereco = new List<string>();
                var listaEnderecos = new List<Endereco>();
                var retorno = new AllEdificiosReturn();

                foreach (var item in listaEdificios)
                {
                    listaId.Add(item.Id);
                    listaNome.Add(item.Nome);
                    listaZelador.Add(item.Zelador);
                    listaTelefone1.Add(item.Telefone1);
                    listaTelefone2.Add(item.Telefone2);
                    listaCelular1.Add(item.Celular1);
                    listaCelular2.Add(item.Celular1);
                    listaReferencia.Add(item.Referencia);
                    listaFlagAtivo.Add(item.FlagAtivo);
                    //var enderecoCompleto = item.oEndereco.Logradouro + " " + item.oEndereco.Numero + ",Complemento: " + 
                    //    item.oEndereco.Complemento + ",Bairro: " + item.oEndereco.Bairro +",Cidade: " + item.oEndereco.Cidade + 
                    //    ",UF: " + item.oEndereco.UF + ",CEP: " + item.oEndereco.CEP;
                    //listaEndereco.Add(enderecoCompleto);
                    listaEnderecos.Add(item.oEndereco);
                }

                retorno.id = listaId;
                retorno.nome = listaNome;
                retorno.zelador = listaZelador;
                retorno.telefone1 = listaTelefone1;
                retorno.telefone2 = listaTelefone2;
                retorno.celular1 = listaCelular1;
                retorno.celular2 = listaCelular2;
                retorno.referencia = listaReferencia;
                //retorno.endereco = listaEndereco;
                retorno.enderecos = listaEnderecos;
                retorno.flagAtivo = listaFlagAtivo;

                return Ok(retorno);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Ocorreu um erro no banco de Dados.{ex.Message}");
            }
        }

        [HttpGet("GetById")]
        [Produces(typeof(Edificio))]
        public async Task<IActionResult> Get(string Token, long EdificioId, bool? Ativos = true)
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
                var listaEdificios = await _repo.GetEdificioByIdAsync(EdificioId);
                return Ok(listaEdificios);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Ocorreu um erro no banco de Dados.{ex.Message}");
            }
        }

        [HttpGet("fotos-edificio")]
        [Produces(typeof(FotosEdificioReturn))]
        public async Task<IActionResult> Get(string Token, long edificioId)
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
                var listaEdificios = await _repo.GetAllEdificiosAsync();
                var listaFotoEdificio = await _repo.GetFotosEdificioByIdAsync(edificioId);
                var listaFotoAreaEdificio = await _repo.GetFotosAreaEdificioByIdAsync(edificioId);
                var listaFotoPlantaEdificio = await _repo.GetFotosPlantaEdificioByIdAsync(edificioId);
                var retorno = new FotosEdificioReturn
                {
                    FotosEdificio = listaFotoEdificio.ToList(),
                    FotosAreaEdificio = listaFotoAreaEdificio.ToList(),
                    FotosPlantaEdificio = listaFotoPlantaEdificio.ToList()
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
        [Produces(typeof(Edificio))]
        public async Task<IActionResult> Post(Edificio model, string Token)
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
                var Edificio = await _repo.GetEdificioByNameAsync(model.Nome);
                if (Edificio != null)
                {
                    return this.StatusCode(StatusCodes.Status401Unauthorized, "Parceiro ja existe.");
                }
                _repo.Add(model);
                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/Edificios/GetById/{model.Id}", model);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou.{ex.Message}");
            }
            return BadRequest();
        }

        [HttpPut]
        public async Task<IActionResult> Put(Edificio model, string Token)
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
                var Edificio = await _repo.GetEdificioByIdAsync(model.Id);
                if (Edificio == null) return NotFound();

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
        [HttpPut("fotos-edificio-ordem")]
        public async Task<IActionResult> Put(FotoEdificioUpdate model, string Token)
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
                if (model.TipoFoto == 1) //Edificio
                {
                    var fotos = await _repo.GetFotosEdificioByIdAsync(model.EdficioId);
                    if (fotos.Count() <= 0) return NoContent();
                    var foto = fotos.Where(x => x.Id == model.FotoId).FirstOrDefault();
                    foto.Ordem = model.Ordem;
                    _repo.Update(foto);
                }
                else if (model.TipoFoto == 4) //Area
                {
                    var fotos = await _repo.GetFotosAreaEdificioByIdAsync(model.EdficioId);
                    if (fotos.Count() <= 0) return NoContent();
                    var foto = fotos.Where(x => x.Id == model.FotoId).FirstOrDefault();
                    foto.Ordem = model.Ordem;
                    _repo.Update(foto);
                }
                else if (model.TipoFoto == 5) //Planta
                {
                    var fotos = await _repo.GetFotosPlantaEdificioByIdAsync(model.EdficioId);
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
        public async Task<IActionResult> Delete(long EdificioId, string Token)
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
                var Edificio = await _repo.GetEdificioByIdAsync(EdificioId);
                if (Edificio == null) return NotFound();

                Edificio.FlagAtivo = false;
                _repo.Update(Edificio);

                await _repo.SaveChangesAsync();
                var Imoveis = await _repo.GetAllImoveisByEdificioIdAsync(Edificio.Id);
                foreach (var imovel in Imoveis)
                {
                    imovel.FlagAtivo = false;
                    _repo.Update(imovel);
                    await _repo.SaveChangesAsync();
                }
                return Ok();
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou. {ex.Message}");
            }
        }

        [HttpDelete("edificios-fotos-delete")]
        public async Task<IActionResult> Delete(FotoEdificioDelete model, string Token)
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
                if (model.TipoFoto == 1) //Edificio
                {
                    var fotos = await _repo.GetFotosEdificioByIdAsync(model.EdficioId);
                    if (fotos.Count() <= 0) return NoContent();
                    var foto = fotos.Where(x => x.Id == model.FotoId).FirstOrDefault();
                    _repo.Delete(foto);
                }
                else if (model.TipoFoto == 4) //Area
                {
                    var fotos = await _repo.GetFotosAreaEdificioByIdAsync(model.EdficioId);
                    if (fotos.Count() <= 0) return NoContent();
                    var foto = fotos.Where(x => x.Id == model.FotoId).FirstOrDefault();
                    _repo.Delete(foto);
                }
                else if (model.TipoFoto == 5) //Planta
                {
                    var fotos = await _repo.GetFotosPlantaEdificioByIdAsync(model.EdficioId);
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