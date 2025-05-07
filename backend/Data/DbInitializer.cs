using ProductManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace ProductManagement.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDbContext context)
        {
            context.Database.Migrate();


            if (context.ProductTypes.Any() || context.Colours.Any())
            {
                return; // DB has been seeded
            }

            var productTypes = new ProductType[]
            {
                new ProductType { Name = "Sofa" },
                new ProductType { Name = "Chair" },
                new ProductType { Name = "Table" },
                new ProductType { Name = "Bed" }
            };

            var colours = new Colour[]
            {
                new Colour { Name = "Red" },
                new Colour { Name = "Blue" },
                new Colour { Name = "Green" },
                new Colour { Name = "Black" },
                new Colour { Name = "White" }
            };

            context.ProductTypes.AddRange(productTypes);
            context.Colours.AddRange(colours);
            context.SaveChanges();
        }
    }
}