﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using musicstore.Models;

namespace musicstore.Migrations
{
    [DbContext(typeof(ContextKlasa))]
    [Migration("20210125222646_V5")]
    partial class V5
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.2");

            modelBuilder.Entity("musicstore.Models.Disk", b =>
                {
                    b.Property<int>("Id_Diska")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("Cena")
                        .HasColumnType("int");

                    b.Property<string>("Naziv")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ZanrId_Zanra")
                        .HasColumnType("int");

                    b.HasKey("Id_Diska");

                    b.HasIndex("ZanrId_Zanra");

                    b.ToTable("Diskovi");
                });

            modelBuilder.Entity("musicstore.Models.MusicStore", b =>
                {
                    b.Property<int>("Id_Stora")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Naziv")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id_Stora");

                    b.ToTable("Stores");
                });

            modelBuilder.Entity("musicstore.Models.Zanr", b =>
                {
                    b.Property<int>("Id_Zanra")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("MaxDiskova")
                        .HasColumnType("int");

                    b.Property<int?>("MusicStoreId_Stora")
                        .HasColumnType("int");

                    b.Property<string>("Naziv")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("trDiskova")
                        .HasColumnType("int");

                    b.HasKey("Id_Zanra");

                    b.HasIndex("MusicStoreId_Stora");

                    b.ToTable("Zanrovi");
                });

            modelBuilder.Entity("musicstore.Models.Disk", b =>
                {
                    b.HasOne("musicstore.Models.Zanr", "Zanr")
                        .WithMany("Diskovi")
                        .HasForeignKey("ZanrId_Zanra");

                    b.Navigation("Zanr");
                });

            modelBuilder.Entity("musicstore.Models.Zanr", b =>
                {
                    b.HasOne("musicstore.Models.MusicStore", "MusicStore")
                        .WithMany("Zanrovi")
                        .HasForeignKey("MusicStoreId_Stora");

                    b.Navigation("MusicStore");
                });

            modelBuilder.Entity("musicstore.Models.MusicStore", b =>
                {
                    b.Navigation("Zanrovi");
                });

            modelBuilder.Entity("musicstore.Models.Zanr", b =>
                {
                    b.Navigation("Diskovi");
                });
#pragma warning restore 612, 618
        }
    }
}
