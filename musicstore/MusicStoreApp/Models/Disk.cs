using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace musicstore.Models
{
    public class Disk
    {
        [Key]
        public int Id_Diska { get; set; }     
        public string Naziv { get; set; }
        public int Cena { get; set; }
        [JsonIgnore]
        public Zanr Zanr { get; set; }
    }
}