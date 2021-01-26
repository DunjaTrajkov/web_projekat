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
                        .Include(z => z.Zanrovi)
                        .ThenInclude(d => d.Diskovi)
                        .ToListAsync();

            return new JsonResult(stores);
        }

        [HttpPut]
        [Route ("DodajDisk/{Naziv}/{Cena}/{id_Zanra}")]
        public async Task DodajDisk(/* int id_Diska,  */string Naziv, int Cena, int id_Zanra)
        {
            Disk disk = new Disk();

            // disk.Id_Diska=id_Diska;
            disk.Naziv=Naziv;
            disk.Cena=Cena;
            var zanr = await dbContext.Zanrovi.Where(x => x.Id_Zanra == id_Zanra).FirstOrDefaultAsync();
            zanr.trDiskova++;
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
            
            var zanrnew = await dbContext.Zanrovi.Where(x => x.Id_Zanra == id_Zanra).FirstOrDefaultAsync();
            var zanroldid = await dbContext.Diskovi.Where(x=>x.Id_Diska==id_Diska)
                                                 .Select(d => d.Zanr.Id_Zanra)
                                                 .FirstOrDefaultAsync();
            var zanrold = await dbContext.Zanrovi.Where(x => x.Id_Zanra==zanroldid).FirstOrDefaultAsync();

            zanrold.trDiskova--;
            zanrnew.trDiskova++;
            disk.Zanr = zanrnew;

            await dbContext.SaveChangesAsync();
        }

        [HttpDelete]
        [Route ("IzbrisiDisk/{id_Diska}")]
        public async Task IzbrisiDisk(int id_Diska)
        {
            var disk = await dbContext.Diskovi.Where(x=>x.Id_Diska==id_Diska).FirstOrDefaultAsync();
            int zanrID = await dbContext.Diskovi.Where(x=>x.Id_Diska==id_Diska).Select(d => d.Zanr.Id_Zanra).FirstOrDefaultAsync();
            var zanr = await dbContext.Zanrovi.Where(x => x.Id_Zanra==zanrID).FirstOrDefaultAsync();

            zanr.trDiskova--;

            dbContext.Diskovi.Remove(disk);
            await dbContext.SaveChangesAsync();
        }

        
    }
}
