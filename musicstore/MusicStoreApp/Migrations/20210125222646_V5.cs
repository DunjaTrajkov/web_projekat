using Microsoft.EntityFrameworkCore.Migrations;

namespace musicstore.Migrations
{
    public partial class V5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "trDiskova",
                table: "Zanrovi",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "trDiskova",
                table: "Zanrovi");
        }
    }
}
