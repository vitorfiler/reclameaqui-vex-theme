using ReclameAquiWebAPI.Model;
using ReclameAquiWebAPI.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System;
using Microsoft.Extensions.Configuration;

namespace ReclameAquiWebAPI.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IReclameAquiRepository _repo;
        private readonly IConfiguration _config;
        public LoginController(IReclameAquiRepository reclameAquiRepository, IConfiguration config)
        {
            _repo = reclameAquiRepository;
            _config = config;
        }
        #region "GET"

        #endregion

        #region "POST"
        [HttpPost]
        public async Task<IActionResult> Post(Login model, string Token)
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
                //Regra de Usu�rio j� existente
                var login = _repo.GetLoginByUserAsync(model.Usuario);
                if (login.Result != null)
                {
                    return this.StatusCode(StatusCodes.Status401Unauthorized, "Usuario ja existe.");
                }
                //Regra de perfil
                if(model.Perfil != 1 && model.Perfil != 2)
                {
                    return this.StatusCode(StatusCodes.Status401Unauthorized, "Perfil Invalido, favor informar (1) Cliente ou (2) Empresa.");
                }
                //Regra para jSon com clientId e EmpresaId preenchido
                if (model.ClienteId >0 && model.EmpresaId > 0)
                {
                    return this.StatusCode(StatusCodes.Status401Unauthorized, "Nao foi possivel inserir o usuario, favor informar apenas ClienteId ou EmpresaId.");
                }


                if (model.ClienteId == 0 || model.ClienteId == null)
                {
                    model.ClienteId = null;
                }
                else
                {
                    //regra para validar se cliente existe na base
                    var cliente = _repo.GetAllClientesByIdAsync(model.ClienteId ?? 0);
                    if (cliente.Result == null)
                    {
                        return this.StatusCode(StatusCodes.Status401Unauthorized, "Cliente nao existe na base de dados.");
                    }
                }
                if (model.EmpresaId == 0 || model.ClienteId == null)
                {
                    model.EmpresaId = null;
                }
                else
                {
                    //regra para validar se Empresa existe na base
                    var empresa = _repo.GetAllEmpresasByIdAsync(model.EmpresaId ?? 0);
                    if (empresa.Result == null)
                    {
                        return this.StatusCode(StatusCodes.Status401Unauthorized, "Empresa nao existe na base de dados.");
                    }
                }

                _repo.Add(model);
                if (await _repo.SaveChangesAsync())
                {
                    return Created($"api/Logins/{model.Id}", model);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou.{ex.Message}");
            }
            return BadRequest();
        }

        [HttpPost("logar")]
        public async Task<IActionResult> Post(PostLogin model, string Token)
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
                var login = await _repo.GetLoginByUserAsync(model.Usuario);
                if (login == null) return NotFound();
                if (login.Senha == model.Senha)
                {
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


        [HttpPut]
        public async Task<IActionResult> Put(long LoginId, Login model, string Token)
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
                model.Id = LoginId;
                var evento = await _repo.GetLoginByIdAsync(LoginId);
                if (evento == null) return NotFound();

                _repo.Update(model);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"api/Logins/{model.Id}", model);
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