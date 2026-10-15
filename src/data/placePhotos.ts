import type { Region } from '../domain/place'

interface PlacePhoto {
  src: string
  alt: string
  author: string
  license: string
  sourceUrl: string
}

export const regionalPhotos: Partial<Record<Region, PlacePhoto>> = {
  iguazu: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Cataratas027.jpg',
    alt: 'Vista de las Cataratas del Iguazu',
    author: 'Anouchka Unel',
    license: 'FAL',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cataratas027.jpg',
  },
  wanda: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Entrada_Mina_de_Wanda_Tierra_Colorada_%28Wanda%2C_Misiones%2C_Argentina%29.jpg',
    alt: 'Entrada de una mina en Wanda, Misiones',
    author: 'Horacio Cambeiro',
    license: 'CC BY 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Entrada_Mina_de_Wanda_Tierra_Colorada_(Wanda,_Misiones,_Argentina).jpg',
  },
  foz: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Foz_do_Igua%C3%A7%C3%BA_-_Parque_das_Aves_-_Foz_do_Igua%C3%A7u_-_Bird%27s_Park_%2814430137634%29.jpg',
    alt: 'Parque das Aves en Foz do Iguacu',
    author: 'Deni Williams',
    license: 'CC BY 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Foz_do_Igua%C3%A7%C3%BA_-_Parque_das_Aves_-_Foz_do_Igua%C3%A7u_-_Bird%27s_Park_(14430137634).jpg',
  },
  'ciudad-del-este': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Saltos_del_Monday%2C_Presidente_Franco%2C_Alto_Paran%C3%A1%2C_Paraguay_%2843%29.jpg',
    alt: 'Saltos del Monday cerca de Ciudad del Este',
    author: 'FFE.Franco',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Saltos_del_Monday,_Presidente_Franco,_Alto_Paran%C3%A1,_Paraguay_(43).jpg',
  },
}
