const words = [
  'Deseo',
  'Sexo',
  'Confianza',
  'Admiración',
  'Felicidad',
  'Poligamia',
  'Monogamia',
  'Miedo',
  'Envidia',
  'Paz',
  'Nostalgia',
  'Esperanza',
  'Ansiedad',
  'Curiosidad',
  'Inspiración',
  'Seguridad',
  'Libertad',
  'Placer',
  'Ternura',
  'Vergüenza',
  'Soledad',
  'Estrés',
  'Creatividad',
  'Ambición',
  'Romance',
  'Atracción',
  'Respeto',
  'Diversión',
  'Disciplina',
  'Espiritualidad',
  'Pertenencia',
  'Propósito',
  'Matrimonio',
  'Hijos',
  'Familia',
  'Amistad',
  'Trabajo',
  'Dinero',
  'Negocios',
  'Éxito',
  'Poder',
  'Viajes',
  'Casa',
  'Fiesta',
  'Cerveza',
  'Café',
  'Música',
  'Deporte',
  'Salud',
  'Secreto',
]

const category = 'Personas'

const categoryConfig = {
  singular: 'Persona',
  placeholder: 'Nombre, apodo o descripción',
}

const positions = ['primer', 'segundo', 'tercer']

const createFields = (word) =>
  positions.map((position, index) => ({
    key: `position${index + 1}`,
    label:
      index === 0
        ? `${category} asociadas con ${word.toLowerCase()}`
        : `${position.charAt(0).toUpperCase()}${position.slice(1)} lugar`,
    displayLabel: index === 0 ? undefined : '',
    type: 'text',
    placeholder: categoryConfig.placeholder,
  }))

const createAssociationQuestion = (word, index) => ({
  id: index + 1,
  key: `${category}:${word}`,
  category,
  prompt: word,
  publicPrompt: `${category} asociadas con ${word.toLowerCase()} en el titular`,
  suggestedPrice: '0.10',
  fields: createFields(word),
})

const associationQuestions = words.map(createAssociationQuestion)

export const questions = associationQuestions

export const getQuestion = (id) =>
  questions.find((question) => question.id === Number(id))
