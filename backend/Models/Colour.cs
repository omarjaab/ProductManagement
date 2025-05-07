namespace ProductManagement.Models
{
    public class Colour
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public ICollection<ProductColour> ProductColours { get; set; } = new List<ProductColour>();
    }
}