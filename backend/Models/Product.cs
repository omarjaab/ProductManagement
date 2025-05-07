namespace ProductManagement.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public int ProductTypeId { get; set; }
        public ProductType ProductType { get; set; }
        
        public ICollection<ProductColour> ProductColours { get; set; } = new List<ProductColour>();
    }
}