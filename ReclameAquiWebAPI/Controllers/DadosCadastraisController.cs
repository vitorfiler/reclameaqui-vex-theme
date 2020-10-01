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
    public class DadosCadastraisController : ControllerBase
    {
        private readonly IReclameAquiRepository _repo;
        private readonly IConfiguration _config;
        public DadosCadastraisController(IReclameAquiRepository reclameAquiRepository, IConfiguration config)   

        {
            _repo = reclameAquiRepository;
            _config = config;
        }

        #region "POST"
        [HttpPost("Email")]
        public async Task<IActionResult> Post(int tipo, AtualizaEmail dados, string Token)
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
                if (tipo == 0) //cliente
                {
                    var dadosCliente = await _repo.GetAllClientesByIdAsync(dados.Id);
                    dadosCliente.Email = dados.Email;
                    _repo.Update(dadosCliente);

                    if (await _repo.SaveChangesAsync())
                    {
                        return Ok(dadosCliente);
                    }
                }
                else if(tipo == 1)// empresa
                {
                    var dadosEmpresa = await _repo.GetAllEmpresasByIdAsync(dados.Id);
                    dadosEmpresa.Email = dados.Email;
                    dadosEmpresa.Email2 = dados.Email2;
                    _repo.Update(dadosEmpresa);

                    if (await _repo.SaveChangesAsync())
                    {
                        return Ok(dadosEmpresa);
                    }
                }
               
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou.{ex.Message}");
            }
            return BadRequest();
        }

        [HttpPost("Password")]
        public async Task<IActionResult> Post(int tipo, AtualizaSenha dados, string Token)
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
                if (tipo == 0) //cliente
                {
                    var dadosCliente = await _repo.GetLoginByClienteIdAsync(dados.Id);
                    dadosCliente.Senha = dados.Password;
                    _repo.Update(dadosCliente);

                    if (await _repo.SaveChangesAsync())
                    {
                        return Ok(dadosCliente);
                    }
                }
                else if (tipo == 1)// empresa
                {
                    var dadosEmpresa = await _repo.GetLoginByEmpresaIdAsync(dados.Id);
                    dadosEmpresa.Senha = dados.Password;
                    _repo.Update(dadosEmpresa);

                    if (await _repo.SaveChangesAsync())
                    {
                        return Ok(dadosEmpresa);
                    }
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