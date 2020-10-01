using ReclameAquiWebAPI.Model;
using ReclameAquiWebAPI.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace ReclameAquiWebAPI.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class EmpresaController : ControllerBase
    {
        private readonly IReclameAquiRepository _repo;
        private readonly IConfiguration _config;
        public EmpresaController(IReclameAquiRepository reclameAquiRepository, IConfiguration config)
        {
            _repo = reclameAquiRepository;
            _config = config;
        }
        #region "GET"
        [HttpGet]
        [Produces(typeof(Empresa))]
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
                var Empresas = await _repo.GetAllEmpresasAsync();
                if (Empresas.Count() == 0)
                    return NoContent();
                return Ok(Empresas);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Ocorreu um erro no banco de Dados.{ex.Message}");
            }
        }

        [HttpGet("{EmpresaId}")]
        [Produces(typeof(Empresa))]
        public async Task<IActionResult> Get(int EmpresaId, string Token)
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
                var Empresas = await _repo.GetAllEmpresasByIdAsync(EmpresaId);
                if (Empresas == null || Empresas.Id == 0)
                    return NoContent();
                return Ok(Empresas);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Ocorreu um erro no banco de Dados.{ex.Message}");
            }
        }

        [HttpGet("getAllByNome/{nomeEmpresas}")]
        [Produces(typeof(Empresa))]
        public async Task<IActionResult> Get(string nomeEmpresas, string Token)
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
                var Empresas = await _repo.GetAllEmpresasByNomeAsync(nomeEmpresas);
                if (Empresas == null || Empresas.Count() == 0)
                    return NoContent();
                return Ok(Empresas);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Ocorreu um erro no banco de Dados.{ex.Message}");
            }
        }

        
        #endregion

        #region "POST"
        [HttpPost]
        public async Task<IActionResult> Post(Empresa model, string Token)
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
                model.DataCadastro = null;
                _repo.Add(model);
                if (await _repo.SaveChangesAsync())
                {
                    return Created($"api/Empresa/{model.Id}", model);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou.{ex.Message}");
            }
            return BadRequest();
        }

        [HttpPut]
        public async Task<IActionResult> Put(int EmpresaId, Empresa model, string Token)
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
                model.Id = EmpresaId;
                var evento = await _repo.GetAllEmpresasByIdAsync(EmpresaId);
                if (evento == null) return NotFound();

                _repo.Update(model);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"api/Empresa/{model.Id}", model);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou.{ex.Message}");
            }
            return BadRequest();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int EmpresaId, string Token)
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
                var evento = await _repo.GetAllEmpresasByIdAsync(EmpresaId);
                if (evento == null) return NotFound();

                _repo.Delete(evento);
                
                if (await _repo.SaveChangesAsync())
                {
                    return Ok();
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