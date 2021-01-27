import texts from '../../content/texts.json'

/**
 * Named like a hook because location of texts might move in the future.
 */
export default function useAllTexts() {
  return texts
}
