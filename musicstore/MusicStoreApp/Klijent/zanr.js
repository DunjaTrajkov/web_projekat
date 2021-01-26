export class Zanr{

    constructor(naziv,maxDiskova, trDiskova, id){
        if(!naziv){
            this.naziv="";
        }
        else{
            this.naziv=naziv;
        }
        if(!maxDiskova){
            this.maxDiskova=10;
        }
        else{
            this.maxDiskova=maxDiskova;
        }
        if(!trDiskova){
            this.trDiskova=0;
        }
        else{
            this.trDiskova=trDiskova;
        }
        this.ZanrId = id;
        this.container=null;
        this.diskovi = [];
    }

    crtajZanr(roditeljskiProstor){

        if(!this.container)
        {
            this.container=document.createElement("div");
            this.container.className="zanr";
            roditeljskiProstor.appendChild(this.container);
        }

        const labelaNaziv=document.createElement("label");
        labelaNaziv.innerHTML=this.naziv;
        labelaNaziv.className="labelaNaziv";
        this.container.appendChild(labelaNaziv);

        const divDiskovi=document.createElement("div");
        divDiskovi.className="divDiskovi";
        this.container.appendChild(divDiskovi);

        for(let i=0;i<this.maxDiskova;i++){
            if(this.diskovi[i] != null)
            {
                this.diskovi[i].crtajDisk(divDiskovi);
            }
            else
            {
                let disk=document.createElement("div");
                disk.className="disk";
                divDiskovi.appendChild(disk);
            }
        }

        let labelaStatus=document.createElement("label");
        labelaStatus.innerHTML=this.trDiskova+"/"+this.maxDiskova;
        labelaStatus.className="labelaStatus";
        this.container.appendChild(labelaStatus);
    }


    dodajDisk(disk)
    {
        this.diskovi.push(disk);
    }
}