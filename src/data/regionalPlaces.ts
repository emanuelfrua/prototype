import type { Place, PlaceCategory, PriceLevel, Region } from '../domain/place'

function place(
  id: string, name: string, region: Region, category: PlaceCategory, country: string,
  locality: string, address: string, latitude: number, longitude: number, priceLevel: PriceLevel,
  officialUrl?: string,
): Place {
  const labels: Record<PriceLevel, string> = { gratis: 'Gratis', bajo: 'Bajo', medio: 'Medio', alto: 'Alto' }
  return {
    id, name, region, category, country, locality, address, latitude, longitude, priceLevel, officialUrl,
    description: category === 'comer'
      ? 'Una parada gastronomica para sumar a un recorrido por la region.'
      : category === 'compras'
        ? 'Una opcion para recorrer con tiempo y un presupuesto definido.'
        : 'Una visita recomendada para descubrir la selva y la Triple Frontera.',
    recommendation: category === 'comer'
      ? 'Combinenlo con una caminata o un atardecer cerca.'
      : 'Revisen horarios, reservas y condiciones antes de salir.',
    priceLabel: `Rango ${labels[priceLevel]}`,
    priceNote: 'Costo orientativo. Confirmen tarifa, horarios y disponibilidad con el lugar.',
  }
}

