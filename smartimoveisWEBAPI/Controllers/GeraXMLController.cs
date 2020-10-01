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
using System.Text;

namespace ReclameAquiWebAPI.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class GeraXMLController : ControllerBase
    {
        private readonly ISmartImoveisRepository _repo;
        private readonly IConfiguration _config;

        public GeraXMLController(ISmartImoveisRepository smartImoveisRepository, IConfiguration config)
        {
            _repo = smartImoveisRepository;
            _config = config;
        }
        #region "GET"
        [HttpGet]
        [Produces(typeof(List<XML>))]
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
                var XMLs = await _repo.GetAllXMLsAsync();
                var Cargas = await _repo.GetAllParceiroCargasAsync();
                var Imoveis = await _repo.GetAllImoveisAtivosAsync(true);
                var Parceiros = await _repo.GetAllParceirosAsync();
                var cargaSimples = 0;
                var cargaDestaque = 0;
                var cargaSuperDestaque = 0;


                if (XMLs.Count() == 0)
                    return this.StatusCode(StatusCodes.Status204NoContent, $"Não há XMLs cadastrados para parceiros.");

                if (Imoveis.Count() == 0)
                    return this.StatusCode(StatusCodes.Status500InternalServerError, $"Não há Imoveis Ativos.");

                foreach (var xml in XMLs)
                {
                    var parceiroCarga = Cargas.Where(x => x.ParceiroId == xml.ParceiroId).FirstOrDefault();
                    var parceiro = Parceiros.Where(x => x.Id == xml.ParceiroId).FirstOrDefault();
                    cargaSimples = parceiroCarga.AnuncioSimples;
                    cargaDestaque = parceiroCarga.Destaque;
                    cargaSuperDestaque = parceiroCarga.SuperDestaque;
                    var stringXML = new StringBuilder();
                    stringXML.AppendLine(xml.XmlImovelInicio);
                    stringXML.AppendLine($"");
                    foreach (var imovel in Imoveis)
                    {
                        //parte B
                        var stringFotos = new StringBuilder();

                        var fotos = await _repo.GetAllVideosByImovelIdAsync(imovel.Id);

                        if (fotos.Count() > 0)
                        {
                            stringFotos.AppendLine(xml.XmlFotosInicio);
                            foreach (var foto in fotos)
                            {
                                stringFotos.AppendLine(xml.XmlFotosCorpo.Replace("@fotoNome", foto.Nome).Replace("@fotoLink", foto.Link));
                            }
                            stringFotos.AppendLine(xml.XmlFotosFim);
                        }

                        var stringVideos = new StringBuilder();
                        var videos = await _repo.GetAllVideosByImovelIdAsync(imovel.Id);

                        if (videos.Count() > 0)
                        {
                            stringVideos.AppendLine(xml.XmlVideosInicio);
                            foreach (var video in videos)
                            {
                                stringVideos.AppendLine(xml.XmlVideosCorpo.Replace("@videoNome", video.Nome).Replace("@videoLink", video.Link));

                            }
                            stringVideos.AppendLine(xml.XmlVideosFim);
                        }

                        var flagTipoCarga = parceiro.TagSimples;
                        if (cargaDestaque > 0)
                        {
                            if (imovel.FlagDestaque != null && Convert.ToInt32(imovel.FlagSuperDestaque) > 0)
                            {
                                flagTipoCarga = parceiro.TagDestaque;
                                cargaDestaque--;
                            }
                        }
                        if (cargaSuperDestaque > 0)
                        {
                            if (imovel.FlagSuperDestaque != null && Convert.ToInt32(imovel.FlagSuperDestaque) > 0)
                            {
                                flagTipoCarga = parceiro.TagSuperDestaque;
                                cargaSuperDestaque--;
                            }
                        }

                        stringXML.AppendLine(xml.XmlImovelCorpo.Replace("@nome", imovel.Nome)
                                                               .Replace("@referencia", imovel.Referencia)
                                                               .Replace("@fotos", stringFotos.ToString())
                                                               .Replace("@videos", stringVideos.ToString())
                                                               .Replace("@descricao", imovel.Descricao)
                                                               .Replace("@precoVenda", imovel.PrecoVenda.ToString())
                                                               .Replace("@precoCondominio", imovel.PrecoCondominio.ToString())
                                                               .Replace("@latitude", imovel.oEndereco.Latitude.ToString())
                                                               .Replace("@longitude", imovel.oEndereco.Longitude.ToString())
                                                               .Replace("@areaUtil", imovel.AreaUtil.ToString())
                                                               .Replace("@areaTotal", imovel.AreaTotal.ToString())
                                                               .Replace("@qtdDormitorios", imovel.QtdDormitorios.ToString())
                                                               .Replace("@qtdSuites", imovel.QtdSuites.ToString())
                                                               .Replace("@qtdBanheiros", imovel.QtdBanheiros.ToString())
                                                               .Replace("@qtdSalas", imovel.QtdSalas.ToString())
                                                               .Replace("@qtdVagas", imovel.QtdVagas.ToString())
                                                               .Replace("@qtdElevador", imovel.QtdElevador.ToString())
                                                               .Replace("@qtdUnidadesAndar", imovel.QtdUnidadesAndar.ToString())
                                                               .Replace("@anoConstrucao", imovel.AnoConstrucao.ToString())
                                                               .Replace("@armarioCozinha", Convert.ToInt32(imovel.ArmarioCozinha).ToString())
                                                               .Replace("@armarioEmbutido", Convert.ToInt32(imovel.ArmarioEmbutido).ToString())
                                                               .Replace("@estacionamentoVisitantes", Convert.ToInt32(imovel.EstacionamentoVisitantes).ToString())
                                                               .Replace("@piscina", Convert.ToInt32(imovel.Piscina).ToString())
                                                               .Replace("@quadraSquash", Convert.ToInt32(imovel.QuadraSquash).ToString())
                                                               .Replace("@quadraTenis", Convert.ToInt32(imovel.QuadraTenis).ToString())
                                                               .Replace("@quadraPoliesportiva", Convert.ToInt32(imovel.QuadraPoliesportiva).ToString())
                                                               .Replace("@salaGinastica", Convert.ToInt32(imovel.SalaGinastica).ToString())
                                                               .Replace("@salaoFestas", Convert.ToInt32(imovel.SalaoFestas).ToString())
                                                               .Replace("@salaoJogos", Convert.ToInt32(imovel.SalaoJogos).ToString())
                                                               .Replace("@sauna", Convert.ToInt32(imovel.Sauna).ToString())
                                                               .Replace("@varanda", Convert.ToInt32(imovel.Varanda).ToString())
                                                               .Replace("@lavabo", Convert.ToInt32(imovel.Lavabo).ToString())
                                                               .Replace("@depositoSubsolo", Convert.ToInt32(imovel.DepositoSubsolo).ToString())
                                                               .Replace("@closet", Convert.ToInt32(imovel.Closet).ToString())
                                                               .Replace("@hidromassagem", Convert.ToInt32(imovel.Hidromassagem).ToString())
                                                               .Replace("@lareira", Convert.ToInt32(imovel.Lareira).ToString())
                                                               .Replace("@andarInteiro", Convert.ToInt32(imovel.AndarInteiro).ToString())
                                                               .Replace("@meioAndar", Convert.ToInt32(imovel.MeioAndar).ToString())
                                                               .Replace("@salaAlmoco", Convert.ToInt32(imovel.SalaAlmoco).ToString())
                                                               .Replace("@salaJantar", Convert.ToInt32(imovel.SalaJantar).ToString())
                                                               .Replace("@salaIntima", Convert.ToInt32(imovel.SalaIntima).ToString())
                                                               .Replace("@brinquedoteca", Convert.ToInt32(imovel.Brinquedoteca).ToString())
                                                               .Replace("@playground", Convert.ToInt32(imovel.Playground).ToString())
                                                               .Replace("@tagTipoCarga", flagTipoCarga)
                                                               .Replace("@logradouro", imovel.oEndereco.Logradouro.ToString())
                                                               .Replace("@numero", imovel.oEndereco.Numero.ToString())
                                                               .Replace("@bairro", imovel.oEndereco.Bairro.ToString())
                                                               .Replace("@cidade", imovel.oEndereco.Cidade.ToString())
                                                               .Replace("@uf", imovel.oEndereco.UF.ToString())
                                                               .Replace("@cep", imovel.oEndereco.CEP.ToString())
                                                               .Replace("@complemento", imovel.Complemento.ToString())
                                                               );
                    }
                    stringXML.AppendLine($"");
                    stringXML.AppendLine(xml.XmlImovelFim);

                    //Falta a parte de salvar esse xml e enviar via FTP.
                }
                return Ok();
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Ocorreu um erro no banco de Dados.{ex.Message}");
            }
        }
        #endregion
    }
}