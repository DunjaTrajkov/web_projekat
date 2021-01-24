export class Disk
{
    constructor(naziv, cena, id)
    {
        if(!naziv)
        {
            this.naziv="Default";
        }
        else
        {
            this.naziv=naziv;
        }
        if(!cena)
        {
            this.cena=150;
        }
        else
        {
            this.cena=cena;
        }
        this.container=null;
        this.DiskId = id;
    }

    crtajDisk(roditeljskiProstor){

        this.container=document.createElement("div");
        this.container.className="disk";
        roditeljskiProstor.appendChild(this.container);

        const labelaNaziv=document.createElement("label");
        labelaNaziv.innerHTML=this.naziv;
        labelaNaziv.className="labelaNaziv";
        this.container.appendChild(labelaNaziv);

        const labelaCena=document.createElement("label");
        labelaCena.innerHTML=this.cena + " din";
        labelaCena.className="labelaCena";
        this.container.appendChild(labelaCena);

        this.container.style.backgroundColor="lime";
    }

}