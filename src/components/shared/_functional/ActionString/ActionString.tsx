import { ReactNode } from 'react'

import useActionString from '../../../../hooks/utils/useActionString'

interface ActionStringProps {
  value: string | undefined | null

  children: (text?: string, argument?: string) => ReactNode
}

export default function ActionString({ value, children }: ActionStringProps) {
  const actionArray = useActionString(value)

  return (
    <>
      {actionArray.map((actionArrayItem) => {
        if (typeof actionArrayItem === 'string') {
          return <span key={actionArrayItem}>{actionArrayItem}</span>
        }

        return (
          <span key={actionArrayItem.key}>
            {children(actionArrayItem?.text, actionArrayItem?.argument)}
          </span>
        )
      })}
    </>
  )
}
