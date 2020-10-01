using Microsoft.EntityFrameworkCore;
using SmartImoveisWebAPI.Model;

namespace SmartImoveisWebAPI.Repository
{
    public class SmartImoveisContext : DbContext
    {
        public SmartImoveisContext(DbContextOptions<SmartImoveisContext> options) : base (options) {}

        public DbSet<Edificio> Edificios { get; set; }
        public DbSet<Vendedor> Vendedores { get; set; }
        public DbSet<Parceiro> Parceiros { get; set; }
        public DbSet<Endereco> Enderecos { get; set; }
        public DbSet<VariavelXML> VariavelXMLs { get; set; }
        public DbSet<XML> XMLs { get; set; }
        public DbSet<FotoEdificio> FotoEdificios { get; set; }
        public DbSet<FotoAreaEdificio> FotoAreaEdificios { get; set; }
        public DbSet<FotoPlantaEdificio> FotoPlantaEdificios { get; set; }
        public DbSet<FotoImovel> FotoImoveis { get; set; }
        public DbSet<FotoAreaImovel> FotoAreaImoveis { get; set; }
        public DbSet<FotoPlantaImovel> FotoPlantaImoveis { get; set; }
        public DbSet<Contato> Contatos { get; set; }
        public DbSet<Imovel> Imoveis { get; set; }
        public DbSet<VideoTable> Videos { get; set; }
        public DbSet<ParceiroCarga> ParceiroCargas { get; set; }
        public DbSet<ControleArquivoXML> ControleArquivoXMLs { get; set; }

    }
}