using ReclameAquiWebAPI.Model;
using ReclameAquiWebAPI.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System;
using System.IO;
using System.Net.Http.Headers;
using Microsoft.Extensions.Configuration;
using System.Net;

namespace ReclameAquiWebAPI.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class ArquivosController : ControllerBase
    {
        private readonly IReclameAquiRepository _repo;

        private readonly IConfiguration _config;
        public ArquivosController(IReclameAquiRepository reclameAquiRepository, IConfiguration config)
        {
            _repo = reclameAquiRepository;

            _config = config;
        }

        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> Upload(string Token)
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
                var file = Request.Form.Files[0];
                var dict = Request.Form.ToDictionary(x => x.Key, x => x.Value.ToString());
                var tipoUpload = dict["TipoUpload"];
                var idReferencia = dict["IdReferencia"];

                var folderName = "";

                //var pathToSave = "C:\\Projetos\\reclameaqui\\ReclameAquiAdmin\\src\\assets";
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), "Resources");
                //var pathToSave = "C:\\Users\\evito\\projetos\\reclameaqui\\ReclameAquiAdmin\\src\\assets";
                string[] extensoesImagens = new string[] { ".jpg", ".png", ".jpeg" };
                string[] extensoesDocumentos = new string[] { ".doc", ".docx", ".xls", ".xlsx", ".pdf" };

                if (file.Length > 0)
                {
                    var tipoArquivo = 0;
                    var nameTipoArquivo = "";
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var extension = Path.GetExtension(fileName);
                    if (extensoesImagens.Contains(extension))
                    {
                        folderName = "Images";
                        tipoArquivo = 1;
                        nameTipoArquivo = DateTime.Now.ToString().Replace(":", "-").Replace(" ", "").Replace("/", "-") + "-IDR-" + idReferencia + "-TU-" + tipoUpload + "-TA-" + tipoArquivo + extension;
                    }
                    else if (extensoesDocumentos.Contains(extension))
                    {
                        folderName = "Documentos";
                        tipoArquivo = 2;
                        nameTipoArquivo = DateTime.Now.ToString().Replace(":", "-").Replace(" ", "").Replace("/", "-") + "-IDR-" + idReferencia + "-TU-" + tipoUpload + "-TA-" + tipoArquivo + extension;
                    }
                    else
                    {
                        folderName = "Arquivos";
                        tipoArquivo = 3;
                        nameTipoArquivo = DateTime.Now.ToString().Replace(":", "-").Replace(" ", "").Replace("/", "-") + "-IDR-" + idReferencia + "-TU-" + tipoUpload + "-TA-" + tipoArquivo + extension;
                    }
                    pathToSave = Path.Combine(pathToSave, folderName);
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var fullPathNew = Path.Combine(pathToSave, nameTipoArquivo);

                    var dbPath = Path.Combine("assets", folderName, nameTipoArquivo);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    System.IO.File.Move(fullPath, fullPathNew);

                    var oArquivo = new Arquivo();
                    dbPath = dbPath.Replace("\\", "/");
                    oArquivo.CaminhoArquivo = dbPath;
                    oArquivo.NomeArquivo = nameTipoArquivo;
                    oArquivo.TipoArquivoId = tipoArquivo;
                    oArquivo.TipoUploadId = Convert.ToInt64(tipoUpload);
                    oArquivo.IdReferencia = Convert.ToInt64(idReferencia);
                    _repo.Add(oArquivo);

                    if (await _repo.SaveChangesAsync())
                    {
                        var ftpApi = new FTP
                        {
                            Host = _config.GetValue<string>("FTP:Host"),
                            Login = _config.GetValue<string>("FTP:Login"),
                            Senha = _config.GetValue<string>("FTP:Senha")
                        };
                        using (WebClient client = new WebClient())
                        {
                            client.Credentials = new NetworkCredential(ftpApi.Login, ftpApi.Senha);
                            var caminhoFtp = $"ftp://{ftpApi.Host}/{dbPath}";
                            client.UploadFile(caminhoFtp, WebRequestMethods.Ftp.UploadFile, fullPathNew);
                        }
                        //System.IO.File.Delete(fullPathNew);
                        return Ok(new { dbPath });
                    }
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
            return BadRequest();
        }
    }
}