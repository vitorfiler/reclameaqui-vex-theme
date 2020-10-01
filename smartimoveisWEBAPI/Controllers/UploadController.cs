using SmartImoveisWebAPI.Model;
using SmartImoveisWebAPI.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System;
using System.IO;
using System.Net.Http.Headers;
using Microsoft.Extensions.Configuration;
using System.Net;

namespace SmartImoveisWebAPI.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly ISmartImoveisRepository _repo;

        private readonly IConfiguration _config;
        public UploadController(ISmartImoveisRepository SmartImoveisRepository, IConfiguration config)
        {
            _repo = SmartImoveisRepository;

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

                if (Convert.ToInt32(tipoUpload) > 9)
                {
                    return this.StatusCode(StatusCodes.Status401Unauthorized, "Favor informar um Tipo de UPLOAD Válido (1.Edificio, 2.Imovel, 3.Vendedor)");
                }

                else if (Convert.ToInt32(tipoUpload) <= 0)
                {
                    return this.StatusCode(StatusCodes.Status401Unauthorized, "Favor informar um Tipo de UPLOAD Válido (1.Edificio, 2.Imovel, 3.Vendedor)");
                }

                if (Convert.ToInt64(idReferencia) <= 0)
                {
                    return this.StatusCode(StatusCodes.Status401Unauthorized, "Favor informar um Id de Referência Válido.");
                }

                var folderName = "";

                //var pathToSave = "C:\\Projetos\\reclameaqui\\ReclameAquiAdmin\\src\\assets";
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), "Resources");
                //var pathToSave = "C:\\Users\\evito\\projetos\\WAIH\\smartimoveis\\smartimoveisAdmin\\src\\assets";
                string[] extensoesImagens = new string[] { ".jpg", ".png", ".jpeg" };

                if (file.Length > 0)
                {
                    var nameTipoArquivo = "";
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var extension = Path.GetExtension(fileName);
                    if (extensoesImagens.Contains(extension))
                    {
                        folderName = "Image";
                        nameTipoArquivo = DateTime.Now.ToString().Replace(":", "-").Replace(" ", "").Replace("/", "-") + "-IDR-" + idReferencia + "-TU-" + tipoUpload + extension;
                    }
                    else
                    {
                        return this.StatusCode(StatusCodes.Status401Unauthorized, "Só é permitido UPLOAD de Imagens.");
                    }
                    pathToSave = Path.Combine(pathToSave, folderName);
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var fullPathNew = Path.Combine(pathToSave, nameTipoArquivo);

                    //var dbPath = Path.Combine("assets", folderName, nameTipoArquivo);
                    var dbPath = Path.Combine(folderName, nameTipoArquivo);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    System.IO.File.Move(fullPath, fullPathNew);

                    if (Convert.ToInt32(tipoUpload) == 1) //Edificio
                    {
                        var listFotoEdificio = await _repo.GetFotosEdificioByIdAsync(Convert.ToInt64(idReferencia));
                        var ordemFinal = 1;
                        if (listFotoEdificio.Count() > 0)
                        {
                            var fotoF = listFotoEdificio.OrderByDescending(x => x.Ordem).FirstOrDefault();
                            ordemFinal = fotoF.Ordem + 1;
                        }
                        var oFoto = new FotoEdificio();
                        dbPath = dbPath.Replace("\\", "/");
                        oFoto.NomeFoto = nameTipoArquivo;
                        oFoto.Caminho = dbPath;
                        oFoto.Ordem = Convert.ToInt32(ordemFinal);
                        oFoto.EdificioId = Convert.ToInt64(idReferencia);
                        _repo.Add(oFoto);
                    }
                    else if (Convert.ToInt32(tipoUpload) == 2) //Imovel
                    {
                        var listFotoEdificio = await _repo.GetFotosImovelByIdAsync(Convert.ToInt64(idReferencia));
                        var ordemFinal = 1;
                        if (listFotoEdificio.Count() > 0)
                        {
                            var fotoF = listFotoEdificio.OrderByDescending(x => x.Ordem).FirstOrDefault();
                            ordemFinal = fotoF.Ordem + 1;
                        }
                        var oFoto = new FotoImovel();
                        dbPath = dbPath.Replace("\\", "/");
                        oFoto.NomeFoto = nameTipoArquivo;
                        oFoto.Caminho = dbPath;
                        oFoto.Ordem = Convert.ToInt32(ordemFinal);
                        oFoto.ImovelId = Convert.ToInt64(idReferencia);
                        _repo.Add(oFoto);
                    }
                    else if (Convert.ToInt32(tipoUpload) == 3) //Vendedor
                    {

                        var oVendedor = await _repo.GetVendedorByIdAsync(Convert.ToInt64(idReferencia));
                        oVendedor.Foto = dbPath;
                        _repo.Update(oVendedor);
                    }
                    else if (Convert.ToInt32(tipoUpload) == 4) //FotoAreaEdificio
                    {
                        var listFotoEdificio = await _repo.GetFotosAreaEdificioByIdAsync(Convert.ToInt64(idReferencia));
                        var ordemFinal = 1;
                        if (listFotoEdificio.Count() > 0)
                        {
                            var fotoF = listFotoEdificio.OrderByDescending(x => x.Ordem).FirstOrDefault();
                            ordemFinal = fotoF.Ordem + 1;
                        }
                        var oFoto = new FotoAreaEdificio();
                        dbPath = dbPath.Replace("\\", "/");
                        oFoto.NomeFoto = nameTipoArquivo;
                        oFoto.Caminho = dbPath;
                        oFoto.Ordem = Convert.ToInt32(ordemFinal);
                        oFoto.EdificioId = Convert.ToInt64(idReferencia);
                        _repo.Add(oFoto);
                    }
                    else if (Convert.ToInt32(tipoUpload) == 5) //FotoPlantaEdificio
                    {
                        var listFotoEdificio = await _repo.GetFotosPlantaEdificioByIdAsync(Convert.ToInt64(idReferencia));
                        var ordemFinal = 1;
                        if (listFotoEdificio.Count() > 0)
                        {
                            var fotoF = listFotoEdificio.OrderByDescending(x => x.Ordem).FirstOrDefault();
                            ordemFinal = fotoF.Ordem + 1;
                        }
                        var oFoto = new FotoPlantaEdificio();
                        dbPath = dbPath.Replace("\\", "/");
                        oFoto.NomeFoto = nameTipoArquivo;
                        oFoto.Caminho = dbPath;
                        oFoto.Ordem = Convert.ToInt32(ordemFinal);
                        oFoto.EdificioId = Convert.ToInt64(idReferencia);
                        _repo.Add(oFoto);
                    }
                    else if (Convert.ToInt32(tipoUpload) == 6) //FotoAreaImovel
                    {
                        var listFotoEdificio = await _repo.GetFotosAreaImovelByIdAsync(Convert.ToInt64(idReferencia));
                        var ordemFinal = 1;
                        if (listFotoEdificio.Count() > 0)
                        {
                            var fotoF = listFotoEdificio.OrderByDescending(x => x.Ordem).FirstOrDefault();
                            ordemFinal = fotoF.Ordem + 1;
                        }
                        var oFoto = new FotoAreaImovel();
                        dbPath = dbPath.Replace("\\", "/");
                        oFoto.NomeFoto = nameTipoArquivo;
                        oFoto.Caminho = dbPath;
                        oFoto.Ordem = Convert.ToInt32(ordemFinal);
                        oFoto.ImovelId = Convert.ToInt64(idReferencia);
                        _repo.Add(oFoto);
                    }
                    else if (Convert.ToInt32(tipoUpload) == 7) //FotoPlantaImovel
                    {
                        var listFotoEdificio = await _repo.GetFotosPlantaImovelByIdAsync(Convert.ToInt64(idReferencia));
                        var ordemFinal = 1;
                        if (listFotoEdificio.Count() > 0)
                        {
                            var fotoF = listFotoEdificio.OrderByDescending(x => x.Ordem).FirstOrDefault();
                            ordemFinal = fotoF.Ordem + 1;
                        }
                        var oFoto = new FotoPlantaImovel();
                        dbPath = dbPath.Replace("\\", "/");
                        oFoto.NomeFoto = nameTipoArquivo;
                        oFoto.Caminho = dbPath;
                        oFoto.Ordem = Convert.ToInt32(ordemFinal);
                        oFoto.ImovelId = Convert.ToInt64(idReferencia);
                        _repo.Add(oFoto);
                    }
                    else if (Convert.ToInt32(tipoUpload) == 8) //Foto Padrão Imovel
                    {
                        var listFotoEdificio = _repo.GetFotosEdificioByIdAsync(Convert.ToInt64(idReferencia));
                        var oFoto = await _repo.GetFotosImovelByIdAsync(Convert.ToInt64(idReferencia));
                        dbPath = dbPath.Replace("\\", "/");
                        var oFotoF = oFoto.Where(x => x.Ordem == 0).FirstOrDefault();
                        if (oFotoF == null)
                        {
                            oFotoF = new FotoImovel();
                            oFotoF.NomeFoto = nameTipoArquivo;
                            oFotoF.Caminho = dbPath;
                            oFotoF.Ordem = 0;
                            oFotoF.ImovelId = Convert.ToInt64(idReferencia);
                            _repo.Add(oFotoF);
                        }
                        else
                        {
                            oFotoF.NomeFoto = nameTipoArquivo;
                            oFotoF.Caminho = dbPath;
                            oFotoF.Ordem = 0;
                            _repo.Update(oFotoF);
                        }
                    }
                    else if (Convert.ToInt32(tipoUpload) == 9) //Foto Padrão Edificio
                    {
                        var oFoto = await _repo.GetFotosEdificioByIdAsync(Convert.ToInt64(idReferencia));
                        dbPath = dbPath.Replace("\\", "/");
                        var oFotoF = oFoto.Where(x => x.Ordem == 0).FirstOrDefault();
                        if (oFotoF == null)
                        {
                            oFotoF = new FotoEdificio();
                            oFotoF.NomeFoto = nameTipoArquivo;
                            oFotoF.Caminho = dbPath;
                            oFotoF.Ordem = 0;
                            oFotoF.EdificioId = Convert.ToInt64(idReferencia);
                            _repo.Add(oFotoF);
                        }
                        else
                        {
                            oFotoF.NomeFoto = nameTipoArquivo;
                            oFotoF.Caminho = dbPath;
                            oFotoF.Ordem = 0;
                            _repo.Update(oFotoF);
                        }
                    }


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
                            var caminhoftp = $"ftp://{ftpApi.Host}/{dbPath}";
                            client.UploadFile(caminhoftp, WebRequestMethods.Ftp.UploadFile, fullPathNew);
                        }
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