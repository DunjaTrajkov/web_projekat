using Microsoft.EntityFrameworkCore;

namespace musicstore.Models
{
    public class ContextKlasa : DbContext
    {
        public ContextKlasa(DbContextOptions options) : base(options) { }
        public DbSet<MusicStore> Stores { get; set; }
        public DbSet<Zanr> Zanrovi { get; set; }        
        public DbSet<Disk> Diskovi { get; set; }        
    }
}