using System.Collections.Generic;
//using SmartImoveisWebAPI.Model;
using Dapper;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;
using SmartImoveisWebAPI.Model;

namespace SmartImoveisWebAPI.Repository
{
    public class SmartImoveisRepository : ISmartImoveisRepository
    {
        #region Generic Methods
        private readonly SmartImoveisContext _context;
        public SmartImoveisRepository(SmartImoveisContext context)
        {
            _context = context;
            this._context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
        #endregion

        #region Home
        public async Task<Contato[]> GetAllContatosAsync()
        {
            IQueryable<Contato> query = _context.Contatos;
            query = query.AsNoTracking()
                        .OrderByDescending(c => c.Id);
            return await query.ToArrayAsync();
        }

        public async Task<Contato> GetContatoByIdAsync(long id)
        {
            IQueryable<Contato> query = _context.Contatos;
            query = query.AsNoTracking()
                        .Where(c => c.Id == id);
            return await query.FirstOrDefaultAsync();
        }
        #endregion

        #region Edificio
        public async Task<Edificio[]> GetAllEdificiosAsync()
        {
            IQueryable<Edificio> query = _context.Edificios.Include(x => x.oEndereco);
            query = query.AsNoTracking()
                        .OrderByDescending(c => c.Id);
            return await query.ToArrayAsync();
        }
        public async Task<Edificio[]> GetAllEdificiosAtivosAsync(bool? Ativos = true)
        {
            IQueryable<Edificio> query = _context.Edificios.Include(x => x.oEndereco);
            query = query.AsNoTracking()
                        .Where(x => x.FlagAtivo == Ativos)
                        .OrderByDescending(c => c.Id);
            return await query.ToArrayAsync();
        }
        public async Task<Edificio> GetEdificioByNameAsync(string nome)
        {
            IQueryable<Edificio> query = _context.Edificios;
            query = query.AsNoTracking()
                        .Where(c => c.Nome.ToLower() == nome.ToLower());
            return await query.FirstOrDefaultAsync();
        }
        public async Task<Edificio> GetEdificioByIdAsync(long id)
        {
            IQueryable<Edificio> query = _context.Edificios.Include(x => x.oEndereco);
            query = query.AsNoTracking()
                        .Where(c => c.Id == id);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<FotoEdificio[]> GetFotosEdificioByIdAsync(long id)
        {
            IQueryable<FotoEdificio> query = _context.FotoEdificios;
            query = query.AsNoTracking()
                        .Where(c => c.EdificioId == id);
            return await query.ToArrayAsync();
        }
        public async Task<FotoAreaEdificio[]> GetFotosAreaEdificioByIdAsync(long id)
        {
            IQueryable<FotoAreaEdificio> query = _context.FotoAreaEdificios;
            query = query.AsNoTracking()
                        .Where(c => c.EdificioId == id);
            return await query.ToArrayAsync();
        }
        public async Task<FotoPlantaEdificio[]> GetFotosPlantaEdificioByIdAsync(long id)
        {
            IQueryable<FotoPlantaEdificio> query = _context.FotoPlantaEdificios;
            query = query.AsNoTracking()
                        .Where(c => c.EdificioId == id);
            return await query.ToArrayAsync();
        }
        #endregion

        #region Vendedor
        public async Task<Vendedor[]> GetAllVendedoresAsync()
        {
            IQueryable<Vendedor> query = _context.Vendedores;
            query = query.AsNoTracking()
                        .OrderByDescending(c => c.Id);
            return await query.ToArrayAsync();
        }
        public async Task<Vendedor> GetVendedorByUserAsync(string usuario)
        {
            IQueryable<Vendedor> query = _context.Vendedores;
            query = query.AsNoTracking()
                        .Where(c => c.Usuario.ToLower() == usuario.ToLower());
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Vendedor> GetVendedorByIdAsync(long id)
        {
            IQueryable<Vendedor> query = _context.Vendedores;
            query = query.AsNoTracking()
                        .Where(c => c.Id == id);
            return await query.FirstOrDefaultAsync();
        }

        #endregion

        #region Parceiro
        public async Task<Parceiro[]> GetAllParceirosAsync()
        {
            IQueryable<Parceiro> query = _context.Parceiros;
            query = query.AsNoTracking()
                        .OrderByDescending(c => c.Id);
            return await query.ToArrayAsync();
        }

        public async Task<Parceiro> GetParceiroByNameAsync(string parceiro)
        {
            IQueryable<Parceiro> query = _context.Parceiros;
            query = query.AsNoTracking()
                        .Where(c => c.Nome.ToLower() == parceiro.ToLower());
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Parceiro> GetParceiroByIdAsync(long id)
        {
            IQueryable<Parceiro> query = _context.Parceiros;
            query = query.AsNoTracking()
                        .Where(c => c.Id == id);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<ParceiroCarga[]> GetAllParceiroCargasAsync()
        {
            IQueryable<ParceiroCarga> query = _context.ParceiroCargas.Include(x => x.oParceiro);
            query = query.AsNoTracking()
                        .OrderByDescending(c => c.Id);
            return await query.ToArrayAsync();
        }

        #endregion

        #region XML
        public async Task<VariavelXML[]> GetAllVariaveisXMLAsync()
        {
            IQueryable<VariavelXML> query = _context.VariavelXMLs;
            query = query.AsNoTracking()
                        .OrderByDescending(c => c.Id);
            return await query.ToArrayAsync();
        }

        public async Task<XML[]> GetAllXMLsAsync()
        {
            IQueryable<XML> query = _context.XMLs;
            query = query.AsNoTracking()
                        .OrderByDescending(c => c.Id);
            return await query.ToArrayAsync();
        }

        public async Task<XML> GetXMLByParceiroIdAsync(long parceiroId)
        {
            IQueryable<XML> query = _context.XMLs;
            query = query.AsNoTracking()
                        .Where(c => c.ParceiroId == parceiroId);
            return await query.FirstOrDefaultAsync();
        }
        
        public async Task<XML> GetXMLByIdAsync(long id)
        {
            IQueryable<XML> query = _context.XMLs;
            query = query.AsNoTracking()
                        .Where(c => c.Id == id);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<ControleArquivoXML[]> GetAllControleAquivoXMLAsync()
        {
            IQueryable<ControleArquivoXML> query = _context.ControleArquivoXMLs.Include(x => x.oParceiro);
            query = query.AsNoTracking()
                        .OrderByDescending(c => c.Id);
            return await query.ToArrayAsync();
        }
        #endregion

        #region Imovel
        public async Task<Imovel[]> GetAllImoveisAsync()
        {
            IQueryable<Imovel> query = _context.Imoveis.Include(x => x.oEndereco).Include(x => x.oEdificio);
            query = query.AsNoTracking()
                        .OrderByDescending(c => c.Id);
            return await query.ToArrayAsync();
        }
        public async Task<Imovel[]> GetAllImoveisByEdificioIdAsync(long edificio)
        {
            IQueryable<Imovel> query = _context.Imoveis.Include(x => x.oEndereco).Include(x => x.oEdificio);
            query = query.AsNoTracking()
                .Where(x => x.EdificioId == edificio)
                .OrderByDescending(c => c.Id);
            return await query.ToArrayAsync();
        }
        public async Task<VideoTable[]> GetAllVideosByImovelIdAsync(long imovel)
        {
            IQueryable<VideoTable> query = _context.Videos;
            query = query.AsNoTracking()
                .Where(x => x.ImovelId == imovel)
                .OrderByDescending(c => c.Id);
            return await query.ToArrayAsync();
        }
        public async Task<Imovel> GetImovelByNameAsync(string nome)
        {
            IQueryable<Imovel> query = _context.Imoveis.Include(x => x.oEndereco).Include(x => x.oEdificio);
            query = query.AsNoTracking()
                        .Where(c => c.Nome.ToLower() == nome.ToLower());
            return await query.FirstOrDefaultAsync();
        }
        public async Task<Imovel> GetImovelByRefAsync(string referencia)
        {
            IQueryable<Imovel> query = _context.Imoveis.Include(x => x.oEndereco).Include(x => x.oEdificio);
            query = query.AsNoTracking()
                        .Where(c => c.Referencia.ToLower() == referencia.ToLower());
            return await query.FirstOrDefaultAsync();
        }
        public async Task<Imovel> GetImovelByIdAsync(long id)
        {
            IQueryable<Imovel> query = _context.Imoveis.Include(x => x.oEndereco).Include(x => x.oEdificio);
            query = query.AsNoTracking()
                        .Where(c => c.Id == id);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<Imovel[]> GetAllImoveisAtivosAsync(bool? ativo = true)
        {
            IQueryable<Imovel> query = _context.Imoveis.Include(x => x.oEndereco).Include(x => x.oEdificio).Include(x => x.oEdificio.oEndereco);
            query = query.AsNoTracking()
                        .Where(c => c.FlagAtivo == ativo).OrderByDescending(x => x.Id);
            return await query.ToArrayAsync();
        }
        public async Task<FotoImovel[]> GetFotosImovelByIdAsync(long id)
        {
            IQueryable<FotoImovel> query = _context.FotoImoveis;
            query = query.AsNoTracking()
                        .Where(c => c.ImovelId == id);
            return await query.ToArrayAsync();
        }
        public async Task<FotoAreaImovel[]> GetFotosAreaImovelByIdAsync(long id)
        {
            IQueryable<FotoAreaImovel> query = _context.FotoAreaImoveis;
            query = query.AsNoTracking()
                        .Where(c => c.ImovelId == id);
            return await query.ToArrayAsync();
        }
        public async Task<FotoPlantaImovel[]> GetFotosPlantaImovelByIdAsync(long id)
        {
            IQueryable<FotoPlantaImovel> query = _context.FotoPlantaImoveis;
            query = query.AsNoTracking()
                        .Where(c => c.ImovelId == id);
            return await query.ToArrayAsync();
        }

        #endregion
    }
}