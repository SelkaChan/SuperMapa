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
  static get observedAttributes() {
    return ['ancho','alto','precision'];
  }

  attributeChangedCallback(name, old, now) {
    let supermapa = document.querySelector('super-mapa')
    let mapa = document.querySelector('iframe') || document.createElement('iframe');

    switch (name) {
      case 'ancho':
        mapa.width = now;
        break;
        case 'alto':
          mapa.height = now;
          break;
        case 'precision':
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

function posicionar(lat,long,pres){
  let mapa = document.querySelector('iframe')
  mapa.src = `https://www.openstreetmap.org/export/embed.html?bbox=${long-parseFloat(pres)},${lat-parseFloat(pres)},${long+parseFloat(pres)},${lat+parseFloat(pres)}&layer=mapnik`
}


customElements.define('super-mapa',SuperMapa);