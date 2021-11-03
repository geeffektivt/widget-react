import React from 'react'

import { SecondaryLink } from '../../panes/Panes.style'
import ActionString from '../_functional/ActionString'

import { ToolTip } from './ToolTip'
import ToolTipIcon from './ToolTipIcon'

interface ToolTipLinkProps {
  text: string
}

export function ToolTipLink({ text }: ToolTipLinkProps) {
  return (
    <ToolTip
      text={
        <ActionString value={text}>
          {(t, l) => (
            <SecondaryLink target="_blank" rel="noopener noreferrer" href={l}>
              {t}
            </SecondaryLink>
          )}
        </ActionString>
      }
    >
      <ToolTipIcon />
    </ToolTip>
  )
}
