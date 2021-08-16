export const DISABLE_FOOTER = 'GET_DISABLE_FOOTERPOST'

export function disableFooter (val) {
  return { type: DISABLE_FOOTER, payload: val }
}
