using Microsoft.EntityFrameworkCore.Migrations;

namespace musicstore.Migrations
{
    public partial class MusicStore : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Stores",
                columns: table => new
                {
                    Id_Stora = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stores", x => x.Id_Stora);
                });

            migrationBuilder.CreateTable(
                name: "Zanrovi",
                columns: table => new
                {
                    Id_Zanra = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaxDiskova = table.Column<int>(type: "int", nullable: false),
                    MusicStoreId_Stora = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zanrovi", x => x.Id_Zanra);
                    table.ForeignKey(
                        name: "FK_Zanrovi_Stores_MusicStoreId_Stora",
                        column: x => x.MusicStoreId_Stora,
                        principalTable: "Stores",
                        principalColumn: "Id_Stora",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Diskovi",
                columns: table => new
                {
                    Id_Diska = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cena = table.Column<int>(type: "int", nullable: false),
                    ZanrId_Zanra = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Diskovi", x => x.Id_Diska);
                    table.ForeignKey(
                        name: "FK_Diskovi_Zanrovi_ZanrId_Zanra",
                        column: x => x.ZanrId_Zanra,
                        principalTable: "Zanrovi",
                        principalColumn: "Id_Zanra",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Diskovi_ZanrId_Zanra",
                table: "Diskovi",
                column: "ZanrId_Zanra");

            migrationBuilder.CreateIndex(
                name: "IX_Zanrovi_MusicStoreId_Stora",
                table: "Zanrovi",
                column: "MusicStoreId_Stora");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Diskovi");

            migrationBuilder.DropTable(
                name: "Zanrovi");

            migrationBuilder.DropTable(
                name: "Stores");
        }
    }
}
