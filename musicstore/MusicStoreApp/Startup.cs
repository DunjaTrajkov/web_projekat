using System.Text.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using musicstore.Models;

namespace musicstore
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Dodavanje DB context-a
            services.AddDbContext<ContextKlasa>(options =>
            {
                // Radi se o SQL Server bazi podataka (LocalDB)
                options.UseSqlServer(
                    // Ovako može da se preuzme connection string koji je u appsettings.json
                    Configuration.GetConnectionString("Konekcija"));
            });
            services.AddControllers();
            services.AddMvc().AddJsonOptions(options =>
            {
                // CamelCase je standard koji JSON koristi i treba ga se pridržavati
                // Ukoliko se ne stavi ništa, takođe će default da bude CamelCase
                // null je da nema transformacije, pa ukoliko su Property-ji u C#-u nazvani po standardu, koristiće se PascalCase
                options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            });

            // Cors mora da se omogući, putem servisa i na nivou aplikacije, kontrolera ili metode
            services.AddCors(options => 
            {
                // CORS je naziv policy koja će da se koristi, a builder podešava policy
                options.AddPolicy("CORS", builder =>
                {
                    builder.AllowAnyHeader()
                           .AllowAnyMethod()
                        //    .WithOrigins("http://127.0.0.1:5500",
                        //                 "http://localhost:5500",
                        //                 "http://127.0.0.1:8080",
                        //                 "http://localhost:8080",
                        //                 "http://127.0.0.1:5501",
                        //                 "http://127.0.0.1:5501");

                            // Dodati bilo koji drugi IP, adresu ili port sa
                            // kojeg Web API treba da može da se pozove

                            // Da bi omogućili pozivanje sa bilo koje adrese i porta...
                            .AllowAnyOrigin();
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("CORS");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
