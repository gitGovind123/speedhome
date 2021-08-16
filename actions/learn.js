import { LEARN_ITEMS } from './types'

export const learnItemsAction = data => {
  return { type: LEARN_ITEMS, payload: data }
}
