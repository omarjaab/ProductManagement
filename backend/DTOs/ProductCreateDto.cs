namespace ProductManagement.DTOs
{
    public class ProductCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public int ProductTypeId { get; set; }
        public List<int> ColourIds { get; set; } = new();
    }
}