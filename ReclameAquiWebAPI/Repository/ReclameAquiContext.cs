using Microsoft.EntityFrameworkCore;
using ReclameAquiWebAPI.Model;

namespace ReclameAquiWebAPI.Repository
{
    public class ReclameAquiContext : DbContext
    {
        public ReclameAquiContext(DbContextOptions<ReclameAquiContext> options) : base (options) {}

        public DbSet<Categoria> Categorias { get; set; }

        public DbSet<Cliente> Clientes { get; set; }

        public DbSet<Empresa> Empresas { get; set; }

        public DbSet<Endereco> Enderecos { get; set; }

        public DbSet<Login> Logins { get; set; }

        public DbSet<Status> Statuses { get; set; }

        public DbSet<Reclamacao> Reclamacoes { get; set; }

        public DbSet<ConteudoReclamacao> ConteudoReclamacoes { get; set; }
        public DbSet<Arquivo> Arquivos { get; set; }
        public DbSet<CategoriaMaeFilha> CategoriaMaeFilhas { get; set; }
        public DbSet<VwRating> VwRatings { get; set; }
        public DbSet<Rating> Ratings { get; set; }
    }
}