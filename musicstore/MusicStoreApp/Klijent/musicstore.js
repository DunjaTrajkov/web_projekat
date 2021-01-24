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

        let knjigaForma=document.createElement("div");
        knjigaForma.className="knjigaforma";
        forma.appendChild(knjigaForma);

        let zanroviForma=document.createElement("div");
        zanroviForma.className="zanroviforma";
        forma.appendChild(zanroviForma);

        let dodajZanrForma=document.createElement("div");
        dodajZanrForma.className="dodajzanr";
        forma.appendChild(dodajZanrForma);

        this.crtajFormuKnjiga(knjigaForma);
        this.crtajFormuZanrovi(zanroviForma);
        this.crtajFormuDodajZanr(dodajZanrForma);
    }

    crtajFormuKnjiga(roditeljskiProstor)
    {
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

        /*let brojDiskova=document.createElement("label");
        brojDiskova.innerHTML="Broj diskova:";
        brojDiskova.className="brojDiskova";
        forma.appendChild(brojDiskova);

        let inputBrojDiskova=document.createElement("input");
        inputBrojDiskova.type="number";
        inputBrojDiskova.className="inputBrojDiskova";
        forma.appendChild(inputBrojDiskova);*/

        let dugme=document.createElement("button");
        dugme.innerHTML="Dodaj disk";
        dugme.className="dugme";
        dugme.onclick=()=>this.dodajDiskove();
        roditeljskiProstor.appendChild(dugme);
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
        //let koliko=parseInt(this.container.querySelector(".inputBrojDiskova").value);
        let naziv = this.container.querySelector("input[type=text]").value;
        let cena = this.container.querySelector(".inputCena").value;

        let disk = new Disk(naziv,cena);
        console.log(disk);

        if(this.listaZanrova[gde].trDiskova+1<=this.listaZanrova[gde].maxDiskova)
        {
            this.listaZanrova[gde].trDiskova+=1;
            this.listaZanrova[gde].dodajDisk(disk);
            this.listaZanrova[gde].container.innerHTML="";
            this.listaZanrova[gde].crtajZanr();
        }
        else{
            alert("Nema dovoljno mesta!");
        }
    }

    dodajZanr()
    {
        let forma = this.container.querySelector(".dodajzanr");
        let naziv = forma.querySelector("input[type=text]").value;
        let maxD = forma.querySelector("input[type=number]").value;

        this.dodaj(new Zanr(naziv,maxD));
        let zanrovi = this.container.querySelector(".zanrovi");
        this.container.innerHTML="";
        this.listaZanrova.forEach(zanr => {
            zanr.container=null;
            console.log(zanr.container);
        });
        this.crtajMusicStore();
    }
}