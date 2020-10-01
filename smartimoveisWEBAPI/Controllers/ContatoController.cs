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
    public class ContatoController : ControllerBase
    {
        private readonly ISmartImoveisRepository _repo;
        private readonly IConfiguration _config;

        public ContatoController(ISmartImoveisRepository smartImoveisRepository, IConfiguration config)
        {
            _repo = smartImoveisRepository;
            _config = config;
        }

        #region "GET"
        [HttpGet]
        [Produces(typeof(Contato[]))]
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
                var Clientes = await _repo.GetAllContatosAsync();
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

        #region "POST"
       

        [HttpPost]
        public async Task<IActionResult> Post(Contato model, string Token)
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
                    return this.StatusCode(StatusCodes.Status200OK, model);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou.{ex.Message}");
            }
            return BadRequest();
        }

        [HttpPut("atualiza-status")]
        public async Task<IActionResult> Put(ContatoStatusUpdate model, string Token)
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
                var contato = await _repo.GetContatoByIdAsync(model.contatoId);
                if (contato == null) return NotFound();
                contato.Status = model.status;
                _repo.Update(contato);

                if (await _repo.SaveChangesAsync())
                {
                    return this.StatusCode(StatusCodes.Status200OK, contato);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou.{ex.Message}");
            }
            return BadRequest();
            #endregion
        }
    }
}