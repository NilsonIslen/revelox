const answerField = {
  key: 'answer',
  label: 'Respuesta',
  type: 'textarea',
  placeholder: 'Respuesta privada',
}

const createQuestion = (id, prompt, fields = [answerField], publicPrompt) => ({
  id,
  prompt,
  publicPrompt: publicPrompt ?? createPublicPrompt(prompt),
  suggestedPrice: '0.10',
  fields,
})

const createPublicPrompt = (prompt) => {
  const cleanPrompt = prompt.replace(/\s+/g, ' ').trim()

  if (cleanPrompt.startsWith('Haz una lista de ')) {
    return `Lista del anfitrión de ${lowerFirst(
      toHostText(cleanPrompt)
        .replace(/^Haz una lista de /, '')
        .replace(/\.$/, ''),
    )}`
  }

  if (cleanPrompt.startsWith('Ordena ')) {
    return `Orden del anfitrión de ${lowerFirst(
      toHostText(cleanPrompt)
        .replace(/^Ordena /, '')
        .replace(/\.$/, ''),
    )}`
  }

  if (cleanPrompt.startsWith('¿')) {
    return `Revelación del anfitrión: ${toHostText(cleanPrompt)}`
  }

  return toHostText(cleanPrompt)
}

const lowerFirst = (value) =>
  value ? `${value.charAt(0).toLowerCase()}${value.slice(1)}` : value

const toHostText = (value) =>
  value
    .replaceAll('tu pareja', 'la pareja del anfitrión')
    .replaceAll('tu relación actual', 'la relación actual del anfitrión')
    .replaceAll('tu vida sexual actual', 'la vida sexual actual del anfitrión')
    .replaceAll('tu vida', 'la vida del anfitrión')
    .replaceAll('tu mente', 'la mente del anfitrión')
    .replaceAll('tu lista', 'la lista del anfitrión')
    .replaceAll('tus respuestas', 'las respuestas del anfitrión')
    .replaceAll('tus metas', 'las metas del anfitrión')
    .replaceAll('tus compromisos', 'los compromisos del anfitrión')
    .replaceAll('tus preocupaciones', 'las preocupaciones del anfitrión')
    .replaceAll('tus ', 'sus ')
    .replaceAll(' tu ', ' su ')
    .replaceAll('sobre ti', 'sobre el anfitrión')
    .replaceAll('de ti', 'del anfitrión')
    .replaceAll('en ti', 'en el anfitrión')
    .replaceAll('para ti', 'para el anfitrión')
    .replaceAll('a ti', 'al anfitrión')
    .replaceAll('que más te atraen', 'que más atraen al anfitrión')
    .replaceAll('te atraen', 'atraen al anfitrión')
    .replaceAll('te atrae', 'atrae al anfitrión')
    .replaceAll('que más te preocupa', 'que más preocupa al anfitrión')
    .replaceAll('que más te preocupan', 'que más preocupan al anfitrión')
    .replaceAll('te preocuparía', 'preocuparía al anfitrión')
    .replaceAll('que más te hacen', 'que más hacen sentir al anfitrión')
    .replaceAll('te gustaría', 'al anfitrión le gustaría')
    .replaceAll('te generan', 'generan al anfitrión')
    .replaceAll('te genera', 'genera al anfitrión')
    .replaceAll('te resulta', 'resulta al anfitrión')
    .replaceAll('te resultan', 'resultan al anfitrión')
    .replaceAll('te hacen', 'hacen al anfitrión')
    .replaceAll('te hace', 'hace al anfitrión')
    .replaceAll('que más buscas', 'que más busca el anfitrión')
    .replaceAll('buscas', 'busca el anfitrión')
    .replaceAll('disfrutas', 'disfruta el anfitrión')
    .replaceAll('estarías dispuesto', 'estaría dispuesto el anfitrión')
    .replaceAll('tienes una', 'tiene una')
    .replaceAll('. Ordénalas', ', ordenadas')
    .replaceAll('. Ordénalos', ', ordenados')
    .replaceAll(
      '. Opcionalmente explica por qué cada una ocupa ese lugar',
      ', con explicación opcional de por qué cada una ocupa ese lugar',
    )
    .replaceAll(
      'Si alguna persona aparece por encima de la pareja del anfitrión, explica por qué',
      'incluyendo explicación si alguna persona aparece por encima de la pareja del anfitrión',
    )
    .replaceAll(' explica por qué', ' con explicación')
    .replaceAll('. incluyendo', ', incluyendo')

