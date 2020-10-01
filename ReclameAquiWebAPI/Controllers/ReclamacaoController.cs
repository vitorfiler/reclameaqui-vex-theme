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
    public class ReclamacaoController : ControllerBase
    {
        private readonly IReclameAquiRepository _repo;
        private readonly IConfiguration _config;
        public ReclamacaoController(IReclameAquiRepository reclameAquiRepository, IConfiguration config)
        {
            _repo = reclameAquiRepository;
            _config = config;
        }


        #region "GET"
        [HttpGet]
        [Produces(typeof(reclamacaoConsumidorReturn))]
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

                var conteudo = await _repo.Get10ReclamacaoAsync();

                if (conteudo == null)
                    return NoContent();

                var listaRetorno = new List<reclamacaoEmpresa>();
                var listaStatusId = new List<string>();
                var listaStatus = new List<string>();
                var listaTitulo = new List<string>();
                var listaTempo = new List<string>();
                var listaBody = new List<string>();
                var listaIdReclamacao = new List<string>();
                var listaEmpresa = new List<string>();
                var listaFoto = new List<string>();
                var listaNomeReclamante = new List<string>();
                var listaStatusCor = new List<string>();
                var listaArquivos = new ListArquivos();
                listaArquivos.Arquivos = new List<ArquivoInd>();
                var listaNomeArquivos = new ListNomeArquivos();
                listaNomeArquivos.NomeArquivos = new List<NomeArquivoInd>();
                foreach (var item in conteudo)
                {
                    var arquivos = await _repo.GetAllArquivoByReclamacaoIdAsync(item.Id);
                    var arquivosFinal = new ArquivoInd();
                    arquivosFinal.Arquivo = new List<string>();
                    var arquivosNomeFinal = new NomeArquivoInd();
                    arquivosNomeFinal.NomeArquivo = new List<string>();
                    foreach (var itemArquivo in arquivos)
                    {
                        arquivosFinal.Arquivo.Add(itemArquivo.CaminhoArquivo.Replace("\\","/"));
                        arquivosNomeFinal.NomeArquivo.Add(itemArquivo.NomeArquivo);
                    }
                    if (arquivosFinal.Arquivo.Count > 0) listaArquivos.Arquivos.Add(arquivosFinal);
                    else listaArquivos.Arquivos.Add(null);
                    if (arquivosNomeFinal.NomeArquivo.Count > 0) listaNomeArquivos.NomeArquivos.Add(arquivosNomeFinal);
                    else listaNomeArquivos.NomeArquivos.Add(null);
                    listaStatusId.Add(item.StatusId.ToString());
                    listaStatus.Add(_repo.RetornaStatus(item.StatusId));
                    listaTitulo.Add(item.Titulo);
                    listaStatusCor.Add(_repo.RetornaStatusCor(item.StatusId));
                    listaEmpresa.Add(item.Empresa.Nome);
                    listaTempo.Add(item.DataAbertura.ToString("dd/MM/yyyy HH:mm:ss"));
                    listaIdReclamacao.Add(item.Id.ToString());
                    listaNomeReclamante.Add(item.Cliente.Nome);
                    listaFoto.Add(item.Empresa.FotoPerfil);
                    var conteudoReclamacao = await _repo.GetAllContRecByReclamacaoIdAsync(item.Id);
                    if (conteudoReclamacao.Count() > 0)
                    {
                        listaBody.Add(conteudoReclamacao.Last().Conteudo);
                    }
                    else listaBody.Add("");
                }
                var retorno = new reclamacaoConsumidorReturn();
                var objReclamacoes = new reclamacaoConsumidor
                {
                    body = listaBody,
                    id = listaIdReclamacao,
                    status = listaStatus,
                    statusId = listaStatusId,
                    tempoDecorrido = listaTempo,
                    tituloReclamacao = listaTitulo,
                    nomeReclamante = listaNomeReclamante,
                    empresa = listaEmpresa,
                    urlFoto = listaFoto,
                    data = listaTempo,
                    statusCor = listaStatusCor,
                    listaArquivos = listaArquivos,
                    listaNomeArquivos = listaNomeArquivos
                };
                var listaRetornoFinal = new List<reclamacaoConsumidor>();
                listaRetornoFinal.Add(objReclamacoes);
                retorno.Reclamacoes = listaRetornoFinal;

                return Ok(retorno);

            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Ocorreu um erro no banco de Dados. EX: {ex.Message}");
            }
        }

        [HttpGet("/api/reclamacoes-empresa/")]
        [Produces(typeof(reclamacaoEmpresaReturn))]
        public async Task<IActionResult> Get(long empresaId, long statusId, string Token)
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
                if (empresaId == 0)
                {
                    return this.StatusCode(StatusCodes.Status400BadRequest, "Favor informar o EmpresaId Correto.");
                }
                var conteudo = await _repo.GetReclamacaoByEmpDateAddAsync(empresaId, statusId);

                if (conteudo == null)
                    return NoContent();

                var listaRetorno = new List<reclamacaoEmpresa>();
                var listaStatusId = new List<string>();
                var listaStatus = new List<string>();
                var listaStatusCor = new List<string>();
                var listaTitulo = new List<string>();
                var listaTempo = new List<string>();
                var listaBody = new List<string>();
                var listaIdReclamacao = new List<string>();
                var listaFoto = new List<string>();
                var listaNomeReclamante = new List<string>();
                var listaArquivos = new ListArquivos();
                listaArquivos.Arquivos = new List<ArquivoInd>();
                var listaNomeArquivos = new ListNomeArquivos();
                listaNomeArquivos.NomeArquivos = new List<NomeArquivoInd>();
                foreach (var item in conteudo)
                {
                    var arquivos = await _repo.GetAllArquivoByReclamacaoIdAsync(item.Id);
                    var arquivosFinal = new ArquivoInd();
                    arquivosFinal.Arquivo = new List<string>();
                    var arquivosNomeFinal = new NomeArquivoInd();
                    arquivosNomeFinal.NomeArquivo = new List<string>();
                    foreach (var itemArquivo in arquivos)
                    {
                        arquivosFinal.Arquivo.Add(itemArquivo.CaminhoArquivo.Replace("\\","/"));
                        arquivosNomeFinal.NomeArquivo.Add(itemArquivo.NomeArquivo);
                        
                    }
                    if (arquivosFinal.Arquivo.Count > 0) listaArquivos.Arquivos.Add(arquivosFinal);
                    else listaArquivos.Arquivos.Add(null);
                    if (arquivosNomeFinal.NomeArquivo.Count > 0) listaNomeArquivos.NomeArquivos.Add(arquivosNomeFinal);
                    else listaNomeArquivos.NomeArquivos.Add(null);
                    listaStatusId.Add(item.StatusId.ToString());
                    listaStatus.Add(_repo.RetornaStatus(item.StatusId));
                    listaStatusCor.Add(_repo.RetornaStatusCor(item.StatusId));
                    listaTitulo.Add(item.Titulo);
                    listaNomeReclamante.Add(item.Cliente.Nome);
                    listaTempo.Add(item.DataAbertura.ToString("dd/MM/yyyy HH:mm:ss"));
                    listaIdReclamacao.Add(item.Id.ToString());
                    listaFoto.Add(item.Cliente.FotoPerfil);
                    var conteudoReclamacao = await _repo.GetAllContRecByReclamacaoIdAsync(item.Id);
                    if (conteudoReclamacao.Count() > 0)
                    {
                        listaBody.Add(conteudoReclamacao.Last().Conteudo);
                    }
                    else listaBody.Add("");
                }
                var retorno = new reclamacaoEmpresaReturn();
                var objReclamacoes = new reclamacaoEmpresa
                {
                    body = listaBody,
                    idReclamacao = listaIdReclamacao,
                    status = listaStatus,
                    statusId = listaStatusId,
                    nomeReclamante = listaNomeReclamante,
                    tempoDecorrido = listaTempo,
                    titulo = listaTitulo,
                    urlFoto = listaFoto,
                    statusCor = listaStatusCor,
                    listaArquivos = listaArquivos,
                    listaNomeArquivos = listaNomeArquivos
                };
                var listaRetornoFinal = new List<reclamacaoEmpresa>();
                listaRetornoFinal.Add(objReclamacoes);
                retorno.Reclamacoes = listaRetornoFinal;

                return Ok(retorno);

            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Ocorreu um erro no banco de Dados. EX: {ex.Message}");
            }
        }

        [HttpGet("/api/reclamacoes-consumidor/")]
        [Produces(typeof(reclamacaoConsumidorReturn))]
        public async Task<IActionResult> Get(long clienteId, int sstatusId, string Token)
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
                long statusId = sstatusId;
                if (clienteId == 0)
                {
                    return this.StatusCode(StatusCodes.Status400BadRequest, "Favor informar o ClienteId Correto.");
                }
                var conteudo = await _repo.GetReclamacaoByClienteIdAsync(clienteId, statusId);

                if (conteudo == null)
                    return NoContent();

                var listaRetorno = new List<reclamacaoEmpresa>();
                var listaStatusId = new List<string>();
                var listaStatus = new List<string>();
                var listaTitulo = new List<string>();
                var listaTempo = new List<string>();
                var listaBody = new List<string>();
                var listaIdReclamacao = new List<string>();
                var listaEmpresa = new List<string>();
                var listaFoto = new List<string>();
                var listaNomeReclamante = new List<string>();
                var listaStatusCor = new List<string>();
                var listaArquivos = new ListArquivos();
                listaArquivos.Arquivos = new List<ArquivoInd>();
                var listaNomeArquivos = new ListNomeArquivos();
                listaNomeArquivos.NomeArquivos = new List<NomeArquivoInd>();
                foreach (var item in conteudo)
                {
                    var arquivos = await _repo.GetAllArquivoByReclamacaoIdAsync(item.Id);
                    var arquivosFinal = new ArquivoInd();
                    arquivosFinal.Arquivo = new List<string>();
                    var arquivosNomeFinal = new NomeArquivoInd();
                    arquivosNomeFinal.NomeArquivo = new List<string>();
                    foreach (var itemArquivo in arquivos)
                    {
                        arquivosFinal.Arquivo.Add(itemArquivo.CaminhoArquivo.Replace("\\","/"));
                        arquivosNomeFinal.NomeArquivo.Add(itemArquivo.NomeArquivo);
                    }
                    if (arquivosFinal.Arquivo.Count > 0) listaArquivos.Arquivos.Add(arquivosFinal);
                    else listaArquivos.Arquivos.Add(null);
                    if (arquivosNomeFinal.NomeArquivo.Count > 0) listaNomeArquivos.NomeArquivos.Add(arquivosNomeFinal);
                    else listaNomeArquivos.NomeArquivos.Add(null);
                    listaStatusId.Add(item.StatusId.ToString());
                    listaStatus.Add(_repo.RetornaStatus(item.StatusId));
                    listaTitulo.Add(item.Titulo);
                    listaStatusCor.Add(_repo.RetornaStatusCor(item.StatusId));
                    listaEmpresa.Add(item.Empresa.Nome);
                    listaTempo.Add(item.DataAbertura.ToString("dd/MM/yyyy HH:mm:ss"));
                    listaIdReclamacao.Add(item.Id.ToString());
                    listaNomeReclamante.Add(item.Cliente.Nome);
                    listaFoto.Add(item.Empresa.FotoPerfil);
                    var conteudoReclamacao = await _repo.GetAllContRecByReclamacaoIdAsync(item.Id);
                    if (conteudoReclamacao.Count() > 0)
                    {
                        listaBody.Add(conteudoReclamacao.Last().Conteudo);
                    }
                    else listaBody.Add("");
                }
                var retorno = new reclamacaoConsumidorReturn();
                var objReclamacoes = new reclamacaoConsumidor
                {
                    body = listaBody,
                    id = listaIdReclamacao,
                    status = listaStatus,
                    statusId = listaStatusId,
                    tempoDecorrido = listaTempo,
                    tituloReclamacao = listaTitulo,
                    nomeReclamante = listaNomeReclamante,
                    empresa = listaEmpresa,
                    urlFoto = listaFoto,
                    data = listaTempo,
                    statusCor = listaStatusCor,
                    listaArquivos = listaArquivos,
                    listaNomeArquivos = listaNomeArquivos
                };
                var listaRetornoFinal = new List<reclamacaoConsumidor>();
                listaRetornoFinal.Add(objReclamacoes);
                retorno.Reclamacoes = listaRetornoFinal;

                return Ok(retorno);

            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Ocorreu um erro no banco de Dados. EX: {ex.Message}");
            }
        }
        #endregion


        #region "POST"
        [HttpPost]
        public async Task<IActionResult> Post(Reclamacao model, string Token)
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
                model.DataAbertura = DateTime.Now;
                _repo.Add(model);
                if (await _repo.SaveChangesAsync())
                {
                    return Created($"api/Reclamacao/{model.Id}", model);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou.{ex.Message}");
            }
            return BadRequest();
        }

        [HttpPost("Conteudo")]
        public async Task<IActionResult> Post(ConteudoReclamacao model, string Token)
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
                model.Reclamacao.DataAbertura = DateTime.Now;
                _repo.Add(model);
                if (await _repo.SaveChangesAsync())
                {
                    return Created($"api/Reclamacao/Conteudo/{model.ReclamacaoId}", model.ReclamacaoId);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou.{ex.Message}");
            }
            return BadRequest();
        }

        [HttpPut("/api/alteraStatusReclamacao/")]
        public async Task<IActionResult> Put(long ReclamacaoId, long StatusId, string Token)
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
                var reclamacao = await _repo.GetReclamacaoByIdAsync(ReclamacaoId);
                if (reclamacao == null) return NotFound();
                reclamacao.StatusId = StatusId;
                reclamacao.Status = null;
                _repo.Update(reclamacao);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"api/Reclamacao/{reclamacao.Id}", reclamacao);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou.{ex.Message}");
            }
            return BadRequest();
        }

        #endregion

    }
}
