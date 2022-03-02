import { useMemo } from 'react'

export type ActionItem =
  | string
  | { text: string; argument?: string; key: string }

export default function useActionString(
  actionString: string | undefined | null
): ActionItem[] {
  return useMemo(() => {
    if (!actionString) {
      return []
    }

    const patternMatchRegex = /\[([^\]]+)\](?:\(([^)]*)\))?/g

    const actionItems: ActionItem[] = []
    let previousEndIndex = 0

    for (
      let match = patternMatchRegex.exec(actionString);
      match !== null;
      match = patternMatchRegex.exec(actionString)
    ) {
      const [wholeMatch, text, argument] = match
      const matchStartIndex = match.index

      if (matchStartIndex > previousEndIndex) {
        actionItems.push(
          actionString.substring(previousEndIndex, matchStartIndex)
        )
      }

      previousEndIndex = matchStartIndex + wholeMatch.length

      actionItems.push({ text, argument, key: text + matchStartIndex })
    }

    if (previousEndIndex < actionString.length) {
      actionItems.push(actionString.substring(previousEndIndex))
    }

    return actionItems
  }, [actionString])
}

export function useJoinedActionString(
  actionString: string,
  actionCallback: (text?: string, argument?: string) => string | undefined
) {
  const actionList = useActionString(actionString)
  return useMemo(
    () => joinActionString(actionList, actionCallback),
    [actionList, actionCallback]
  )
}

export function joinActionString(
  actionStringArray: ActionItem[],
  renderCallback: (text?: string, argument?: string) => string | undefined
) {
  if (!actionStringArray) {
    return ''
  }

  return actionStringArray
    .map((item) => {
      if (typeof item === 'string') {
        return item
      }
      return renderCallback(item?.text, item?.argument)
    })
    .join('')
}
