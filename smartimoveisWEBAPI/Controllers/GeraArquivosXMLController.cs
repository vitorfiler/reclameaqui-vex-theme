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
using System.Threading;

namespace ReclameAquiWebAPI.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class GeraArquivosXMLController : ControllerBase
    {
        private readonly ISmartImoveisRepository _repo;
        private readonly IConfiguration _config;

        public GeraArquivosXMLController(ISmartImoveisRepository smartImoveisRepository, IConfiguration config)
        {
            _repo = smartImoveisRepository;
            _config = config;
        }
        #region "GET"
        [HttpGet]
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
                var controleArquivosXml = await _repo.GetAllControleAquivoXMLAsync();
                var parceiros = await _repo.GetAllParceirosAsync();

                foreach (var parceiro in parceiros)
                {
                    var controle = controleArquivosXml.Where(x => x.ParceiroId == parceiro.Id).FirstOrDefault();
                    if (controle != null)
                    {
                        controle.FlagArquivoXML = false;
                        controle.DataSolicitacao = DateTime.Now;
                        controle.Mensagem = $"Iniciado processo de criação do arquivo para o parceiro: {controle.oParceiro.Nome} na data: {DateTime.Now.ToString("dd/MM/yyyy")}.";
                        _repo.Update(controle);
                        await _repo.SaveChangesAsync();
                    }
                    else
                    {
                        var controleNew = new ControleArquivoXML();
                        controleNew.ParceiroId = parceiro.Id;
                        controleNew.FlagArquivoXML = false;
                        controleNew.DataSolicitacao = DateTime.Now;
                        controleNew.Mensagem = $"Iniciado processo de criação do arquivo para o parceiro: {parceiro.Nome} na data: {DateTime.Now.ToString("dd/MM/yyyy")}.";
                        _repo.Add(controleNew);
                        await _repo.SaveChangesAsync();
                    }
                }

                Thread thread = new Thread(GeraArquivosXML);
                thread.Start();

                return this.StatusCode(StatusCodes.Status200OK);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Ocorreu um erro no banco de Dados.{ex.Message}");
            }
        }

        private void GeraArquivosXML()
        {
        }
        #endregion
    }
}