import { Disk } from "./disk.js";
import { MusicStore } from "./musicstore.js";
import { Zanr } from "./zanr.js";

// let b=new MusicStore("Ino-Shika-Cho");

// let zanr1=new Zanr("Rock",10);
// let zanr2=new Zanr("Metal",8);
// let zanr3=new Zanr("Hip-Hop",6);
// let zanr4=new Zanr("Pop",7);

// b.dodaj(zanr1);
// b.dodaj(zanr2);
// b.dodaj(zanr3);
// b.dodaj(zanr4);

// b.crtajMusicStore(document.body);

fetch("https://localhost:5001/MusicStore/PreuzmiStores", {
        method: "GET"
    }).then(p => p.json().then(data => {
        console.log(data);
        data.forEach(s => {
            const store = new MusicStore(s["naziv"]);
            s["zanrovi"].forEach(z => {
                const zanr = new Zanr(z["naziv"], z["maxDiskova"], z["trDiskova"], z["id_Zanra"])
                store.dodaj(zanr);
                if(z.diskovi){
                    z["diskovi"].forEach( d => {
                        zanr.dodajDisk(new Disk(d["naziv"],d["cena"],d["id_Diska"]));
                    })
                }
            })
            store.crtajMusicStore(document.body);
        });
    }));