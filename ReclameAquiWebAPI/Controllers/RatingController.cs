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
    public class RatingController : ControllerBase
    {
        private readonly IReclameAquiRepository _repo;
        private readonly IConfiguration _config;
        public RatingController(IReclameAquiRepository reclameAquiRepository, IConfiguration config)
        {
            _repo = reclameAquiRepository;
            _config = config;
        }

        #region "GET"
        [HttpGet("{categoriaId}")]
        [Produces(typeof(List<RatingRetono>))]
        public async Task<IActionResult> Post(long? categoriaId, string Token)
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
                if (categoriaId == null)
                {
                    return this.StatusCode(StatusCodes.Status400BadRequest, "Favor informar o código de parâmetro correto.");
                }

                if (categoriaId <= 0)
                {
                    return this.StatusCode(StatusCodes.Status400BadRequest, "Favor informar o código de parâmetro correto.");
                }

                var melhores = await _repo.GetAllMelhoresRatingByIdCategoriaAsync(categoriaId ?? 0);
                var lRatingRetono = new List<RatingRetono>();
                var oRatingRetorno = new RatingRetono();
                var listNome = new List<string>();
                var listFoto = new List<string>();
                var listPosicao = new List<string>();
                var listValor = new List<string>(); listFoto = new List<string>();
                int i = 1;
                foreach (var item in melhores)
                {
                    listNome.Add(item.Nome);
                    listFoto.Add(item.FotoEmp);
                    listPosicao.Add(i.ToString());
                    listValor.Add(Convert.ToInt64(item.NotaRating).ToString() + "%");
                    i++;
                }

                oRatingRetorno.dataAtualizacao = DateTime.Now.ToString("dd/MM/yyyy");
                oRatingRetorno.nome = listNome; oRatingRetorno.fotoEmpresa = listFoto;
                oRatingRetorno.fotoEmpresa = listNome;
                oRatingRetorno.posicao = listFoto;
                oRatingRetorno.valor = listValor;
                oRatingRetorno.ranking = "As Melhores";

                lRatingRetono.Add(oRatingRetorno);

                //return Ok(oRatingRetorno);
                var pioresRating = await _repo.GetAllPioresRatingIdCategoriaAsync(categoriaId ?? 0);
                oRatingRetorno = new RatingRetono();
                listNome = new List<string>();
                listPosicao = new List<string>();
                listValor = new List<string>(); listFoto = new List<string>();
                i = 1;
                foreach (var item in pioresRating)
                {
                    listNome.Add(item.Nome);
                    listPosicao.Add(i.ToString());
                    listValor.Add(Convert.ToInt64(item.NotaRating).ToString() + "%");
                    i++;
                }

                oRatingRetorno.dataAtualizacao = DateTime.Now.ToString("dd/MM/yyyy");
                oRatingRetorno.nome = listNome; oRatingRetorno.fotoEmpresa = listFoto;
                oRatingRetorno.posicao = listPosicao;
                oRatingRetorno.valor = listValor;
                oRatingRetorno.ranking = "As Piores";
                lRatingRetono.Add(oRatingRetorno);

                var maisReclamadas = await _repo.GetAllMaisReclamadasIdCategoriaAsync(categoriaId ?? 0);
                oRatingRetorno = new RatingRetono();
                listNome = new List<string>();
                listPosicao = new List<string>();
                listValor = new List<string>(); listFoto = new List<string>();
                i = 1;
                foreach (var item in maisReclamadas)
                {
                    listNome.Add(item.Nome);
                    listPosicao.Add(i.ToString());
                    listValor.Add(Convert.ToInt64(item.Quantidade).ToString());
                    i++;
                }

                oRatingRetorno.dataAtualizacao = DateTime.Now.ToString("dd/MM/yyyy");
                oRatingRetorno.nome = listNome; oRatingRetorno.fotoEmpresa = listFoto;
                oRatingRetorno.posicao = listPosicao;
                oRatingRetorno.valor = listValor;
                oRatingRetorno.ranking = "As + Reclamadas";
                lRatingRetono.Add(oRatingRetorno);


                return Ok(lRatingRetono);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Ocorreu um erro no banco de Dados.{ex.Message}");
            }
        }

        [HttpGet]
        [Produces(typeof(RankingsRetorno))]
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
                var melhores = await _repo.GetAllMelhoresSolucaoAsync();
                var oRetorno = new RankingsRetorno();
                var lRatingRetono = new List<RatingRetono>();
                var oRatingRetorno = new RatingRetono();
                var listNome = new List<string>();
                var listPosicao = new List<string>();
                var listValor = new List<string>();
                var listFoto = new List<string>();
                int i = 1;
                foreach (var item in melhores)
                {
                    listNome.Add(item.Nome);
                    listFoto.Add(item.FotoEmp);
                    listPosicao.Add(i.ToString());
                    listValor.Add(Convert.ToInt64(item.NotaSolucao).ToString() + "%");
                    i++;
                }

                oRatingRetorno.dataAtualizacao = DateTime.Now.ToString("dd/MM/yyyy");
                oRatingRetorno.nome = listNome; 
                oRatingRetorno.fotoEmpresa = listFoto;
                oRatingRetorno.posicao = listPosicao;
                oRatingRetorno.valor = listValor;
                oRatingRetorno.ranking = "Melhor índice de solução";

                lRatingRetono.Add(oRatingRetorno);

                var melhorIndice = await _repo.GetAllMelhorVoltarNegocioAsync();
                oRatingRetorno = new RatingRetono();
                listNome = new List<string>();
                listPosicao = new List<string>();
                listValor = new List<string>();
                listFoto = new List<string>();
                i = 1;
                foreach (var item in melhorIndice)
                {
                    listNome.Add(item.Nome);
                    listFoto.Add(item.FotoEmp);
                    listPosicao.Add(i.ToString());
                    listValor.Add(Convert.ToInt64(item.FlagVoltariaNegocios).ToString() + "%");
                    i++;
                }

                oRatingRetorno.dataAtualizacao = DateTime.Now.ToString("dd/MM/yyyy");
                oRatingRetorno.nome = listNome; 
                oRatingRetorno.fotoEmpresa = listFoto;
                oRatingRetorno.posicao = listPosicao;
                oRatingRetorno.valor = listValor;
                oRatingRetorno.ranking = "Melhores Índices de Voltar a Fazer Negócios";
                lRatingRetono.Add(oRatingRetorno);

                var maisReclamadas = await _repo.GetAllMelhoresRatingAsync();
                oRatingRetorno = new RatingRetono();
                listNome = new List<string>();
                listPosicao = new List<string>();
                listValor = new List<string>(); listFoto = new List<string>();
                i = 1;
                foreach (var item in maisReclamadas)
                {
                    listNome.Add(item.Nome);
                    listPosicao.Add(i.ToString());
                    listValor.Add((item.NotaRating / 10).ToString("0.00").Replace(",", "."));
                    i++;
                }

                oRatingRetorno.dataAtualizacao = DateTime.Now.ToString("dd/MM/yyyy");
                oRatingRetorno.nome = listNome; 
                oRatingRetorno.fotoEmpresa = listFoto;
                oRatingRetorno.posicao = listPosicao;
                oRatingRetorno.valor = listValor;
                oRatingRetorno.ranking = "Melhores notas médias";
                lRatingRetono.Add(oRatingRetorno);

                var maisResolveram = await _repo.GetAllMaisResolve30DAsync();
                oRatingRetorno = new RatingRetono();
                listNome = new List<string>();
                listPosicao = new List<string>();
                listValor = new List<string>(); 
                listFoto = new List<string>();
                i = 1;
                foreach (var item in maisResolveram)
                {
                    listNome.Add(item.Nome); listFoto.Add(item.FotoEmp);
                    listPosicao.Add(i.ToString());
                    listValor.Add(item.QuantidadeFechada);
                    i++;
                }

                oRatingRetorno.dataAtualizacao = DateTime.Now.ToString("dd/MM/yyyy");
                oRatingRetorno.nome = listNome; 
                oRatingRetorno.fotoEmpresa = listFoto;
                oRatingRetorno.posicao = listPosicao;
                oRatingRetorno.valor = listValor;
                oRatingRetorno.ranking = "Mais resolveram nos últimos 30 dias";
                lRatingRetono.Add(oRatingRetorno);

                var maisResolveram180 = await _repo.GetAllMaisResolve6MAsync();
                oRatingRetorno = new RatingRetono();
                listNome = new List<string>();
                listPosicao = new List<string>();
                listValor = new List<string>(); 
                listFoto = new List<string>();
                i = 1;
                foreach (var item in maisResolveram180)
                {
                    listNome.Add(item.Nome); 
                    listFoto.Add(item.FotoEmp);
                    listPosicao.Add(i.ToString());
                    listValor.Add(item.QuantidadeFechada);
                    i++;
                }

                oRatingRetorno.dataAtualizacao = DateTime.Now.ToString("dd/MM/yyyy");
                oRatingRetorno.nome = listNome; 
                oRatingRetorno.fotoEmpresa = listFoto;
                oRatingRetorno.posicao = listPosicao;
                oRatingRetorno.valor = listValor;
                oRatingRetorno.ranking = "Mais resolveram nos últimos 6 meses";
                lRatingRetono.Add(oRatingRetorno);

                var piorEmp30d = await _repo.GetAllPioresEmp30DAsync();
                oRatingRetorno = new RatingRetono();
                listNome = new List<string>();
                listPosicao = new List<string>();
                listValor = new List<string>(); 
                listFoto = new List<string>();
                i = 1;
                foreach (var item in piorEmp30d)
                {
                    listNome.Add(item.Nome); 
                    listFoto.Add(item.FotoEmp);
                    listPosicao.Add(i.ToString());
                    listValor.Add(item.Quantidade);
                    i++;
                }

                oRatingRetorno.dataAtualizacao = DateTime.Now.ToString("dd/MM/yyyy");
                oRatingRetorno.nome = listNome; 
                oRatingRetorno.fotoEmpresa = listFoto;
                oRatingRetorno.posicao = listPosicao;
                oRatingRetorno.valor = listValor;
                oRatingRetorno.ranking = "Piores empresas nos últimos 30 dias";
                lRatingRetono.Add(oRatingRetorno);

                var piorEmp180d = await _repo.GetAllPioresEmp6MAsync();
                oRatingRetorno = new RatingRetono();
                listNome = new List<string>();
                listPosicao = new List<string>();
                listValor = new List<string>(); 
                listFoto = new List<string>();
                i = 1;
                foreach (var item in piorEmp180d)
                {
                    listNome.Add(item.Nome); 
                    listFoto.Add(item.FotoEmp);
                    listPosicao.Add(i.ToString());
                    listValor.Add(item.Quantidade);
                    i++;
                }

                oRatingRetorno.dataAtualizacao = DateTime.Now.ToString("dd/MM/yyyy");
                oRatingRetorno.nome = listNome; 
                oRatingRetorno.fotoEmpresa = listFoto;
                oRatingRetorno.posicao = listPosicao;
                oRatingRetorno.valor = listValor;
                oRatingRetorno.ranking = "Mais reclamadas nos últimos 6 meses";
                lRatingRetono.Add(oRatingRetorno);

                var recemCad = await _repo.GetAllEmpRecemCadastradasDAsync();
                oRatingRetorno = new RatingRetono();
                listNome = new List<string>();
                listPosicao = new List<string>();
                listValor = new List<string>(); 
                listFoto = new List<string>();
                i = 1;
                foreach (var item in recemCad)
                {
                    listNome.Add(item.Nome); 
                    listFoto.Add(item.FotoEmp);
                    listPosicao.Add(i.ToString());
                    listValor.Add(item.Quantidade);
                    i++;
                }

                oRatingRetorno.dataAtualizacao = DateTime.Now.ToString("dd/MM/yyyy");
                oRatingRetorno.nome = listNome; 
                oRatingRetorno.fotoEmpresa = listFoto;
                oRatingRetorno.posicao = listPosicao;
                oRatingRetorno.valor = listValor;
                oRatingRetorno.ranking = "Empresas recém-cadastradas com mais reclamações";
                lRatingRetono.Add(oRatingRetorno);

                var lRankingQuantidade = new List<RankingQuantidade>();
                var oRankingQuantidade = new RankingQuantidade();

                var maisRecDia = await _repo.GetAllMaisReclamadasDiaDAsync();
                oRatingRetorno = new RatingRetono();
                listNome = new List<string>();
                listPosicao = new List<string>();
                listValor = new List<string>(); 
                listFoto = new List<string>();
                i = 1;
                var qtdReclamacao = await _repo.GetReclamacaoByDateAddAsync(0);
                foreach (var item in maisRecDia)
                {
                    oRankingQuantidade = new RankingQuantidade();
                    var listReclamaFiltro = qtdReclamacao.Where(x => x.EmpresaId == item.Id).ToList();
                    oRankingQuantidade.nome = item.Nome;
                    oRankingQuantidade.quantidade = listReclamaFiltro.Count();
                    oRankingQuantidade.fotoEmp = item.FotoEmp;
                    lRankingQuantidade.Add(oRankingQuantidade);
                }

                lRankingQuantidade = lRankingQuantidade.OrderByDescending(x => x.quantidade).ToList();

                foreach (var item in lRankingQuantidade)
                {
                    listNome.Add(item.nome); 
                    listFoto.Add(item.fotoEmp); 
                    listPosicao.Add(i.ToString());
                    listValor.Add(item.quantidade.ToString());
                    i++;
                }

                oRatingRetorno.dataAtualizacao = DateTime.Now.ToString("dd/MM/yyyy");
                oRatingRetorno.nome = listNome; 
                oRatingRetorno.fotoEmpresa = listFoto;
                oRatingRetorno.posicao = listPosicao;
                oRatingRetorno.valor = listValor;
                oRatingRetorno.ranking = "Mais Reclamadas do dia";
                lRatingRetono.Add(oRatingRetorno);

                var maisRecSemana = await _repo.GetAllMaisReclamadasSemanaDAsync();
                oRatingRetorno = new RatingRetono();
                listNome = new List<string>();
                listPosicao = new List<string>();
                listValor = new List<string>(); 
                listFoto = new List<string>();
                i = 1;
                qtdReclamacao = await _repo.GetReclamacaoByDateAddAsync(-7);
                lRankingQuantidade = new List<RankingQuantidade>();
                foreach (var item in maisRecSemana)
                {
                    oRankingQuantidade = new RankingQuantidade();
                    var listReclamaFiltro = qtdReclamacao.Where(x => x.EmpresaId == item.Id).ToList();
                    oRankingQuantidade.nome = item.Nome;
                    oRankingQuantidade.fotoEmp = item.FotoEmp;
                    oRankingQuantidade.quantidade = listReclamaFiltro.Count();
                    lRankingQuantidade.Add(oRankingQuantidade);
                }

                lRankingQuantidade = lRankingQuantidade.OrderByDescending(x => x.quantidade).ToList();

                foreach (var item in lRankingQuantidade)
                {
                    listNome.Add(item.nome); 
                    listFoto.Add(item.fotoEmp);
                    listPosicao.Add(i.ToString());
                    listValor.Add(item.quantidade.ToString());
                    i++;
                }

                oRatingRetorno.dataAtualizacao = DateTime.Now.ToString("dd/MM/yyyy");
                oRatingRetorno.nome = listNome; 
                oRatingRetorno.fotoEmpresa = listFoto;
                oRatingRetorno.posicao = listPosicao;
                oRatingRetorno.valor = listValor;
                oRatingRetorno.ranking = "Mais Reclamadas da semana";
                lRatingRetono.Add(oRatingRetorno);

                qtdReclamacao = await _repo.GetReclamacaoByDateAddAsync(-30);
                var maisRecMes = await _repo.GetAllMaisReclamadas30DAsync();
                oRatingRetorno = new RatingRetono();
                listNome = new List<string>();
                listPosicao = new List<string>();
                listValor = new List<string>(); 
                listFoto = new List<string>();
                i = 1;
                lRankingQuantidade = new List<RankingQuantidade>();
                foreach (var item in maisRecMes)
                {
                    oRankingQuantidade = new RankingQuantidade();
                    var listReclamaFiltro = qtdReclamacao.Where(x => x.EmpresaId == item.Id).ToList();
                    oRankingQuantidade.nome = item.Nome;
                    oRankingQuantidade.fotoEmp = item.FotoEmp;
                    oRankingQuantidade.quantidade = listReclamaFiltro.Count();
                    lRankingQuantidade.Add(oRankingQuantidade);
                }

                lRankingQuantidade = lRankingQuantidade.OrderByDescending(x => x.quantidade).ToList();

                foreach (var item in lRankingQuantidade)
                {
                    listNome.Add(item.nome); 
                    listFoto.Add(item.fotoEmp);
                    listPosicao.Add(i.ToString());
                    listValor.Add(item.quantidade.ToString());
                    i++;
                }

                oRatingRetorno.dataAtualizacao = DateTime.Now.ToString("dd/MM/yyyy");
                oRatingRetorno.nome = listNome; 
                oRatingRetorno.fotoEmpresa = listFoto;
                oRatingRetorno.posicao = listPosicao;
                oRatingRetorno.valor = listValor;
                oRatingRetorno.ranking = "Mais Reclamadas nos últimos 30 dias";
                lRatingRetono.Add(oRatingRetorno);
                oRetorno.Rankings = lRatingRetono;
                return Ok(oRetorno);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Ocorreu um erro no banco de Dados. EX: {ex.Message}");
            }
        }
        #endregion

        #region POST
        [HttpPost]
        public async Task<IActionResult> Post(Rating model, string Token)
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
                    return Ok(model);
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