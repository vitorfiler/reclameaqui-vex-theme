using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ReclameAquiWebAPI.Model;

namespace ReclameAquiWebAPI.Repository
{
    public interface IReclameAquiRepository
    {
        //Metodos Genéricos de Crud
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveChangesAsync();

        //Metodos modelo de Get para Tabela Categorias.
        Task<Categoria[]> GetAllCategoriasAsync();
        Task<CategoriaMaeFilha[]> GetAllCategoriasMaeFilhasAsync();
        Task<Categoria> GetAllCategoriasByIdAsync(long CategoriasId);
        Task<Categoria[]> GetAllCategoriasByNomeAsync(string NomeCategoria);

        //Metodos modelo de Get para Tabela Clientes.
        Task<Cliente[]> GetAllClientesAsync();
        Task<Cliente> GetAllClientesByIdAsync(long ClientesId);
        Task<Cliente[]> GetAllClientesByNomeAsync(string NomeCliente);

         //Metodos modelo de Get para Tabela Clientes.
        Task<Empresa[]> GetAllEmpresasAsync();
        Task<Empresa> GetAllEmpresasByIdAsync(long EmpresasId);
        Task<Empresa[]> GetAllEmpresasByNomeAsync(string NomeEmpresa);
        Task<Empresa> GetEmpresasByCNPJAsync(string cnpj);

        //Metodos Modelo de Get para Tabela de Login
        Task<Login> GetLoginByIdAsync(long EmpresasId);
        Task<Login> GetLoginByUserAsync(string usuario);

        Task<Login> GetLoginByClienteIdAsync(long id);
        Task<Login> GetLoginByEmpresaIdAsync(long id);


        //Metodos Modelo de Get para Tabela de Reclamação
        Task<Reclamacao> GetReclamacaoByIdAsync(long ReclamacaoId);
        Task<Reclamacao[]> GetReclamacaoByDateAddAsync(int dateAdd);
        Task<Reclamacao[]> GetReclamacaoByEmpDateAddAsync(long EmpresaId, long StatusId);
        Task<Reclamacao[]> GetReclamacaoByClienteIdAsync(long ClienteId, long StatusId);
        Task<Reclamacao[]> Get10ReclamacaoAsync();
        Task<ConteudoReclamacao[]> GetAllConteudoReclamacaoAsync();

        Task<ConteudoReclamacao[]> GetAllContRecByReclamacaoIdAsync(long ReclamacaoId);
        Task<Reclamacao[]> GetAllReclamacoesAsync();

        string RetornaStatus(long statusId);
        string RetornaStatusCor(long statusId);

        //Metodos Modelo de Get para as Views de Rating
        Task<VwRating[]> GetAllMelhoresRatingAsync();
        Task<VwRating[]> GetAllPioresRatingAsync();
        Task<VwRating[]> GetAllMelhoresSolucaoAsync();
        Task<VwRating[]> GetAllPioresSolucaoAsync();
        Task<VwRating[]> GetAllMaisReclamadasAsync();
        Task<VwRating[]> GetAllMelhorVoltarNegocioAsync();
        Task<VwRating[]> GetAllMaisResolve30DAsync();
        Task<VwRating[]> GetAllMaisResolve6MAsync();
        Task<VwRating[]> GetAllPioresEmp6MAsync();
        Task<VwRating[]> GetAllPioresEmp30DAsync();
        Task<VwRating[]> GetAllEmpRecemCadastradasDAsync();
        Task<VwRating[]> GetAllMaisReclamadasDiaDAsync();
        Task<VwRating[]> GetAllMaisReclamadasSemanaDAsync();
        Task<VwRating[]> GetAllMaisReclamadas30DAsync();
        Task<VwRating[]> GetAllMelhoresRatingByIdCategoriaAsync(long idCategoria);
        Task<VwRating[]> GetAllPioresRatingIdCategoriaAsync(long idCategoria);
        Task<VwRating[]> GetAllMelhoresSolucaoIdCategoriaAsync(long idCategoria);
        Task<VwRating[]> GetAllPioresSolucaoIdCategoriaAsync(long idCategoria);
        Task<VwRating[]> GetAllMaisReclamadasIdCategoriaAsync(long idCategoria);
        Task<VwRating[]> GetAllMelhorVoltarNegocioIdCategoriaAsync(long idCategoria);

        Task<Arquivo[]> GetAllArquivoByReclamacaoIdAsync(long idReclamacao);
    }
}