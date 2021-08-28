import React from 'react'

import { Link } from '../Link/Link'

import { ToolTip } from './ToolTip'
import ToolTipIcon from './ToolTipIcon'

interface ToolTipLinkProps {
  text: string
  link: string
}

export function ToolTipLink({ text, link }: ToolTipLinkProps) {
  return (
    <ToolTip text={text}>
      <Link target="_blank" rel="noopener noreferrer" href={link}>
        <ToolTipIcon />
      </Link>
    </ToolTip>
  )
}
