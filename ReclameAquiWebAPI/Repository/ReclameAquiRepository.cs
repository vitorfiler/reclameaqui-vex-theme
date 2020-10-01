using System.Collections.Generic;
using ReclameAquiWebAPI.Model;
using Dapper;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;

namespace ReclameAquiWebAPI.Repository
{
    public class ReclameAquiRepository : IReclameAquiRepository
    {
        private readonly ReclameAquiContext _context;
        public ReclameAquiRepository(ReclameAquiContext context)
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
        #region Categorias

        public async Task<Categoria[]> GetAllCategoriasAsync()
        {
            IQueryable<Categoria> query = _context.Categorias;
            // Caso houvesse tabelas com Join esse seria o include das tabelas.
            //  .Include(c => c.Lotes)
            //  .Include(c => c.RedesSociais);
            query = query.AsNoTracking()
                        .OrderByDescending(c => c.Id);
            return await query.ToArrayAsync();
        }

        public async Task<Categoria> GetAllCategoriasByIdAsync(long CategoriaId)
        {
            IQueryable<Categoria> query = _context.Categorias;
            // Caso houvesse tabelas com Join esse seria o include das tabelas.
            //  .Include(c => c.Lotes)
            //  .Include(c => c.RedesSociais);
            query = query.AsNoTracking()
                        .Where(c => c.Id == CategoriaId); ;
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Categoria[]> GetAllCategoriasByNomeAsync(string NomeCategoria)
        {
            IQueryable<Categoria> query = _context.Categorias;
            // Caso houvesse tabelas com Join esse seria o include das tabelas.
            //  .Include(c => c.Lotes)
            //  .Include(c => c.RedesSociais);
            query = query.AsNoTracking()
                        .OrderByDescending(c => c.Id).Where(c => c.Nome.ToLower().Contains(NomeCategoria.ToLower()));
            return await query.ToArrayAsync();
        }
        #endregion
        #region Clientes

        public async Task<Cliente[]> GetAllClientesAsync()
        {
            IQueryable<Cliente> query = _context.Clientes
                .Include(x => x.EnderecoCliente);

            query = query.AsNoTracking()
                        .OrderByDescending(c => c.Id);
            return await query.ToArrayAsync();
        }

        public async Task<Cliente> GetAllClientesByIdAsync(long ClienteId)
        {
            IQueryable<Cliente> query = _context.Clientes
                .Include(x => x.EnderecoCliente);

            query = query.AsNoTracking()
                        .Where(c => c.Id == ClienteId); ;
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Cliente[]> GetAllClientesByNomeAsync(string NomeCliente)
        {
            IQueryable<Cliente> query = _context.Clientes;
            // Caso houvesse tabelas com Join esse seria o include das tabelas.
            //  .Include(c => c.Lotes)
            //  .Include(c => c.RedesSociais);
            query = query.AsNoTracking()
                        .OrderByDescending(c => c.Id).Where(c => c.Nome.ToLower().Contains(NomeCliente.ToLower()));
            return await query.ToArrayAsync();
        }
        #endregion
        #region Empresas
        public async Task<Empresa[]> GetAllEmpresasAsync()
        {
            IQueryable<Empresa> query = _context.Empresas
                .Include(x => x.EnderecoEmpresa);

            query = query.AsNoTracking()
                        .OrderByDescending(c => c.Id);
            return await query.ToArrayAsync();
        }

        public async Task<Empresa> GetAllEmpresasByIdAsync(long EmpresaId)
        {
            IQueryable<Empresa> query = _context.Empresas
                .Include(x => x.EnderecoEmpresa);

            query = query.AsNoTracking()
                        .Where(c => c.Id == EmpresaId); ;
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Empresa[]> GetAllEmpresasByNomeAsync(string NomeEmpresa)
        {
            IQueryable<Empresa> query = _context.Empresas
                .Include(x => x.EnderecoEmpresa);
            query = query.AsNoTracking()
                        .OrderByDescending(c => c.Id).Where(c => c.Nome.ToLower().Contains(NomeEmpresa.ToLower()));
            return await query.ToArrayAsync();
        }

        public async Task<Empresa> GetEmpresasByCNPJAsync(string cnpj)
        {
            IQueryable<Empresa> query = _context.Empresas
                .Include(x => x.EnderecoEmpresa);
            query = query.AsNoTracking()
                        .OrderByDescending(c => c.Id).Where(c => c.CNPJ.ToLower().Contains(cnpj.ToLower()));
            return await query.FirstOrDefaultAsync();
        }
        #endregion
        #region Login
        public async Task<Login> GetLoginByIdAsync(long LoginId)
        {
            IQueryable<Login> query = _context.Logins
                .Include(c => c.Empresa)
                .Include(c => c.Cliente);

            query = query.AsNoTracking()
                        .Where(c => c.Id == LoginId);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Login> GetLoginByUserAsync(string username)
        {
            IQueryable<Login> query = _context.Logins
                .Include(c => c.Empresa)
                .Include(c => c.Cliente);

            query = query.AsNoTracking()
                        .Where(c => c.Usuario.ToLower() == username.ToLower());
            return await query.FirstOrDefaultAsync();
        }

        #endregion
        public async Task<Reclamacao> GetReclamacaoByIdAsync(long ReclamacaoId)
        {
            IQueryable<Reclamacao> query = _context.Reclamacoes
            .Include(c => c.Empresa)
            .Include(c => c.Status)
            .Include(c => c.Cliente);

            query = query.AsNoTracking()
                        .Where(c => c.Id == ReclamacaoId);
            return await query.FirstOrDefaultAsync();
        }

        //public async Task<ArquivoReclamacao[]> GetConteudoReclamacaoByIdAsync(long ConteudoReclamacaoId)
        //{
        //    IQueryable<ArquivoReclamacao> query = _context.ArquivoReclamacoes
        //    .Include(c => c.ConteudoReclamacao);

        //    query = query.AsNoTracking()
        //                .OrderByDescending(c => c.Id).Where(c => c.ConteudoReclamacaoId == ConteudoReclamacaoId);
        //    return await query.ToArrayAsync();
        //}

        public async Task<ConteudoReclamacao[]> GetAllConteudoReclamacaoAsync()
        {
            IQueryable<ConteudoReclamacao> query = _context.ConteudoReclamacoes;
            //  .Include(c => c.RedesSociais);
            query = query.AsNoTracking()
                        .OrderByDescending(c => c.Id);
            return await query.ToArrayAsync();
        }

        public async Task<Reclamacao[]> GetAllReclamacoesAsync()
        {
            IQueryable<Reclamacao> query = _context.Reclamacoes
            .Include(c => c.Empresa)
            .Include(c => c.Status)
            .Include(c => c.Cliente);
            //  .Include(c => c.RedesSociais);
            query = query.AsNoTracking()
                        .OrderByDescending(c => c.Id);
            return await query.ToArrayAsync();
        }

        public async Task<CategoriaMaeFilha[]> GetAllCategoriasMaeFilhasAsync()
        {
            IQueryable<CategoriaMaeFilha> query = _context.CategoriaMaeFilhas;
            // Caso houvesse tabelas com Join esse seria o include das tabelas.
            //  .Include(c => c.Lotes)
            //  .Include(c => c.RedesSociais);
            query = query.AsNoTracking();
            return await query.ToArrayAsync();
        }

        public async Task<VwRating[]> GetAllMelhoresRatingAsync()
        {
            IQueryable<VwRating> query = _context.VwRatings;
            query = query.AsNoTracking().OrderByDescending(x => x.NotaRating).Take(10);
            return await query.ToArrayAsync();
        }

        public async Task<VwRating[]> GetAllPioresRatingAsync()
        {
            IQueryable<VwRating> query = _context.VwRatings;
            query = query.AsNoTracking().OrderBy(x => x.NotaRating).Take(10);
            return await query.ToArrayAsync();
        }

        public async Task<VwRating[]> GetAllMelhoresSolucaoAsync()
        {
            IQueryable<VwRating> query = _context.VwRatings;
            query = query.AsNoTracking().OrderByDescending(x => x.NotaSolucao).Take(10);
            return await query.ToArrayAsync();
        }

        public async Task<VwRating[]> GetAllPioresSolucaoAsync()
        {
            IQueryable<VwRating> query = _context.VwRatings;
            query = query.AsNoTracking().OrderBy(x => x.NotaSolucao).Take(10);
            return await query.ToArrayAsync();
        }

        public async Task<VwRating[]> GetAllMelhoresRatingByIdCategoriaAsync(long idCategoria)
        {
            IQueryable<VwRating> query = _context.VwRatings;
            query = query.AsNoTracking().Where(x => x.CategoriaId == idCategoria).OrderByDescending(x => x.NotaRating).Take(10);
            return await query.ToArrayAsync();
        }

        public async Task<VwRating[]> GetAllPioresRatingIdCategoriaAsync(long idCategoria)
        {
            IQueryable<VwRating> query = _context.VwRatings;
            query = query.AsNoTracking().Where(x => x.CategoriaId == idCategoria).OrderBy(x => x.NotaRating).Take(10);
            return await query.ToArrayAsync();
        }

        public async Task<VwRating[]> GetAllMelhoresSolucaoIdCategoriaAsync(long idCategoria)
        {
            IQueryable<VwRating> query = _context.VwRatings;
            query = query.AsNoTracking().Where(x => x.CategoriaId == idCategoria).OrderByDescending(x => x.NotaSolucao).Take(10);
            return await query.ToArrayAsync();
        }

        public async Task<VwRating[]> GetAllPioresSolucaoIdCategoriaAsync(long idCategoria)
        {
            IQueryable<VwRating> query = _context.VwRatings;
            query = query.AsNoTracking().Where(x => x.CategoriaId == idCategoria).OrderBy(x => x.NotaSolucao).Take(10);
            return await query.ToArrayAsync();
        }

        public async Task<VwRating[]> GetAllMaisReclamadasAsync()
        {
            IQueryable<VwRating> query = _context.VwRatings;
            query = query.AsNoTracking().OrderByDescending(x => x.Quantidade).Take(10);
            return await query.ToArrayAsync();
        }

        public async Task<VwRating[]> GetAllMaisReclamadasIdCategoriaAsync(long idCategoria)
        {
            IQueryable<VwRating> query = _context.VwRatings;
            query = query.AsNoTracking().Where(x => x.CategoriaId == idCategoria).OrderByDescending(x => x.Quantidade).Take(10);
            return await query.ToArrayAsync();
        }

        public async Task<VwRating[]> GetAllMelhorVoltarNegocioAsync()
        {
            IQueryable<VwRating> query = _context.VwRatings;
            query = query.AsNoTracking().OrderByDescending(x => x.FlagVoltariaNegocios).Take(10);
            return await query.ToArrayAsync();
        }

        public async Task<VwRating[]> GetAllMelhorVoltarNegocioIdCategoriaAsync(long idCategoria)
        {
            IQueryable<VwRating> query = _context.VwRatings;
            query = query.AsNoTracking().Where(x => x.CategoriaId == idCategoria).OrderByDescending(x => x.FlagVoltariaNegocios).Take(10);
            return await query.ToArrayAsync();
        }

        public async Task<VwRating[]> GetAllMaisResolve30DAsync()
        {
            IQueryable<VwRating> query = _context.VwRatings;
            var DataValidacao = DateTime.Now.AddDays(-30);
            query = query.AsNoTracking().Where(x => x.DataEncerramentoReclamacao != null && x.DataEncerramentoReclamacao >= DataValidacao).OrderByDescending(x => x.QuantidadeFechada).Take(10);
            return await query.ToArrayAsync();
        }

        public async Task<VwRating[]> GetAllMaisResolve6MAsync()
        {
            IQueryable<VwRating> query = _context.VwRatings;
            var DataValidacao = DateTime.Now.AddDays(-180);
            query = query.AsNoTracking().Where(x => x.DataEncerramentoReclamacao != null && x.DataEncerramentoReclamacao >= DataValidacao).OrderByDescending(x => x.QuantidadeFechada).Take(10);
            return await query.ToArrayAsync();
        }

        public async Task<VwRating[]> GetAllPioresEmp6MAsync()
        {
            IQueryable<VwRating> query = _context.VwRatings;
            var DataValidacao = DateTime.Now.AddDays(-180);
            query = query.AsNoTracking().Where(x => x.DataAberturaReclamacao >= DataValidacao).OrderByDescending(x => x.Quantidade).Take(10);
            return await query.ToArrayAsync();
        }

        public async Task<VwRating[]> GetAllPioresEmp30DAsync()
        {
            IQueryable<VwRating> query = _context.VwRatings;
            var DataValidacao = DateTime.Now.AddDays(-30);
            query = query.AsNoTracking().Where(x => x.DataAberturaReclamacao >= DataValidacao).OrderBy(x => x.NotaRating).Take(10);
            return await query.ToArrayAsync();
        }

        public async Task<VwRating[]> GetAllEmpRecemCadastradasDAsync()
        {
            IQueryable<VwRating> query = _context.VwRatings;
            var DataValidacao = DateTime.Now.AddDays(-30);
            query = query.AsNoTracking().Where(x => x.DataCadastroEmp >= DataValidacao).OrderByDescending(x => x.Quantidade).Take(10);
            return await query.ToArrayAsync();
        }

        public async Task<VwRating[]> GetAllMaisReclamadasDiaDAsync()
        {
            IQueryable<VwRating> query = _context.VwRatings;
            var DataValidacao = DateTime.Now.ToString("dd/MM/yyyy");
            //var DataValidacao = DateTime.Now.ToString("yyyy-MM-dd");
            var dataCorrect = Convert.ToDateTime(DataValidacao);
            query = query.AsNoTracking().Where(x => x.DataAberturaReclamacao >= dataCorrect).Take(10);
            return await query.ToArrayAsync();
        }

        public async Task<VwRating[]> GetAllMaisReclamadasSemanaDAsync()
        {
            IQueryable<VwRating> query = _context.VwRatings;
            var DataValidacao = DateTime.Now.AddDays(-7);
            query = query.AsNoTracking().Where(x => x.DataAberturaReclamacao >= DataValidacao).Take(10);
            return await query.ToArrayAsync();
        }

        public async Task<VwRating[]> GetAllMaisReclamadas30DAsync()
        {
            IQueryable<VwRating> query = _context.VwRatings;
            var DataValidacao = DateTime.Now.AddDays(-30);
            query = query.AsNoTracking().Where(x => x.DataAberturaReclamacao >= DataValidacao).Take(10);
            return await query.ToArrayAsync();
        }

        public async Task<Reclamacao[]> GetReclamacaoByDateAddAsync(int dateAdd)
        {
            IQueryable<Reclamacao> query = _context.Reclamacoes;
            var DataValidacao = DateTime.Now.AddDays(dateAdd).ToString("dd/MM/yyyy");
            //var DataValidacao = DateTime.Now.ToString("yyyy-MM-dd");
            var dataCorrect = Convert.ToDateTime(DataValidacao);
            query = query.AsNoTracking().Where(x => x.DataAbertura >= dataCorrect);
            return await query.ToArrayAsync();
        }

        public async Task<Reclamacao[]> GetReclamacaoByEmpDateAddAsync(long EmpresaId, long StatusId)
        {
            IQueryable<Reclamacao> query = _context.Reclamacoes
                .Include(c => c.Cliente)
                .Include(c => c.Empresa);
            if (StatusId > 0)
                query = query.AsNoTracking().Where(x => x.EmpresaId == EmpresaId && x.StatusId == StatusId).OrderByDescending(x => x.DataAbertura);
            else
                query = query.AsNoTracking().Where(x => x.EmpresaId == EmpresaId).OrderByDescending(x => x.DataAbertura);

            return await query.ToArrayAsync();
        }

        public async Task<ConteudoReclamacao[]> GetAllContRecByReclamacaoIdAsync(long ReclamacaoId)
        {
            IQueryable<ConteudoReclamacao> query = _context.ConteudoReclamacoes
                .Include(x => x.Reclamacao)
                .Include(x => x.Reclamacao.Cliente)
                .Include(x => x.Reclamacao.Empresa);
            query = query.AsNoTracking().Where(x => x.ReclamacaoId == ReclamacaoId).OrderByDescending(x => x.DataSave);
            return await query.ToArrayAsync();
        }

        public string RetornaStatus(long statusId)
        {
            switch (statusId)
            {
                case 1: return "Aguardando Analise";
                case 2: return "Iniciada";
                case 3: return "Improcedente";
                case 4: return "Respondido";
                case 5: return "Finalizada";
                case 6: return "Cancelada";
            }
            return "";
        }

        public string RetornaStatusCor(long statusId)
        {
            switch (statusId)
            {
                case 1: return "badge badge-success";
                case 2: return "badge badge-primary";
                case 3: return "badge badge-danger";
                case 4: return "badge badge-warning";
                case 5: return "badge badge-info";
                case 6: return "badge badge-danger";
            }
            return "";
        }

        public async Task<Reclamacao[]> GetReclamacaoByClienteIdAsync(long ClienteId, long StatusId)
        {
            IQueryable<Reclamacao> query = _context.Reclamacoes
                .Include(c => c.Cliente)
                .Include(c => c.Empresa);
            if (StatusId > 0)
                query = query.AsNoTracking().Where(x => x.ClienteId == ClienteId && x.StatusId == StatusId).OrderByDescending(x => x.DataAbertura);
            else
                query = query.AsNoTracking().Where(x => x.ClienteId == ClienteId).OrderByDescending(x => x.DataAbertura);

            return await query.ToArrayAsync();
        }

        public async Task<Login> GetLoginByClienteIdAsync(long id)
        {
            IQueryable<Login> query = _context.Logins;

            query = query.AsNoTracking()
                        .Where(c => c.ClienteId == id);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Login> GetLoginByEmpresaIdAsync(long id)
        {
            IQueryable<Login> query = _context.Logins;

            query = query.AsNoTracking()
                        .Where(c => c.EmpresaId == id);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Reclamacao[]> Get10ReclamacaoAsync()
        {
            IQueryable<Reclamacao> query = _context.Reclamacoes
                .Include(c => c.Cliente)
                .Include(c => c.Empresa);
                query = query.AsNoTracking().OrderByDescending(x => x.DataAbertura).Take(10);

            return await query.ToArrayAsync();
        }

        public async Task<Arquivo[]> GetAllArquivoByReclamacaoIdAsync(long idReclamacao)
        {
            IQueryable<Arquivo> query = _context.Arquivos;
            query = query.AsNoTracking().Where(x => x.IdReferencia == idReclamacao && x.TipoUploadId == 1);
            return await query.ToArrayAsync();
        }
    }


}