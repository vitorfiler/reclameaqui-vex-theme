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
    public class LoginController : ControllerBase
    {
        private readonly ISmartImoveisRepository _repo;
        private readonly IConfiguration _config;

        public LoginController(ISmartImoveisRepository smartImoveisRepository, IConfiguration config)
        {
            _repo = smartImoveisRepository;
            _config = config;
        }
        #region "GET"
        [HttpGet]
        [Produces(typeof(Vendedor))]
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
                var Clientes = await _repo.GetAllVendedoresAsync();
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
        [HttpPost("logar")]
        [Produces(typeof(Vendedor))]
        public async Task<IActionResult> Post(PostLogin model)
        {
            var TokenApi = new Token
            {
                TokenDef = _config.GetValue<string>("Token:TokenDef")
            };
            try
            {
                var login = await _repo.GetVendedorByUserAsync(model.Usuario);
                if (login == null) return NotFound();
                if (login.Senha == model.Senha)
                {
                    login.Token = TokenApi.TokenDef;
                    return this.StatusCode(StatusCodes.Status200OK, login);
                }
                else
                {
                    return this.StatusCode(StatusCodes.Status401Unauthorized, "Senha invalida");
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou.{ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Vendedor model, string Token)
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
                var login = _repo.GetVendedorByUserAsync(model.Usuario);
                if (login.Result != null)
                {
                    return this.StatusCode(StatusCodes.Status401Unauthorized, "Usuario ja existe.");
                }
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
        public async Task<IActionResult> Put(Vendedor model, string Token)
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
                var xml = await _repo.GetVendedorByIdAsync(model.Id);
                if (xml == null) return NotFound();

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
        #endregion
        [HttpDelete]
        public async Task<IActionResult> Delete(long VendedorId, string Token)
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
                var evento = await _repo.GetVendedorByIdAsync(VendedorId);
                if (evento == null) return NotFound();

                _repo.Delete(evento);

                if (await _repo.SaveChangesAsync())
                {
                    return Ok();
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou. {ex.Message}");
            }
            return BadRequest();
        }
    }
}