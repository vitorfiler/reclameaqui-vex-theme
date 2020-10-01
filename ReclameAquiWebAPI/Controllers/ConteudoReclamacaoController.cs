using ReclameAquiWebAPI.Model;
using ReclameAquiWebAPI.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using System;

namespace ReclameAquiWebAPI.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class ConteudoReclamacaoController : ControllerBase
    {
        private readonly IReclameAquiRepository _repo;
        //Duan
        private readonly IConfiguration _config;
                                                                                          //Duan add a ICon....
        public ConteudoReclamacaoController(IReclameAquiRepository reclameAquiRepository, IConfiguration config) //Duan
        {
            _repo = reclameAquiRepository;
            _config = config; //Duan
        }


        #region "GET"
        [HttpGet("/api/respostas/{ReclamacaoId}")]
        [Produces(typeof(RespostaRetorno))]
        public async Task<IActionResult> Get(long ReclamacaoId, string Token)
        {
            //Duan - Inicio
            var TokenApi = new Token
            {
                TokenDef = _config.GetValue<string>("Token:TokenDef")

            };
            if (TokenApi.TokenDef != Token)
            {
                return this.StatusCode(StatusCodes.Status401Unauthorized, $"O Token informado não é autorizado.");
            }
            //Duan - Fim
            try
            {
                var conteudo = await _repo.GetAllContRecByReclamacaoIdAsync(ReclamacaoId);
                if (conteudo == null)
                    return NoContent();

                var lRetorno = new List<Resposta>();

                foreach (var item in conteudo)
                {
                    if (item.FlagCliente)
                    {
                        lRetorno.Add(new Resposta
                        {
                            fotoPerfil = item.Reclamacao.Cliente.FotoPerfil,
                            horaResposta = item.DataSave.ToString("dd/MM/yyyy HH:mm:ss"),
                            nomePerfil = item.Reclamacao.Cliente.Nome,
                            textoResposta = item.Conteudo
                        });
                    }
                    else
                    {
                        lRetorno.Add(new Resposta
                        {
                            fotoPerfil = item.Reclamacao.Empresa.FotoPerfil,
                            horaResposta = item.DataSave.ToString("dd/MM/yyyy HH:mm:ss"),
                            nomePerfil = item.Reclamacao.Empresa.Nome,
                            textoResposta = item.Conteudo
                        });
                    }
                }
                var retorno = new RespostaRetorno();
                retorno.Respostas = lRetorno;
                return Ok(retorno);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Ocorreu um erro no banco de Dados.{ex.Message}");
            }
        }
        #endregion


        [HttpPost("Save")]
        public async Task<IActionResult> Post(CounteudoSave model, string Token)
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
                var conteudo = new ConteudoReclamacao();
                conteudo.Conteudo = model.Conteudo;
                conteudo.FlagCliente = model.FlagCliente;
                conteudo.ReclamacaoId = model.ReclamacaoId;
                conteudo.DataSave = DateTime.Now;

                _repo.Add(conteudo);
                if (await _repo.SaveChangesAsync())
                {
                    return Ok(conteudo);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou.{ex.Message}");
            }
            return BadRequest();
        }
    }
}
