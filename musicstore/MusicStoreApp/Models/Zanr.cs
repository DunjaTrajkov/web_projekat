using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Collections.Generic;

namespace musicstore.Models
{
    public class Zanr
    {
        [Key]
        public int Id_Zanra { get; set; }
        public string Naziv { get; set; }
        public int MaxDiskova { get; set; }
        public List<Disk> Diskovi { get; set; }
        [JsonIgnore]
        public MusicStore MusicStore { get; set; }
    }
}