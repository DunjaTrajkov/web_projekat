import { Disk } from "./disk.js";
import { Zanr } from "./zanr.js";

export class MusicStore{

    constructor(naziv){
        if(!naziv){
            this.naziv="";
        }
        else{
            this.naziv=naziv;
        }
        this.listaZanrova=[];
        this.container=null;
    }

    dodaj(zanr){
        this.listaZanrova.push(zanr);
    }

    crtajMusicStore(roditeljskiProstor){

        if(!this.container)
        {
            this.container=document.createElement("div");
            this.container.className="musicstore";
            roditeljskiProstor.appendChild(this.container);
        }

        let nazivStora=document.createElement("label");
        nazivStora.innerHTML=this.naziv;
        nazivStora.className="nazivStora";
        this.container.appendChild(nazivStora);

        let ostalo=document.createElement("div");
        ostalo.className="ostalo";
        this.container.appendChild(ostalo);

        let zanrovi=document.createElement("div");
        zanrovi.className="zanrovi";
        ostalo.appendChild(zanrovi);

        this.listaZanrova.forEach((zanr,index)=>{
            zanr.crtajZanr(zanrovi);
        })

        this.crtajFormu(ostalo);
    }


    crtajFormu(roditeljskiProstor)
    {
        let forma=document.createElement("div");
        forma.className="forma";
        roditeljskiProstor.appendChild(forma);

        let diskForma=document.createElement("div");
        diskForma.className="diskforma";
        forma.appendChild(diskForma);

        let zanroviForma=document.createElement("div");
        zanroviForma.className="zanroviforma";
        forma.appendChild(zanroviForma);

        let dodajZanrForma=document.createElement("div");
        dodajZanrForma.className="dodajzanr";
        forma.appendChild(dodajZanrForma);

        this.crtajFormuDisk(diskForma);
        this.crtajFormuZanrovi(zanroviForma);
        this.crtajFormuDodajZanr(dodajZanrForma);
    }

    crtajFormuDisk(roditeljskiProstor)
    {
        let labelaPostojeci = document.createElement("label");
        labelaPostojeci.innerHTML="Izaberite postojeci disk";
        labelaPostojeci.className="labelaNaziv";
        roditeljskiProstor.appendChild(labelaPostojeci);

        let selection = document.createElement("select");
        selection.className="selectDisk";
        selection.name="disk";
        
        this.listaZanrova.forEach(zanr => {
            zanr.diskovi.forEach(disk => {
                let option = document.createElement("option");
                option.innerHTML=disk.naziv;
                option.value=disk.DiskId;
                selection.appendChild(option);
            })
        })
        selection.onchange=()=>this.prikaziDisk();
        roditeljskiProstor.appendChild(selection);

        let labelaNaziv = document.createElement("label");
        labelaNaziv.className="labelaNaziv";
        labelaNaziv.innerHTML="Naziv diska"
        roditeljskiProstor.appendChild(labelaNaziv);

        let inputNaziv = document.createElement("input");
        inputNaziv.type="text";
        inputNaziv.className="inputNaziv";
        roditeljskiProstor.appendChild(inputNaziv);

        let labelaCena = document.createElement("label");
        labelaCena.className="labelaNaziv";
        labelaCena.innerHTML="Cena diska";
        roditeljskiProstor.appendChild(labelaCena);

        let inputCena = document.createElement("input");
        inputCena.type="number";
        inputCena.className="inputCena";
        roditeljskiProstor.appendChild(inputCena);
    }

    crtajFormuZanrovi(roditeljskiProstor)
    {
        let radioDugmici=document.createElement("div");
        radioDugmici.className="radioDugmici";
        roditeljskiProstor.appendChild(radioDugmici);

        this.listaZanrova.forEach((zanr,index)=>{
            let divRadio=document.createElement("div");
            divRadio.className="divRadio";
            radioDugmici.appendChild(divRadio);

            let inpRadio=document.createElement("input");
            inpRadio.type="radio";
            inpRadio.name="radio";
            inpRadio.value=index;
            divRadio.appendChild(inpRadio);

            let labelaZanr=document.createElement("label");
            labelaZanr.innerHTML=zanr.naziv;
            labelaZanr.className="labelaZanr";
            divRadio.appendChild(labelaZanr);
        })

        let dugme=document.createElement("button");
        dugme.innerHTML="Dodaj disk";
        dugme.className="dugme";
        dugme.onclick=()=>this.dodajDiskove();
        roditeljskiProstor.appendChild(dugme);

        let dugme2=document.createElement("button");
        dugme2.innerHTML="Izmeni disk";
        dugme2.className="dugme";
        dugme2.onclick=()=>this.izmeniDisk();
        roditeljskiProstor.appendChild(dugme2);

        let dugme3=document.createElement("button");
        dugme3.innerHTML="Izbriši disk";
        dugme3.className="dugme";
        dugme3.onclick=()=>this.izbrisiDisk();
        roditeljskiProstor.appendChild(dugme3);
    }

