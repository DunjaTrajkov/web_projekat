using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Collections.Generic;

namespace musicstore.Models
{
    public class MusicStore
    {
        [Key]
        public int Id_Stora { get; set; }
        public string Naziv { get; set; }
        public List<Zanr> Zanrovi { get; set; }
    }
}