namespace ProductManagement.DTOs
{
    public class ProductDetailDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public ProductTypeDto ProductType { get; set; }
        public List<ColourDto> Colours { get; set; } = new();
    }
}