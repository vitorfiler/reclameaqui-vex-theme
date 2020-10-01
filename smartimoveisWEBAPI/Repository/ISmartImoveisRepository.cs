using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SmartImoveisWebAPI.Model;

namespace SmartImoveisWebAPI.Repository
{
    public interface ISmartImoveisRepository
    {
        #region Generic Methods
        //Metodos Genéricos de Crud
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveChangesAsync();
        #endregion

        #region Home
        Task<Contato[]> GetAllContatosAsync();
        Task<Contato> GetContatoByIdAsync(long id);
        #endregion

        #region Edificio
        Task<Edificio[]> GetAllEdificiosAsync();
        Task<Edificio[]> GetAllEdificiosAtivosAsync(bool? Ativo = true);
        Task<Edificio> GetEdificioByNameAsync(string nome);
        Task<Edificio> GetEdificioByIdAsync(long id);
        Task<FotoEdificio[]> GetFotosEdificioByIdAsync(long id);
        Task<FotoAreaEdificio[]> GetFotosAreaEdificioByIdAsync(long id);
        Task<FotoPlantaEdificio[]> GetFotosPlantaEdificioByIdAsync(long id);
        #endregion

        #region Vendedor
        Task<Vendedor[]> GetAllVendedoresAsync();
        Task<Vendedor> GetVendedorByUserAsync(string usuario);
        Task<Vendedor> GetVendedorByIdAsync(long id);
        #endregion

        #region Parceiro
        Task<Parceiro[]> GetAllParceirosAsync();
        Task<Parceiro> GetParceiroByNameAsync(string parceiro);
        Task<Parceiro> GetParceiroByIdAsync(long id);
        Task<ParceiroCarga[]> GetAllParceiroCargasAsync();
        
        #endregion

        #region XMLs
        Task<VariavelXML[]> GetAllVariaveisXMLAsync();
        Task<XML[]> GetAllXMLsAsync();
        Task<XML> GetXMLByParceiroIdAsync(long parceiroId);
        Task<XML> GetXMLByIdAsync(long id);
        Task<ControleArquivoXML[]> GetAllControleAquivoXMLAsync();
        #endregion

        #region Imovel
        Task<Imovel[]> GetAllImoveisAsync();
        Task<Imovel[]> GetAllImoveisByEdificioIdAsync(long edificio);
        Task<VideoTable[]> GetAllVideosByImovelIdAsync(long imovelId);
        Task<Imovel> GetImovelByNameAsync(string nome);
        Task<Imovel> GetImovelByRefAsync(string nome);
        Task<Imovel> GetImovelByIdAsync(long id);
        Task<Imovel[]> GetAllImoveisAtivosAsync(bool? ativo = true);
        Task<FotoImovel[]> GetFotosImovelByIdAsync(long id);
        
        Task<FotoAreaImovel[]> GetFotosAreaImovelByIdAsync(long id);
        Task<FotoPlantaImovel[]> GetFotosPlantaImovelByIdAsync(long id);
        #endregion
    }
}