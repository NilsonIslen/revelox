const prompts = [
  'Yo',
  'Mi pareja',
  'Mi hijo',
  'Mi hija',
  'Mi amigo',
  'Mi amiga',
  'Mi vecino',
  'Mi vecina',
  'Mi hermano menor',
  'Mi hermana menor',
  'Mi hermano mayor',
  'Mi hermana mayor',
]

const fields = [
  {
    key: 'revelation',
    label: 'Redacción personal',
    type: 'textarea',
    placeholder: 'Escribe tu revelación personal sobre esta tarjeta',
  },
]

const createQuestion = (prompt, index) => ({
  id: index + 1,
  key: `Revelación:${prompt}`,
  category: 'Revelación',
  prompt,
  suggestedPrice: '0.10',
  fields,
})

export const questions = prompts.map(createQuestion)

export const getQuestion = (id) =>
  questions.find((question) => question.id === Number(id))