export const questions = [
  createQuestion(1, 'Nombre completo', [
    {
      key: 'fullName',
      label: 'Nombre completo',
      type: 'text',
      placeholder: 'Nombre completo',
    },
  ], 'Nombre completo del anfitrión'),
  createQuestion(4, 'Fecha de nacimiento', [
    {
      key: 'birthDate',
      label: 'Fecha de nacimiento',
      type: 'date',
      placeholder: 'Fecha de nacimiento',
    },
  ], 'Fecha de nacimiento del anfitrión'),
  createQuestion(2, 'Número de contacto', [
    {
      key: 'contactNumber',
      label: 'Número de contacto',
      type: 'tel',
      placeholder: 'Número de contacto',
    },
  ], 'Número de contacto del anfitrión'),
  createQuestion(3, 'Ciudad y barrio de residencia', [
    {
      key: 'city',
      label: 'Ciudad',
      type: 'text',
      placeholder: 'Ciudad',
    },
    {
      key: 'neighborhood',
      label: 'Barrio',
      type: 'text',
      placeholder: 'Barrio',
    },
  ], 'Ciudad y barrio de residencia del anfitrión'),
  createQuestion(
    5,
    'Galería personal. Comparte un enlace a un álbum de fotografías que desees asociar a tu perfil. Puedes utilizar servicios como Google Photos, Google Drive, iCloud, Dropbox u otros similares.',
    [
      {
        key: 'gallery',
        label: 'Link del álbum',
        type: 'url',
        placeholder:
          'Link de Google Fotos, iCloud, Drive u otro álbum',
        optional: true,
      },
    ],
    'Galería personal del anfitrión',
  ),
  createQuestion(
    6,
    'Haz una lista de las personas que actualmente ocupan espacio en tu mente. Ordénalas desde la que más espacio ocupa hasta la que menos. Opcionalmente explica por qué cada una ocupa ese lugar.',
  ),
  createQuestion(
    7,
    'Haz una lista de las sustancias o comportamientos que utilizas para relajarte, desconectarte, aliviar ansiedad o sentir placer. Ordénalos desde el que más utilizas hasta el que menos.',
  ),
  createQuestion(
    8,
    'Haz una lista de los aspectos de tu vida sexual que más te gustaría cambiar actualmente. Ordénalos desde el más importante hasta el menos importante. Puedes incluir aspectos relacionados con: frecuencia sexual, deseo sexual, atracción hacia tu pareja, satisfacción sexual, comunicación sobre sexo, iniciativa propia, iniciativa de tu pareja, confianza, intimidad emocional, variedad, fantasías no realizadas, compatibilidad sexual, inseguridades físicas, inseguridades emocionales, tiempo disponible, privacidad, espontaneidad, calidad de los encuentros, capacidad para expresar deseos, capacidad para expresar límites, experiencias que te gustaría vivir, experiencias que te gustaría repetir, experiencias que te gustaría evitar. Puedes eliminar, añadir o modificar cualquier elemento. Opcionalmente explica por qué cada aspecto ocupa esa posición.',
    [answerField],
    'Lista del anfitrión de los aspectos de su vida sexual que más le gustaría cambiar actualmente, ordenados desde el más importante hasta el menos importante',
  ),
  createQuestion(
    9,
    'Haz una lista de las características físicas que más te atraen en una pareja. Ordénalas desde la más importante hasta la menos importante.',
  ),
  createQuestion(
    10,
    'Haz una lista de las preocupaciones que más ocupan tu mente actualmente. Ordénalas desde la más importante hasta la menos importante.',
  ),
  createQuestion(
    11,
    'Haz una lista de las personas que todavía te generan resentimiento, rabia o dolor. Ordénalas desde la que más impacto tiene sobre ti hasta la que menos.',
  ),
  createQuestion(
    12,
    'Haz una lista de tus compromisos financieros actuales. Ordénalos desde el que más afecta tu tranquilidad hasta el que menos.',
  ),
  createQuestion(
    13,
    'Haz una lista de las personas que te atraen actualmente incluyendo a tu pareja si tienes una. Ordénalas desde la que más te atrae hasta la que menos. Si alguna persona aparece por encima de tu pareja, explica por qué.',
  ),
  createQuestion(
    14,
    '¿Qué imagen tiene tu familia de ti que consideras incorrecta o incompleta?',
  ),
  createQuestion(
    15,
    'Haz una lista de los aspectos de tu apariencia que más te gustan y los que menos te gustan. Ordénalos por importancia.',
  ),
  createQuestion(
    16,
    'Haz una lista de los aspectos de tu vida sexual actual que más disfrutas. Ordénalos desde el más importante hasta el menos importante. Ejemplos: intimidad emocional, frecuencia, atracción física, espontaneidad, comunicación, confianza, variedad, conexión emocional, fantasías compartidas, sensación de deseo mutuo. Puedes eliminar, añadir o modificar cualquier elemento.',
    [answerField],
    'Lista del anfitrión de los aspectos de su vida sexual actual que más disfruta, ordenados desde el más importante hasta el menos importante',
  ),
  createQuestion(
    17,
    'Haz una lista de las personas cuya aprobación todavía buscas. Ordénalas desde la más importante hasta la menos importante.',
  ),
  createQuestion(18, '¿Cuál es la mentira más importante que sigues manteniendo actualmente?'),
  createQuestion(
    19,
    'Haz una lista de las personas que más envidia te generan actualmente. Ordénalas desde la que más te afecta hasta la que menos.',
  ),
  createQuestion(
    20,
    'Haz una lista de las cosas que te gustaría experimentar sexualmente y que actualmente no forman parte de tu vida.',
  ),
  createQuestion(
    21,
    'Haz una lista de los riesgos o problemas futuros que más te preocupan actualmente. Ordénalos desde el más probable o preocupante hasta el menos preocupante.',
  ),
  createQuestion(
    22,
    'Haz una lista de las amistades en las que menos confías actualmente. Ordénalas desde la que menos confianza te genera hasta la que más.',
  ),
  createQuestion(
    23,
    '¿Qué conversaciones, mensajes o relaciones te preocuparía que otras personas vieran?',
  ),
  createQuestion(
    24,
    'Haz una lista de las características que una persona tendría que tener para poner en riesgo tu relación actual. Ordénalas desde la más importante hasta la menos importante.',
  ),
  createQuestion(
    25,
    'Haz una lista de las pérdidas que más han impactado tu vida. Ordénalas desde la más importante hasta la menos importante.',
  ),
  createQuestion(
    26,
    'Haz una lista de las personas con las que considerarías iniciar una relación sentimental si las circunstancias fueran favorables. Ordénalas desde la más deseada hasta la menos deseada.',
  ),
  createQuestion(
    27,
    'Haz una lista de los aspectos de tu vida que parecen mejores desde fuera de lo que realmente son.',
  ),
  createQuestion(
    28,
    'Haz una lista de las exparejas que todavía tienen algún impacto en tu vida mental o emocional.',
  ),
  createQuestion(
    29,
    'Haz una lista de las personas que más influyen actualmente en tus decisiones. Ordénalas desde la más influyente hasta la menos influyente.',
  ),
  createQuestion(
    30,
    'Haz una lista de las cosas que más deseas conseguir durante los próximos años.',
  ),
  createQuestion(
    31,
    'Haz una lista de las relaciones, amistades o vínculos que mantienes ocultos total o parcialmente.',
  ),
  createQuestion(
    32,
    'Haz una lista de los gastos que realizas y que menos te gustaría justificar ante otras personas.',
  ),
  createQuestion(33, 'Haz una lista de las personas que más celos te generan actualmente.'),
  createQuestion(
    34,
    'Haz una lista de los aspectos de tu personalidad que menos muestras a otras personas.',
  ),
  createQuestion(
    35,
    'Haz una lista de los comportamientos de tu pareja que más te molestan actualmente.',
  ),
  createQuestion(
    36,
    'Haz una lista de las personas que más admiras actualmente. Ordénalas desde la más admirada hasta la menos admirada.',
  ),
  createQuestion(
    37,
    'Haz una lista de las cosas que tu familia cree sobre ti y que consideras incorrectas.',
  ),
  createQuestion(
    38,
    'Haz una lista de las oportunidades que más te arrepientes de no haber aprovechado.',
  ),
  createQuestion(
    39,
    'Haz una lista de las amistades que mantienes más por conveniencia que por afecto.',
  ),
  createQuestion(
    40,
    'Haz una lista de las cosas que más valoras de tu relación actual y de las que menos valoras.',
  ),
  createQuestion(
    41,
    'Haz una lista de los pensamientos que aparecen con mayor frecuencia antes de dormir.',
  ),
  createQuestion(42, 'Haz una lista de las cosas que más vergüenza te producen actualmente.'),
  createQuestion(
    43,
    'Ordena los valores que más buscas en otras personas. Ejemplos: honestidad, inteligencia, lealtad, ambición, disciplina, empatía, valentía, creatividad, humildad, independencia.',
  ),
  createQuestion(
    44,
    'Ordena los motivos por los cuales mantienes tu relación actual. Ejemplos: amor, costumbre, comodidad, hijos, estabilidad económica, compañía, atracción física, miedo a perderla.',
  ),
  createQuestion(45, 'Haz una lista de tus preocupaciones económicas actuales.'),
  createQuestion(46, 'Haz una lista de las personas que más te hacen sentir inferior.'),
  createQuestion(
    47,
    'Haz una lista de los comportamientos familiares que más han influido en tu forma de ser.',
  ),
  createQuestion(
    48,
    'Haz una lista de las actividades a las que dedicarías tu tiempo si no necesitaras trabajar.',
  ),
  createQuestion(49, 'Haz una lista de las cosas que ocultas a tu pareja.'),
  createQuestion(
    50,
    'Haz una lista de los aspectos de tu vida que parecen peores desde fuera de lo que realmente son.',
  ),
  createQuestion(51, 'Haz una lista de las personas que extrañas pero prefieres no buscar.'),
  createQuestion(
    52,
    'Haz una lista de las personas cuya pérdida tendría el mayor impacto emocional en tu vida.',
  ),
  createQuestion(
    53,
    'Haz una lista de las características por las cuales otras personas suelen valorarte.',
  ),
  createQuestion(54, 'Haz una lista de los conflictos familiares que sigues evitando.'),
  createQuestion(
    55,
    'Haz una lista de las vidas que más admiras y explica qué aspecto de cada una te gustaría para ti.',
  ),
  createQuestion(
    56,
    'Haz una lista de las cosas que más admiras de tu pareja y de las que más te decepcionan.',
  ),
  createQuestion(
    57,
    'Haz una lista de las actividades o gustos que finges disfrutar para encajar mejor.',
  ),
  createQuestion(58, 'Haz una lista de las cosas que ocultas a tu familia.'),
  createQuestion(
    59,
    'Haz una lista de las comparaciones con otras personas que más afectan tu autoestima.',
  ),
  createQuestion(60, 'Haz una lista de las conversaciones pendientes que tienes con tu pareja.'),
  createQuestion(
    61,
    'Haz una lista de los hábitos que sabes que te perjudican y aun así mantienes.',
  ),
  createQuestion(62, 'Haz una lista de las personas a las que más atención dedicas actualmente.'),
  createQuestion(
    63,
    'Haz una lista de los amigos que cambiarían más su opinión sobre ti si conocieran toda tu vida.',
  ),
  createQuestion(64, 'Haz una lista de las situaciones que más vivo te hacen sentir.'),
  createQuestion(
    65,
    '¿Cuánto estarías dispuesto a arriesgar para tener una relación romántica o sexual con cada una de las personas que aparecen en tu lista de atracción?',
  ),
  createQuestion(
    66,
    'Haz una lista de las líneas morales que crees que podrías cruzar bajo determinadas circunstancias.',
  ),
  createQuestion(
    67,
    'Haz una lista de las cosas que cambiarías de tu apariencia si pudieras hacerlo inmediatamente.',
  ),
  createQuestion(68, 'Haz una lista de las dependencias económicas presentes en tu vida.'),
  createQuestion(
    69,
    'Haz una lista de las áreas de tu vida que más necesitan un cambio urgente.',
  ),
  createQuestion(70, 'Haz una lista de las razones por las cuales terminarías tu relación actual.'),
  createQuestion(
    71,
    'Ordena las características físicas que más llaman tu atención cuando conoces a alguien.',
  ),
  createQuestion(
    72,
    'Ordena las características físicas que consideras indispensables en una pareja.',
  ),
  createQuestion(
    73,
    'Haz una lista de los riesgos que estás asumiendo actualmente y lo que esperas obtener de ellos.',
  ),
  createQuestion(
    74,
    'Ordena las características de personalidad que consideras indispensables en una pareja.',
  ),
  createQuestion(75, 'Ordena las características físicas que más te atraen actualmente.'),
  createQuestion(
    76,
    'Haz una lista de las decisiones impulsivas de las que menos te arrepientes.',
  ),
  createQuestion(
    77,
    'Haz una lista de las verdades que más podrían afectar tus relaciones si se hicieran públicas.',
  ),
  createQuestion(78, 'Haz una lista de las situaciones que más vacío te generan actualmente.'),
  createQuestion(79, 'Haz una lista de las actividades que más tiempo ocupan en tu vida.'),
  createQuestion(
    80,
    'Haz una lista de las características por las cuales comparas a tu pareja con exparejas.',
  ),
  createQuestion(
    81,
    'Ordena las características físicas que suelen despertar tu interés de forma inmediata.',
  ),
  createQuestion(
    82,
    'Haz una lista de las personas que más curiosidad te generan actualmente y explica qué te gustaría descubrir sobre cada una.',
  ),
  createQuestion(
    83,
    'Haz una lista de las personas que te resultan físicamente atractivas actualmente y explica qué es lo que más te atrae de cada una.',
  ),
  createQuestion(84, 'Haz una lista de las áreas de tu vida que estás descuidando.'),
  createQuestion(85, 'Haz una lista de las decisiones que desearías poder revertir.'),
  createQuestion(86, 'Haz una lista de las cualidades ajenas que más envidias.'),
  createQuestion(
    87,
    'Haz una lista de las razones por las cuales volverías o no volverías a elegir a tu pareja actual.',
  ),
  createQuestion(88, 'Ordena los rasgos de personalidad que generan atracción inmediata en ti.'),
  createQuestion(89, 'Haz una lista de las conversaciones importantes que sigues evitando.'),
  createQuestion(
    90,
    'Ordena los rasgos de personalidad que más rápido te hacen perder interés en alguien.',
  ),
  createQuestion(
    91,
    'Haz una lista de las cosas que comprarías, construirías, financiarías o conseguirías de forma inmediata si tuvieras los recursos necesarios. Ordénalas desde la más deseada hasta la menos deseada.',
  ),
  createQuestion(
    92,
    'Haz una lista de las personas que perderían más confianza en ti si conocieran toda la verdad sobre tu vida.',
  ),
  createQuestion(93, 'Haz una lista de las cosas que llevas años posponiendo.'),
  createQuestion(
    94,
    'Ordena los comportamientos que más te hacen sentir querido dentro de una relación.',
  ),
  createQuestion(
    95,
    'Ordena los comportamientos que más te hacen sentir poco valorado dentro de una relación.',
  ),
  createQuestion(
    96,
    'Haz una lista de las personas que más admiras actualmente y explica qué admiras de cada una.',
  ),
  createQuestion(
    97,
    'Haz una lista de tus metas económicas y ordénalas desde la más importante hasta la menos importante.',
  ),
  createQuestion(
    98,
    'Ordena estos conceptos según su importancia para tu vida: amor, dinero, libertad, reconocimiento. Puedes añadir o eliminar elementos.',
  ),
  createQuestion(
    99,
    'Ordena estos conceptos según tu preferencia personal: ser amado, ser admirado, ser respetado, tener influencia. Puedes añadir o eliminar elementos.',
  ),
  createQuestion(
    100,
    '¿Cuál de todas tus respuestas te preocuparía más que vieran las personas más importantes de tu vida y por qué?',
  ),
]

export const getQuestion = (id) =>
  questions.find((question) => question.id === Number(id))
