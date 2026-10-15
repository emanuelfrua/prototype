import type { Place } from '../domain/place'

export const localPlaces: Place[] = [
  {
    id: 'el-ateneo', name: 'El Ateneo Grand Splendid', area: 'caba', locality: 'Recoleta',
    address: 'Av. Santa Fe 1860, CABA', description: 'Una libreria montada en un antiguo teatro, ideal para perderse entre libros y cerrar con un cafe.',
    recommendation: 'Elijan un libro para el otro con un presupuesto acordado.', priceLevel: 'gratis', priceLabel: 'Entrada sin cargo',
    priceNote: 'El cafe y las compras se cobran aparte.', latitude: -34.5977, longitude: -58.3949,
    officialUrl: 'https://www.elateneo.com/',
  },
  {
    id: 'reserva-ecologica', name: 'Reserva Ecologica Costanera Sur', area: 'caba', locality: 'Puerto Madero',
    address: 'Av. Dr. Tristan Achaval Rodriguez 1550, CABA', description: 'Senderos, lagunas y costa para una caminata tranquila con vistas al Rio de la Plata.',
    recommendation: 'Vayan al atardecer y lleven agua, protector solar y algo para merendar.', priceLevel: 'gratis', priceLabel: 'Entrada sin cargo',
    priceNote: 'Verifiquen horarios de apertura antes de salir.', latitude: -34.6211, longitude: -58.3545,
    officialUrl: 'https://buenosaires.gob.ar/areas-protegidas/reserva-ecologica-costanera-sur',
  },
  {
    id: 'jardin-japones', name: 'Jardin Japones', area: 'caba', locality: 'Palermo',
    address: 'Av. Casares 3450, CABA', description: 'Puentes, estanques y jardines para una cita lenta entre paisajes cuidados.',
    recommendation: 'Combinen la visita con una caminata por los Bosques de Palermo.', priceLevel: 'medio', priceLabel: 'Entrada paga',
    priceNote: 'Consulten la tarifa y los descuentos vigentes antes de ir.', latitude: -34.5795, longitude: -58.4114,
    officialUrl: 'https://jardinjapones.org.ar/',
  },
  {
    id: 'malba', name: 'MALBA', area: 'caba', locality: 'Palermo',
    address: 'Av. Figueroa Alcorta 3415, CABA', description: 'Arte latinoamericano, exposiciones temporarias y una buena excusa para conversar sin apuro.',
    recommendation: 'Elijan una obra cada uno y cuenten por que la eligieron.', priceLevel: 'medio', priceLabel: 'Entrada paga',
    priceNote: 'La tarifa, horarios y dias gratuitos pueden cambiar.', latitude: -34.5776, longitude: -58.403,
    officialUrl: 'https://www.malba.org.ar/',
  },
  {
    id: 'puerto-frutos', name: 'Puerto de Frutos', area: 'norte', locality: 'Tigre',
    address: 'Sarmiento 160, Tigre', description: 'Paseo junto al delta con puestos, artesanias y propuestas para comer.',
    recommendation: 'Vayan temprano y sumen un paseo por el borde del rio.', priceLevel: 'gratis', priceLabel: 'Entrada sin cargo',
    priceNote: 'Las compras, comidas y paseos fluviales tienen costo aparte.', latitude: -34.4256, longitude: -58.5796,
    officialUrl: 'https://www.tigre.gob.ar/',
  },
  {
    id: 'paseo-vicente-lopez', name: 'Paseo de la Costa', area: 'norte', locality: 'Vicente Lopez',
    address: 'Laprida y el Rio, Vicente Lopez', description: 'Costanera amplia para mate, bici o una caminata mirando el rio.',
    recommendation: 'Lleven una manta y armen un picnic sencillo al caer el sol.', priceLevel: 'gratis', priceLabel: 'Acceso sin cargo',
    priceNote: 'Calculen aparte comida, alquileres o estacionamiento.', latitude: -34.5304, longitude: -58.4866,
  },
  {
    id: 'parque-lloira', name: 'Parque Leloir', area: 'oeste', locality: 'Ituzaingo',
    address: 'Martin Fierro 3300, Ituzaingo', description: 'Entorno arbolado para una salida relajada con cafes y gastronomia cerca.',
    recommendation: 'Elijan una cafeteria y despues hagan un paseo a pie por la zona.', priceLevel: 'bajo', priceLabel: 'Acceso sin cargo',
    priceNote: 'El gasto depende del lugar que elijan para comer o tomar algo.', latitude: -34.64, longitude: -58.688,
  },
  {
    id: 'republica-ninos', name: 'Republica de los Ninos', area: 'sur', locality: 'Gonnet, La Plata',
    address: 'Camino General Belgrano y 501, Gonnet', description: 'Parque tematico al aire libre para una salida diferente de dia completo.',
    recommendation: 'Revisen la agenda del dia y dejen tiempo para recorrer sin apuro.', priceLevel: 'bajo', priceLabel: 'Acceso y actividades variables',
    priceNote: 'Confirmen el valor de atracciones y horarios antes de viajar.', latitude: -34.9065, longitude: -58.0077,
    officialUrl: 'https://www.laplata.gob.ar/',
  },
]