export const regionalPlaces: Place[] = [
  place('pn-iguazu', 'Parque Nacional Iguazu', 'iguazu', 'visitar', 'Argentina', 'Puerto Iguazu', 'Ruta 101, Cataratas del Iguazu', -25.6953, -54.4367, 'alto', 'https://www.argentina.gob.ar/parquesnacionales/nea/parque-nacional-iguazu'),
  place('garganta-diablo', 'Garganta del Diablo', 'iguazu', 'visitar', 'Argentina', 'Cataratas del Iguazu', 'Parque Nacional Iguazu', -25.6953, -54.4367, 'alto', 'https://www.argentina.gob.ar/parquesnacionales/nea/parque-nacional-iguazu/planea-tu-visita'),
  place('circuito-superior', 'Circuito Superior', 'iguazu', 'visitar', 'Argentina', 'Cataratas del Iguazu', 'Parque Nacional Iguazu', -25.687, -54.444, 'alto'),
  place('circuito-inferior', 'Circuito Inferior', 'iguazu', 'visitar', 'Argentina', 'Cataratas del Iguazu', 'Parque Nacional Iguazu', -25.691, -54.443, 'alto'),
  place('la-aripuca', 'La Aripuca', 'iguazu', 'visitar', 'Argentina', 'Puerto Iguazu', 'Ruta Nacional 12 km 4', -25.6333, -54.4833, 'medio', 'https://aripuca.com.ar/'),
  place('guira-oga', 'Güira Oga', 'iguazu', 'visitar', 'Argentina', 'Puerto Iguazu', 'Ruta Nacional 12 km 5', -25.65, -54.47, 'medio', 'https://guiraoga.com.ar/'),
  place('hito-argentino', 'Hito Tres Fronteras', 'iguazu', 'visitar', 'Argentina', 'Puerto Iguazu', 'Av. Rio Parana', -25.597, -54.588, 'gratis'),
  place('feria-iguazu', 'Feirinha de Puerto Iguazu', 'iguazu', 'comer', 'Argentina', 'Puerto Iguazu', 'Av. Brasil, Puerto Iguazu', -25.597, -54.578, 'bajo'),
  place('costanera-iguazu', 'Costanera de Puerto Iguazu', 'iguazu', 'visitar', 'Argentina', 'Puerto Iguazu', 'Costanera del Rio Parana', -25.6, -54.579, 'gratis'),
  place('minas-wanda', 'Minas de Wanda', 'wanda', 'visitar', 'Argentina', 'Wanda', 'Ruta Nacional 12, Wanda', -25.9667, -54.5667, 'medio'),
  place('salto-bony', 'Salto Bony', 'wanda', 'visitar', 'Argentina', 'Wanda', 'Wanda, Misiones', -25.951, -54.59, 'bajo'),
  place('parque-iguacu-br', 'Parque Nacional do Iguaçu', 'foz', 'visitar', 'Brasil', 'Foz do Iguaçu', 'BR-469 km 18', -25.64, -54.45, 'alto', 'https://cataratasdoiguacu.com.br/'),
  place('parque-aves', 'Parque das Aves', 'foz', 'visitar', 'Brasil', 'Foz do Iguaçu', 'Av. das Cataratas 12450', -25.6253, -54.4458, 'alto', 'https://www.parquedasaves.com.br/'),
  place('itaipu-br', 'Itaipu Binacional', 'foz', 'visitar', 'Brasil', 'Foz do Iguaçu', 'Av. Tancredo Neves 6702', -25.4082, -54.5892, 'medio', 'https://www.itaipu.gov.br/visitas'),
  place('marco-br', 'Marco das Tres Fronteiras', 'foz', 'visitar', 'Brasil', 'Foz do Iguaçu', 'Av. General Meira', -25.595, -54.59, 'medio'),
  place('avenida-brasil', 'Avenida Brasil', 'foz', 'comer', 'Brasil', 'Foz do Iguaçu', 'Centro de Foz do Iguaçu', -25.545, -54.588, 'medio'),
  place('centro-foz', 'Centro de Foz do Iguaçu', 'foz', 'compras', 'Brasil', 'Foz do Iguaçu', 'Rua Almirante Barroso', -25.546, -54.588, 'medio'),
  place('itaipu-py', 'Itaipu Binacional - lado Paraguay', 'ciudad-del-este', 'visitar', 'Paraguay', 'Hernandarias', 'Central Hidroelectrica Itaipu', -25.4082, -54.5892, 'medio', 'https://www.itaipu.gov.py/'),
  place('saltos-monday', 'Saltos del Monday', 'ciudad-del-este', 'visitar', 'Paraguay', 'Presidente Franco', 'Parque Municipal Monday', -25.5167, -54.6167, 'medio'),
  place('lago-republica', 'Lago de la Republica', 'ciudad-del-este', 'visitar', 'Paraguay', 'Ciudad del Este', 'Centro de Ciudad del Este', -25.51, -54.62, 'gratis'),
  place('shopping-china', 'Shopping China', 'ciudad-del-este', 'compras', 'Paraguay', 'Ciudad del Este', 'Av. Adrian Jara', -25.51, -54.61, 'alto'),
  place('shopping-del-este', 'Shopping del Este', 'ciudad-del-este', 'compras', 'Paraguay', 'Ciudad del Este', 'Av. Monseñor Rodriguez', -25.51, -54.61, 'medio'),
  place('mercado-cde', 'Centro comercial de Ciudad del Este', 'ciudad-del-este', 'compras', 'Paraguay', 'Ciudad del Este', 'Microcentro', -25.51, -54.61, 'bajo'),
  place('gastronomia-cde', 'Gastronomia del microcentro', 'ciudad-del-este', 'comer', 'Paraguay', 'Ciudad del Este', 'Microcentro', -25.51, -54.61, 'medio'),
  place('jardin-picaflores', 'Jardin de los Picaflores', 'iguazu', 'visitar', 'Argentina', 'Puerto Iguazu', 'Fray Luis Beltran 150', -25.6, -54.58, 'bajo'),
  place('biocentro', 'Biocentro Iguazu', 'iguazu', 'visitar', 'Argentina', 'Puerto Iguazu', 'Ruta Nacional 12 km 4', -25.63, -54.48, 'medio'),
  place('selva-viva', 'Selva Viva', 'iguazu', 'visitar', 'Argentina', 'Puerto Iguazu', 'Puerto Iguazu', -25.6, -54.59, 'medio'),
  place('comunidad-mborore', 'Comunidad Mbya Guarani Jasy Porã', 'iguazu', 'visitar', 'Argentina', 'Puerto Iguazu', 'Puerto Iguazu', -25.62, -54.54, 'medio'),
  place('orquideario', 'Orquideario del Indio Solitario', 'iguazu', 'visitar', 'Argentina', 'Puerto Iguazu', 'Puerto Iguazu', -25.6, -54.58, 'bajo'),
  place('cafe-iguazu', 'Cafes del centro de Puerto Iguazu', 'iguazu', 'comer', 'Argentina', 'Puerto Iguazu', 'Centro', -25.597, -54.578, 'bajo'),
  place('templo-budista', 'Templo Budista Chen Tien', 'foz', 'visitar', 'Brasil', 'Foz do Iguaçu', 'Rua Dr. Josivalter Vila Nova', -25.49, -54.55, 'gratis'),
  place('mesquita-foz', 'Mesquita Omar Ibn Al-Khattab', 'foz', 'visitar', 'Brasil', 'Foz do Iguaçu', 'Rua Meca 599', -25.53, -54.57, 'gratis'),
  place('ecomuseu-itaipu', 'Ecomuseu de Itaipu', 'foz', 'visitar', 'Brasil', 'Foz do Iguaçu', 'Av. Tancredo Neves 6702', -25.408, -54.589, 'medio'),
  place('refugio-bela-vista', 'Refugio Biologico Bela Vista', 'foz', 'visitar', 'Brasil', 'Foz do Iguaçu', 'Itaipu Binacional', -25.43, -54.59, 'medio'),
  place('dreamland', 'Dreamland Museu de Cera', 'foz', 'visitar', 'Brasil', 'Foz do Iguaçu', 'Av. das Cataratas 8100', -25.61, -54.49, 'alto'),
  place('catuaí', 'Catuaí Palladium', 'foz', 'compras', 'Brasil', 'Foz do Iguaçu', 'Av. das Cataratas 3570', -25.57, -54.52, 'medio'),
  place('rafain', 'Rafain Churrascaria Show', 'foz', 'comer', 'Brasil', 'Foz do Iguaçu', 'Av. das Cataratas 1749', -25.56, -54.55, 'alto'),
  place('tati-yupi', 'Reserva Natural Tatí Yupí', 'ciudad-del-este', 'visitar', 'Paraguay', 'Hernandarias', 'Hernandarias', -25.42, -54.63, 'gratis'),
  place('lago-acaray', 'Lago Acaray', 'ciudad-del-este', 'visitar', 'Paraguay', 'Ciudad del Este', 'Area del Lago Acaray', -25.49, -54.66, 'gratis'),
  place('catedral-san-blas', 'Catedral San Blas', 'ciudad-del-este', 'visitar', 'Paraguay', 'Ciudad del Este', 'Centro', -25.51, -54.62, 'gratis'),
  place('plaza-paz', 'Plaza de la Paz', 'ciudad-del-este', 'visitar', 'Paraguay', 'Ciudad del Este', 'Centro', -25.51, -54.61, 'gratis'),
]
