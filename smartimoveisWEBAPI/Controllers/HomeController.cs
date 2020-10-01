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
    public class HomeController : ControllerBase
    {
        private readonly ISmartImoveisRepository _repo;
        private readonly IConfiguration _config;

        public HomeController(ISmartImoveisRepository smartImoveisRepository, IConfiguration config)
        {
            _repo = smartImoveisRepository;
            _config = config;
        }

        #region "GET"
        [HttpGet]
        [Produces(typeof(HomeReturn))]
        public async Task<IActionResult> Get()
        {
            try
            {
                var Imoveis = await _repo.GetAllImoveisAtivosAsync(true);
                var Vendedores = await _repo.GetAllVendedoresAsync();
                var listaLocations = new List<Locations>();
                var listaProperties = new List<Propertie>();
                foreach (var imovel in Imoveis)
                {
                    var lat = "";
                    var lng = "";
                    if (imovel.oEndereco != null) lat = imovel.oEndereco.Latitude;
                    else lat = imovel.oEdificio.oEndereco.Latitude;
                    if (imovel.oEndereco != null) lng = imovel.oEndereco.Longitude;
                    else lng = imovel.oEdificio.oEndereco.Longitude;

                    listaLocations.Add(new Locations
                    {
                        propertyId = imovel.Id,
                        id = imovel.Id,
                        lat = lat,
                        lng = lng
                    });

                    var oEndereco = new Endereco();
                    if (imovel.EdificioId > 0)
                    {
                        if (imovel.oEdificio.oEndereco != null)
                        {
                            oEndereco = new Endereco
                            {
                                Bairro = imovel.oEdificio.oEndereco.Bairro,
                                CEP = imovel.oEdificio.oEndereco.CEP,
                                Cidade = imovel.oEdificio.oEndereco.Cidade,
                                Complemento = imovel.oEdificio.oEndereco.Complemento + " " + imovel.Complemento,
                                Logradouro = imovel.oEdificio.oEndereco.Logradouro,
                                Numero = imovel.oEdificio.oEndereco.Numero,
                                UF = imovel.oEdificio.oEndereco.UF
                            };
                        }
                    }
                    else
                    {
                        oEndereco = new Endereco
                        {
                            Bairro = imovel.oEndereco.Bairro,
                            CEP = imovel.oEndereco.CEP,
                            Cidade = imovel.oEndereco.Cidade,
                            Complemento = imovel.oEndereco.Complemento + " " + imovel.Complemento,
                            Logradouro = imovel.oEndereco.Logradouro,
                            Numero = imovel.oEndereco.Numero,
                            UF = imovel.oEndereco.UF
                        };
                    }

                    var listGalery = new List<Gallery>();
                    var listPlans = new List<Plan>();
                    var fotosImoveis = await _repo.GetFotosImovelByIdAsync(imovel.Id);
                    if (fotosImoveis.Count() > 0)
                    {
                        foreach (var foto in fotosImoveis)
                        {
                            listGalery.Add(new Gallery
                            {
                                small = foto.Caminho,
                                medium = foto.Caminho,
                                big = foto.Caminho
                            });
                        }
                    }
                    var fotosAreaImoveis = await _repo.GetFotosAreaImovelByIdAsync(imovel.Id);
                    if (fotosAreaImoveis.Count() > 0)
                    {
                        foreach (var foto in fotosAreaImoveis)
                        {
                            listGalery.Add(new Gallery
                            {
                                small = foto.Caminho,
                                medium = foto.Caminho,
                                big = foto.Caminho
                            });
                        }
                    }

                    var fotosPlantaImoveis = await _repo.GetFotosPlantaImovelByIdAsync(imovel.Id);
                    if (fotosPlantaImoveis.Count() > 0)
                    {
                        foreach (var foto in fotosPlantaImoveis)
                        {
                            listPlans.Add(new Plan
                            {
                                image = foto.Caminho,
                            });
                        }
                    }

                    if (imovel.EdificioId != null && imovel.EdificioId > 0)
                    {
                        var fotosEdificio = await _repo.GetFotosEdificioByIdAsync(imovel.Id);
                        if (fotosEdificio.Count() > 0)
                        {
                            foreach (var foto in fotosImoveis)
                            {
                                listGalery.Add(new Gallery
                                {
                                    small = foto.Caminho,
                                    medium = foto.Caminho,
                                    big = foto.Caminho
                                });
                            }
                        }
                        var fotosAreaEdificio = await _repo.GetFotosAreaEdificioByIdAsync(imovel.Id);
                        if (fotosAreaImoveis.Count() > 0)
                        {
                            foreach (var foto in fotosAreaImoveis)
                            {
                                listGalery.Add(new Gallery
                                {
                                    small = foto.Caminho,
                                    medium = foto.Caminho,
                                    big = foto.Caminho
                                });
                            }
                        }

                        var fotosPlantaEdificio = await _repo.GetFotosPlantaEdificioByIdAsync(imovel.Id);
                        if (fotosPlantaEdificio.Count() > 0)
                        {
                            foreach (var foto in fotosPlantaEdificio)
                            {
                                listPlans.Add(new Plan
                                {
                                    image = foto.Caminho,
                                });
                            }
                        }
                    }
                    var videos = await _repo.GetAllVideosByImovelIdAsync(imovel.Id);
                    var listaVideos = new List<Video>();

                    if (videos.Count() > 0)
                    {
                        foreach (var video in videos)
                        {
                            listaVideos.Add(new Video
                            {
                                link = video.Link,
                                name = video.Nome
                            });
                        }
                    }
                    var listaBairro = new List<string>();
                    var listaRua = new List<string>();
                    var listaStatus = new List<string>();
                    var listaFeatures = RetonaListaFeatures(imovel);

                    if (imovel.PrecoVenda > 0)
                        listaStatus.Add("À Venda");
                    else
                        listaStatus.Add("Para Alugar");
                    listaBairro.Add(oEndereco.Bairro);
                    listaRua.Add(oEndereco.Logradouro);

                    var oPropertie = new Propertie
                    {
                        area = new Area
                        {
                            unit = "m2",
                            value = imovel.AreaUtil
                        },
                        bathrooms = imovel.QtdBanheiros,
                        bedrooms = imovel.QtdDormitorios,
                        city = oEndereco.Cidade,
                        gallery = listGalery,
                        videos = listaVideos,
                        garages = imovel.QtdVagas,
                        id = imovel.Id,
                        desc = imovel.Descricao,
                        reference = imovel.Referencia,
                        priceDollar = new PriceDollar
                        {
                            rent = imovel.PrecoLocacao,
                            sale = imovel.PrecoVenda
                        },
                        priceEuro = new PriceEuro
                        {
                            rent = imovel.PrecoLocacao,
                            sale = imovel.PrecoVenda
                        },
                        neighborhood = listaBairro,
                        location = new Location
                        {
                            lat = lat,
                            lng = lng
                        },
                        title = imovel.Nome,
                        street = listaRua,
                        yearBuilt = imovel.AnoConstrucao,
                        lastUpdate = imovel.DataAlteracao.ToString(),
                        published = imovel.DataAlteracao.ToString(),
                        zipCode = oEndereco.CEP,
                        ratingsValue = 5,
                        ratingsCount = 100,
                        views = 1000,
                        propertyType = imovel.Tipo,
                        formattedAddress = oEndereco.Logradouro + " " + oEndereco.Numero + " " + oEndereco.Complemento,
                        additionalFeatures = new List<AdditionalFeature>(),
                        featured = false,
                        propertyStatus = listaStatus,
                        features = listaFeatures,
                        plans = listPlans
                       
                    };

                    listaProperties.Add(oPropertie);
                }
                var retorno = new HomeReturn
                {
                    agents = Vendedores.ToList(),
                    locations = listaLocations,
                    properties = listaProperties
                };
                return Ok(retorno);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Ocorreu um erro no banco de Dados.{ex.Message}");
            }
        }
        private List<string> RetonaListaFeatures(Imovel imovel)
        {
            var retorno = new List<string>();
            if (imovel.ArmarioCozinha) retorno.Add("Armário na Cozinha");
            if (imovel.ArmarioEmbutido) retorno.Add("Armário Embutido");
            if (imovel.EstacionamentoVisitantes) retorno.Add("Estacionamento para Visitantes");
            if (imovel.Piscina) retorno.Add("Piscina");
            if (imovel.QuadraSquash) retorno.Add("Quadra de Squash");
            if (imovel.QuadraTenis) retorno.Add("Quadra de Tenis");
            if (imovel.QuadraPoliesportiva) retorno.Add("Quadra Poliesportiva");
            if (imovel.SalaGinastica) retorno.Add("Sala de Ginástica");
            if (imovel.SalaoFestas) retorno.Add("Salão de Festas");
            if (imovel.SalaoJogos) retorno.Add("Salão de Jogos");
            if (imovel.Sauna) retorno.Add("Sauna");
            if (imovel.Varanda) retorno.Add("Varanda");
            if (imovel.Lavabo) retorno.Add("Lavabo");
            if (imovel.DepositoSubsolo) retorno.Add("Depósito no Subsolo");
            if (imovel.Closet) retorno.Add("Closet");
            if (imovel.Hidromassagem) retorno.Add("Hidromassagem");
            if (imovel.Lareira) retorno.Add("Lareira");
            if (imovel.AndarInteiro) retorno.Add("Andar Inteiro");
            if (imovel.MeioAndar) retorno.Add("Meio Andar");
            if (imovel.SalaAlmoco) retorno.Add("Sala de Almoço");
            if (imovel.SalaJantar) retorno.Add("Sala de Jantar");
            if (imovel.SalaIntima) retorno.Add("Sala Íntima");
            if (imovel.Brinquedoteca) retorno.Add("Brinquedoteca");
            if (imovel.Playground) retorno.Add("Playground");
            return retorno;
        }
        #endregion
    }
}
