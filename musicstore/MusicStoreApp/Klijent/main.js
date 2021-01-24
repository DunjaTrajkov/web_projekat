import { Disk } from "./disk.js";
import { MusicStore } from "./musicstore.js";
import { Zanr } from "./zanr.js";

// let b=new MusicStore("Ino-Shika-Cho");

// let zanr1=new Zanr("Rock",10);
// let zanr2=new Zanr("Metal",8);
// let zanr3=new Zanr("Hip-Hop",6);
// let zanr4=new Zanr("Kungfuzija",7);

// b.dodaj(zanr1);
// b.dodaj(zanr2);
// b.dodaj(zanr3);
// b.dodaj(zanr4);

// b.crtajMusicStore(document.body);

fetch("https://localhost:5500/MusicStore/PreuzmiStores", {
        method: "GET"
    }).then(p => p.json().then(data => {
        data.forEach(s => {
            const store = new musicstore(s["Naziv"]);
            s["Zanrovi"].foreach(zanr => {
                store.Dodaj(new Zanr(zanr["Naziv"], zanr["MaxDiskova"], zanr["Id_Zanra"]));
                zanr["Diskovi"].forEach( d => {
                    zanr.DodajDisk(new Disk(d["Naziv"],d["Cena"],d["Id_Diska"]));
                })
            })
        });
    }));