    crtajFormuDodajZanr(roditeljskiProstor)
    {
        let labelaNaziv = document.createElement("label");
        labelaNaziv.className="labelaNaziv";
        labelaNaziv.innerHTML="Naziv Zanra";
        roditeljskiProstor.appendChild(labelaNaziv);

        let inputNaziv = document.createElement("input");
        inputNaziv.type = "text";
        inputNaziv.className = "inputNaziv";
        roditeljskiProstor.appendChild(inputNaziv);

        let labelaMax = document.createElement("label");
        labelaMax.className="labelaMax";
        labelaMax.innerHTML="Maximalno Diskova";
        roditeljskiProstor.appendChild(labelaMax);

        let inputMax = document.createElement("input");
        inputMax.type = "number";
        inputMax.className = "inputMaxDiskova";
        roditeljskiProstor.appendChild(inputMax);

        let dugme=document.createElement("button");
        dugme.innerHTML="Dodaj zanr";
        dugme.className="dugme";
        dugme.onclick=()=>this.dodajZanr();
        roditeljskiProstor.appendChild(dugme);
    }

    dodajDiskove(){
        let gde=this.container.querySelector("input[type=radio]:checked").value;
        let naziv = this.container.querySelector("input[type=text]").value;
        let cena = this.container.querySelector(".inputCena").value;

        let disk = new Disk(naziv,cena);

        if(this.listaZanrova[gde].trDiskova+1<=this.listaZanrova[gde].maxDiskova)
        {
            this.listaZanrova[gde].trDiskova+=1;
            this.listaZanrova[gde].dodajDisk(disk);
            // this.listaZanrova[gde].container.innerHTML="";
            // this.listaZanrova[gde].crtajZanr();

            fetch("https://localhost:5001/MusicStore/DodajDisk/"+naziv+"/"+cena+"/"+this.listaZanrova[gde].ZanrId, {
                method: "PUT"
            });
            location.reload();
            location.reload();
        }
        else{
            alert("Nema dovoljno mesta!");
        }
    }

    izmeniDisk()
    {
        let gde=this.container.querySelector("input[type=radio]:checked").value;
        let naziv = this.container.querySelector("input[type=text]").value;
        let cena = this.container.querySelector(".inputCena").value;
        let id = this.container.querySelector("select").value;

        let disk = new Disk(naziv,cena,id);

        fetch("https://localhost:5001/MusicStore/IzmeniDisk/"+id+"/"+naziv+"/"+cena+"/"+this.listaZanrova[gde].ZanrId, {
                method: "PUT"
            });
        
        location.reload();
        location.reload();
    }

    izbrisiDisk()
    {
        let id = this.container.querySelector("select").value;

        fetch("https://localhost:5001/MusicStore/IzbrisiDisk/"+id, {
            method: "DELETE"
        });

        location.reload();
    }

    dodajZanr()
    {
        let forma = this.container.querySelector(".dodajzanr");
        let naziv = forma.querySelector("input[type=text]").value;
        let maxD = forma.querySelector("input[type=number]").value;

        this.dodaj(new Zanr(naziv,maxD));
        this.container.innerHTML="";
        this.listaZanrova.forEach(zanr => {
            zanr.container=null;
        });
        this.crtajMusicStore();
    }

    prikaziDisk()
    {
        let disk_id = this.container.querySelector("select").value;
        let naziv, cena, zanr_id;
        this.listaZanrova.forEach(zanr => {
            zanr.diskovi.forEach(disk => {
                if(disk.DiskId==disk_id)
                {
                    naziv=disk.naziv;
                    cena=disk.cena;
                    zanr_id=zanr.ZanrId-1;
                }
            })
        })

        let inputNaziv = this.container.querySelector(".diskforma").querySelector("input[type=text]");
        inputNaziv.value = naziv;
        let inputCena = this.container.querySelector(".diskforma").querySelector("input[type=number]");
        inputCena.value = cena;
        let radioZanr = this.container.querySelector(".radioDugmici").querySelector("input[type=radio][value=\""+zanr_id+"\"]");
        radioZanr.checked = true;
    }

    osveziPrikaz()
    {
        this.container.innerHTML="";
        this.listaZanrova.forEach(zanr => {
            zanr.container=null;
        });
        this.crtajMusicStore();
    }
}