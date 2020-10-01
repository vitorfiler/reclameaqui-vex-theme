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
    public class ControlaArquivoXMLController : ControllerBase
    {
        private readonly ISmartImoveisRepository _repo;
        private readonly IConfiguration _config;

        public ControlaArquivoXMLController(ISmartImoveisRepository smartImoveisRepository, IConfiguration config)
        {
            _repo = smartImoveisRepository;
            _config = config;
        }

        #region "GET"
        [HttpGet]
        [Produces(typeof(ControleArquivoXML[]))]
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
                var Clientes = await _repo.GetAllControleAquivoXMLAsync();
                if (Clientes.Count() == 0)
                    return NoContent();
                return Ok(Clientes);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Ocorreu um erro no banco de Dados.{ex.Message}");
            }
        }
        #endregion
        
    }
}