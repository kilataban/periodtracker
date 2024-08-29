import { StaticContent } from '../../../core/types'
import { Locale } from '../'
import { en } from './en'
import { fr } from './fr'
import { ru } from './ru'
import { pt } from './pt'
import { es } from './es'

export const content: Record<Locale, StaticContent> = {
  en,
  fr,
  ru,
  pt,
  es,
}

export const availableContentLocales = Object.keys(content)
