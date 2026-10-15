import type { Place, PlaceCategory, PriceLevel, Region } from '../domain/place'

const activityDetails: Record<string, Pick<Place, 'description' | 'recommendation'>> = {
  'pn-iguazu': {
    description: 'Recorran pasarelas y senderos dentro de la selva para conocer distintos saltos del lado argentino.',
    recommendation: 'Dedíquenle buena parte del día; revisen accesos, entradas y horarios antes de viajar.',
  },
  'garganta-diablo': {
    description: 'Una pasarela sobre el río lleva hasta uno de los miradores más imponentes de las Cataratas.',
    recommendation: 'Consulten el estado del acceso y los horarios del tren ecológico el mismo día.',
  },
  'circuito-superior': {
    description: 'Pasarelas elevadas ofrecen vistas panorámicas de varios saltos desde arriba.',
    recommendation: 'Lleven agua y calzado cómodo; verifiquen qué senderos están habilitados.',
  },
  'circuito-inferior': {
    description: 'Un recorrido entre vegetación y miradores permite acercarse a los saltos desde abajo.',
    recommendation: 'Calculen tiempo para caminar y consulten las condiciones del circuito antes de salir.',
  },
  'hito-argentino': {
    description: 'Un paseo junto al río Paraná con vistas hacia Brasil y Paraguay desde el punto de encuentro de los tres países.',
    recommendation: 'Vayan cerca del atardecer y consulten si hay actividades o espectáculos ese día.',
  },
  'feria-iguazu': {
    description: 'Puestos de productos regionales y opciones para probar comidas locales en el centro de Puerto Iguazú.',
    recommendation: 'Recórranla sin apuro y acuerden un presupuesto para compartir algo entre los dos.',
  },
  'costanera-iguazu': {
    description: 'Un paseo ribereño tranquilo para caminar y mirar el encuentro de los ríos Paraná e Iguazú.',
    recommendation: 'Lleven mate o algo para tomar y aprovechen la luz del atardecer.',
  },
  'minas-wanda': {
    description: 'Conozcan yacimientos de piedras semipreciosas y cómo se trabajan en esta visita en Wanda.',
    recommendation: 'Confirmen horarios, modalidad de visita y tarifas antes de hacer el viaje desde Iguazú.',
  },
  'parque-iguacu-br': {
    description: 'Senderos y miradores del lado brasileño ofrecen una vista amplia de las Cataratas del Iguazú.',
    recommendation: 'Revisen entradas, transporte interno y horarios en el sitio oficial antes de cruzar la frontera.',
  },
  'parque-aves': {
    description: 'Un recorrido por aviarios inmersivos permite observar aves de la Mata Atlántica y conocer proyectos de conservación.',
    recommendation: 'Combínenlo con las Cataratas brasileñas, que quedan cerca; revisen horarios y entradas.',
  },
  'itaipu-br': {
    description: 'Visitas guiadas para conocer la represa de Itaipú y sus instalaciones desde el lado brasileño.',
    recommendation: 'Hay distintos recorridos y horarios: reserven y confirmen los requisitos de acceso.',
  },
  'marco-br': {
    description: 'Un espacio junto al río con vistas a los tres países, propuestas culturales y un paseo al aire libre.',
    recommendation: 'Consulten la agenda y el horario de apertura; el atardecer suele ser un buen momento para ir.',
  },
  'itaipu-py': {
    description: 'Conozcan la central hidroeléctrica y su historia desde el lado paraguayo, en Hernandarias.',
    recommendation: 'Consulten qué visitas están disponibles y reserven con anticipación.',
  },
  'saltos-monday': {
    description: 'Pasarelas y miradores permiten contemplar la caída de agua del río Monday en Presidente Franco.',
    recommendation: 'Verifiquen horarios, entradas y condiciones del parque antes de trasladarse.',
  },
  'jardin-picaflores': {
    description: 'Un jardín pequeño para observar picaflores y hacer una pausa tranquila en Puerto Iguazú.',
    recommendation: 'Consulten los horarios de visita y recorran el espacio con calma para avistar aves.',
  },
  'templo-budista': {
    description: 'Un templo y jardín de esculturas en un entorno sereno de Foz do Iguaçu.',
    recommendation: 'Confirmen días y horarios de visita, y respeten las normas del espacio religioso.',
  },
  'mesquita-foz': {
    description: 'Una visita a la mezquita permite conocer parte de la diversidad cultural de Foz do Iguaçu.',
    recommendation: 'Consulten las condiciones de visita y vestimenta antes de ir; respeten los momentos de oración.',
  },
  'ecomuseu-itaipu': {
    description: 'Exposiciones sobre la historia de la región, la construcción de Itaipú y el entorno natural.',
    recommendation: 'Consulten horarios y entradas; puede combinarse con otros recorridos de Itaipú.',
  },
  'refugio-bela-vista': {
    description: 'Un recorrido de Itaipú dedicado a la fauna silvestre y a iniciativas de conservación.',
    recommendation: 'La visita puede requerir reserva y tiene horarios específicos: confirmen antes de ir.',
  },
  'rafain': {
    description: 'Una cena con espectáculo que reúne música y danzas de distintos países de América Latina.',
    recommendation: 'Revisen menú, horarios, traslados y necesidad de reserva antes de elegir la función.',
  },
  'tati-yupi': {
    description: 'Una reserva natural de Itaipú en Hernandarias, con propuestas para acercarse al paisaje y la fauna local.',
    recommendation: 'Confirmen disponibilidad, acceso y actividades habilitadas con Itaipú Paraguay.',
  },
}

