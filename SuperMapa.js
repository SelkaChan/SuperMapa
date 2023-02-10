class SuperMapa extends HTMLElement{

  constructor(ancho=200,alto=100,precision=1){
    super();
    this.ancho=this.getAttribute('ancho') || ancho;
    this.alto=this.getAttribute('alto') || alto;
    this.precision=this.getAttribute('precision') || precision;
    this.lat;
    this.long;
  }

  get ancho() {
    return this.getAttribute('ancho');
  }

  set ancho(a) {
    this.setAttribute('ancho', a);
  }

  get alto() {
    return this.getAttribute('alto');
  }

  set alto(a) {
    this.setAttribute('alto', a);
  }

  get precision() {
    return this.getAttribute('precision');
  }

  set precision(p) {
    this.setAttribute('precision', p);
  }

  get lat() {
    return this.getAttribute('lat');
  }

  set lat(l) {
    this.setAttribute('lat', l);
  }

  get long() {
    return this.getAttribute('long');
  }

  set long(l) {
    this.setAttribute('long', l);
  }
  static get observedAttributes() {
    return ['ancho','alto','precision','lat','long'];
  }

  attributeChangedCallback(name, old, now) {
    let supermapa = document.querySelector('super-mapa')
    let mapa = document.querySelector('iframe') || document.createElement('iframe');
    mapa.width = this.ancho;
    mapa.height = this.alto;

    switch (name) {
        case 'precision':
          posicionar(this.lat,this.long,this.precision);
        break;
        case 'lat':
          posicionar(this.lat,this.long,this.precision);
        break;
        case 'long':
          posicionar(this.lat,this.long,this.precision);
        break;    
        }
        
      navigator.geolocation.watchPosition((position) => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        posicionar(this.lat,this.long,this.precision);
      })
    mapa.style="border: 1px solid black"
    supermapa.append(mapa);
  }
}


let supermapa = document.querySelector('super-mapa');

function ampliar() {
  supermapa.precision = parseFloat(supermapa.precision)/10; 
}

function desampliar() {
  supermapa.precision = parseFloat(supermapa.precision)*10; 
}

function subir() {
  supermapa.lat= parseFloat(supermapa.lat) + 1;
}

function bajar() {
  supermapa.lat= parseFloat(supermapa.lat) - 1;
}

function izquierda() {
  supermapa.long= parseFloat(supermapa.long) - 1;
}

function derecha() {
  supermapa.long= parseFloat(supermapa.long) + 1;
}


function posicionar(lat,long,pres){
  let mapa = document.querySelector('iframe')
  mapa.src = `https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(long)-parseFloat(pres)},${parseFloat(lat)-parseFloat(pres)},${parseFloat(long)+parseFloat(pres)},${parseFloat(lat)+parseFloat(pres)}&layer=mapnik`
}


customElements.define('super-mapa',SuperMapa);