using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using musicstore.Models;

namespace musicstore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MusicStoreController : ControllerBase
    {
        private ContextKlasa dbContext;

        // Dependency Injection DB Context-a
        public MusicStoreController(ContextKlasa context)
        {
            dbContext = context;
        }

        // GET metoda, URL će da bude .../Prodavnica/PreuzmiProdavnice
        // zato što je ProdavnicaController naziv kontrolera i u Route stoji ostatak
        [HttpGet]
        [Route("PreuzmiStores")]
        public async Task<JsonResult> GetStores()
        {
            var stores = await dbContext.Stores
                        .Include(p => p.Zanrovi)
                        .ToListAsync();

            return new JsonResult(stores);
        }

        [HttpGet]
        [Route("PreuzmiZanrove")]
        public async Task<JsonResult> GetZanrs() {
            var zanrovi = await dbContext.Zanrovi
                        .Include(p => p.Diskovi) 
                        .ToListAsync(); 

            return new JsonResult(zanrovi);
        }

        [HttpGet]
        [Route("PreuzmiDiskove")]
        public async Task<JsonResult> GetDisks() {
            var diskovi = await dbContext.Diskovi
                        .ToListAsync(); 

            return new JsonResult(diskovi);
        }

        [HttpPut]
        [Route ("DodajDisk/{id_Diska}/{Naziv}/{Cena}/{id_Zanra}")]
        public async Task DodajDisk(int id_Diska, string Naziv, int Cena, int id_Zanra)
        {
            Disk disk = new Disk();
            disk.Id_Diska=id_Diska;
            disk.Naziv=Naziv;
            disk.Cena=Cena;
            
            var zanr = dbContext.Zanrovi.Where(x => x.Id_Zanra == id_Zanra).FirstOrDefault();
            disk.Zanr = zanr;

            dbContext.Diskovi.Add(disk);
            await dbContext.SaveChangesAsync();
        }

        [HttpPut]
        [Route ("IzmeniDisk/{id_Diska}/{Naziv}/{Cena}/{id_Zanra}")]
        public async Task IzmeniDisk(int id_Diska, string Naziv, int Cena, int id_Zanra)
        {
            var disk = await dbContext.Diskovi.Where(x=>x.Id_Diska==id_Diska).FirstOrDefaultAsync();
            
            disk.Naziv=Naziv;
            disk.Cena=Cena;
            
            var zanr = await dbContext.Zanrovi.Where(x => x.Id_Zanra == id_Zanra).FirstOrDefaultAsync();
            disk.Zanr = zanr;

            dbContext.Diskovi.Add(disk);
            await dbContext.SaveChangesAsync();
        }

        
    }
}