function place(
  id: string, name: string, region: Region, category: PlaceCategory, country: string,
  locality: string, address: string, latitude: number, longitude: number, priceLevel: PriceLevel,
  officialUrl?: string,
): Place {
  const labels: Record<PriceLevel, string> = { gratis: 'Gratis', bajo: 'Bajo', medio: 'Medio', alto: 'Alto' }
  const details = activityDetails[id]
  return {
    id, name, region, category, country, locality, address, latitude, longitude, priceLevel, officialUrl,
    description: details?.description ?? (category === 'comer'
      ? `Una pausa para probar sabores locales en ${locality}.`
      : category === 'compras'
        ? `Un paseo por ${name} en ${locality}, con opciones para mirar y comprar.`
        : `${name} invita a descubrir ${locality} y una faceta distinta de la región.`),
    recommendation: details?.recommendation ?? (category === 'comer'
      ? 'Consulten horarios y menú; pueden combinar la parada con un paseo cercano.'
      : category === 'compras'
        ? 'Comparen precios y consulten medios de pago, horarios y límites aduaneros vigentes.'
        : 'Revisen horarios, reservas y condiciones antes de salir.'),
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
  place('macuco-safari', 'Macuco Safari', 'foz', 'visitar', 'Brasil', 'Foz do Iguaçu', 'Parque Nacional do Iguaçu, BR-469 km 25', -25.65, -54.44, 'alto', 'https://www.macucosafari.com.br/'),
  place('yup-star', 'Yup Star Foz', 'foz', 'visitar', 'Brasil', 'Foz do Iguaçu', 'Rua José Maria de Brito 1350', -25.54, -54.57, 'medio', 'https://yupstar.com.br/'),
  place('blue-park', 'Blue Park', 'foz', 'visitar', 'Brasil', 'Foz do Iguaçu', 'Rua José Maria de Brito 1350', -25.54, -54.57, 'alto', 'https://blueparkfoz.com.br/'),
  place('kattamaram', 'Paseo en barco Kattamaram', 'iguazu', 'visitar', 'Argentina', 'Puerto Iguazú', 'Puerto de Puerto Iguazú', -25.59, -54.57, 'alto', 'https://kattamaram.com/'),
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
