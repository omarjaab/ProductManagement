using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductManagement.Data;
using ProductManagement.DTOs;
using ProductManagement.Models;

namespace ProductManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {
            return await _context.Products
                .OrderByDescending(p => p.CreatedAt)
                .Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name
                })
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDetailDto>> GetProduct(int id)
        {
            var product = await _context.Products
                .Include(p => p.ProductType)
                .Include(p => p.ProductColours)
                    .ThenInclude(pc => pc.Colour)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return new ProductDetailDto
            {
                Id = product.Id,
                Name = product.Name,
                ProductType = new ProductTypeDto
                {
                    Id = product.ProductType.Id,
                    Name = product.ProductType.Name
                },
                Colours = product.ProductColours
                    .Select(pc => new ColourDto
                    {
                        Id = pc.Colour.Id,
                        Name = pc.Colour.Name
                    })
                    .ToList()
            };
        }

        [HttpPost]
        public async Task<ActionResult<ProductDto>> CreateProduct(ProductCreateDto productDto)
        {
            var product = new Product
            {
                Name = productDto.Name,
                ProductTypeId = productDto.ProductTypeId,
                ProductColours = productDto.ColourIds.Select(id => new ProductColour
                {
                    ColourId = id
                }).ToList()
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, 
                new ProductDto { Id = product.Id, Name = product.Name });
        }

        [HttpGet("types")]
        public async Task<ActionResult<IEnumerable<ProductTypeDto>>> GetProductTypes()
        {
            return await _context.ProductTypes
                .Select(t => new ProductTypeDto { Id = t.Id, Name = t.Name })
                .ToListAsync();
        }

        [HttpGet("colours")]
        public async Task<ActionResult<IEnumerable<ColourDto>>> GetColours()
        {
            return await _context.Colours
                .Select(c => new ColourDto { Id = c.Id, Name = c.Name })
                .ToListAsync();
        }
    }
}