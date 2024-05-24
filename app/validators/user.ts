import vine from '@vinejs/vine'

export const userValidator = vine.compile(
  vine.object({
    name: vine.string(),
    email: vine.string().email(),
    password: vine.string().minLength(8),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    name: vine.string(),
    email: vine.string().email(),
  })
)
