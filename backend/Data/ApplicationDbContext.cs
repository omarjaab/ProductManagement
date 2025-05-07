using Microsoft.EntityFrameworkCore;
using ProductManagement.Models;

namespace ProductManagement.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
            : base(options)
        {
        }

        public DbSet<Product> Products => Set<Product>();
        public DbSet<ProductType> ProductTypes => Set<ProductType>();
        public DbSet<Colour> Colours => Set<Colour>();
        public DbSet<ProductColour> ProductColours => Set<ProductColour>();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<ProductColour>()
                .HasKey(pc => new { pc.ProductId, pc.ColourId });

            builder.Entity<ProductColour>()
                .HasOne(pc => pc.Product)
                .WithMany(p => p.ProductColours)
                .HasForeignKey(pc => pc.ProductId);

            builder.Entity<ProductColour>()
                .HasOne(pc => pc.Colour)
                .WithMany(c => c.ProductColours)
                .HasForeignKey(pc => pc.ColourId);
        }
    }
}