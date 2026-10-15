import type { Plan } from '../domain/plan'

export const localPlans: Plan[] = [
  {
    id: 'cafe-y-cartas', title: 'Cafe y cartas', description: 'Preparen una bebida rica y escribanse tres cartas cortitas: una para hoy, una para un recuerdo y una para el futuro.',
    moods: ['tranquilo', 'romantico'], budgets: ['bajo', 'medio'], durations: ['corto', 'medio'], durationLabel: '45 minutos', budgetLabel: 'Bajo',
    steps: ['Elijan una bebida y pongan musica suave.', 'Escriban tres notas sin mostrarlas.', 'Leanlas juntos y guarden su favorita.'],
  },
  {
    id: 'paseo-con-camara', title: 'Paseo con camara', description: 'Salgan a caminar sin rumbo fijo con una mision: sacar cinco fotos que quieran recordar.',
    moods: ['tranquilo', 'aventurero'], budgets: ['bajo', 'medio'], durations: ['medio', 'largo'], durationLabel: '1 a 2 horas', budgetLabel: 'Bajo',
    steps: ['Elijan un barrio que no recorran siempre.', 'Turnense para elegir cada proxima cuadra.', 'Cierren con una foto juntos.'],
  },
  {
    id: 'cena-sorpresa', title: 'Cena sorpresa en casa', description: 'Cada uno prepara una parte simple del menu sin contarle al otro hasta servir.',
    moods: ['romantico', 'creativo'], budgets: ['medio', 'alto'], durations: ['medio', 'largo'], durationLabel: '2 a 3 horas', budgetLabel: 'Medio',
    steps: ['Dividan plato principal y postre.', 'Elijan una regla divertida para la mesa.', 'Brinden por algo que quieran hacer juntos.'],
  },
  {
    id: 'noche-de-quiz', title: 'Noche de quiz mutuo', description: 'Armen preguntas sobre sus gustos, historias y pequenos detalles para descubrirse de nuevo.',
    moods: ['creativo', 'tranquilo'], budgets: ['bajo', 'medio', 'alto'], durations: ['corto', 'medio'], durationLabel: '1 hora', budgetLabel: 'Gratis',
    steps: ['Escriban diez preguntas cada uno.', 'Respondan sin apurarse.', 'El perdedor elige la proxima cita.'],
  },
  {
    id: 'mercado-y-picnic', title: 'Mercado y picnic', description: 'Compren ingredientes nuevos, armen una canasta y encuentren un lugar al aire libre.',
    moods: ['aventurero', 'romantico'], budgets: ['medio', 'alto'], durations: ['largo'], durationLabel: 'Toda la tarde', budgetLabel: 'Medio',
    steps: ['Pongan un limite de compra.', 'Elijan algo que nunca hayan probado.', 'Dejen el celular guardado durante el picnic.'],
  },
  {
    id: 'tarde-de-taller', title: 'Tarde de taller', description: 'Hagan algo con las manos: pintar, cocinar pan o armar una mini planta para su casa.',
    moods: ['creativo', 'aventurero'], budgets: ['bajo', 'medio', 'alto'], durations: ['medio', 'largo'], durationLabel: '2 horas', budgetLabel: 'Variable',
    steps: ['Elijan un proyecto pequeno.', 'No busquen que quede perfecto.', 'Guarden una foto del resultado.'],
  },
  {
    id: 'mini-escape', title: 'Mini escape urbano', description: 'Elijan un punto de la ciudad que nunca visitaron y lleguen usando una ruta distinta a la habitual.',
    moods: ['aventurero', 'tranquilo'], budgets: ['medio', 'alto'], durations: ['largo'], durationLabel: '3 a 4 horas', budgetLabel: 'Medio',
    steps: ['Definan una zona nueva.', 'Eviten el camino de siempre.', 'Cada uno elige una parada del recorrido.'],
  },
  {
    id: 'desayuno-lento', title: 'Desayuno lento', description: 'Transformen una manana comun en una cita sin pantallas y con su comida favorita.',
    moods: ['romantico', 'tranquilo'], budgets: ['bajo', 'medio', 'alto'], durations: ['corto', 'medio'], durationLabel: '1 hora', budgetLabel: 'Bajo',
    steps: ['Preparen algo que les guste a ambos.', 'Dejen los telefonos en otra habitacion.', 'Hablen de un plan que quieran cumplir este mes.'],
  },
]
