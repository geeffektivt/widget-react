/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Tooltip, Zoom } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { ReactElement } from 'react'

const useStyles = makeStyles(() => ({
  tooltip: {
    backgroundColor: 'hsl(198deg 82% 23%)',
    borderRadius: 0,
    color: 'white',
    fontSize: 12,
    left: 20,
    maxWidth: 180,
    top: 10,
  },

  positionArrow: {
    left: 3,
  },

  arrow: {
    color: 'hsl(198deg 82% 23%)',
  },
}))

interface ToolTipProps {
  text: NonNullable<React.ReactNode>
  children: ReactElement
}

export function ToolTip({ text, children }: ToolTipProps) {
  const classes = useStyles()

  return (
    <Tooltip
      classes={{
        tooltip: classes.tooltip,
        tooltipArrow: classes.positionArrow,
        arrow: classes.arrow,
      }}
      title={text}
      placement="top"
      TransitionComponent={Zoom}
      arrow
      interactive
      enterTouchDelay={0}
    >
      {children}
    </Tooltip>
  )
}
