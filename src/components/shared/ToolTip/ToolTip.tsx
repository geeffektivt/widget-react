/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip, Zoom } from "@material-ui/core";
import styled from "styled-components";

const useStyles = makeStyles(() => ({
  tooltip: {
    maxWidth: 180,
    top: 10,
    fontSize: 12,
    left: 20,
    backgroundColor: "#FFAA2B",
    color: "black",
    borderRadius: 0,
  },
  positionArrow: {
    left: 3,
  },
}));

// Removes purple color from link
const Link = styled.a`
  color: inherit;
`;

const StyledSVG = styled.svg`
  margin-left: 5px;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

export function TooltipIcon() {
  return (
    <StyledSVG
      stroke="currentColor"
      fill="currentColor"
      strokeWidth={0}
      viewBox="0 0 16 16"
      height="12px"
      width="12px"
    >
      <path
        fillRule="evenodd"
        d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"
        clipRule="evenodd"
      />
      <path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
    </StyledSVG>
  );
}

interface ToolTipProps {
  text: string;
  link: string;
}

export function ToolTip(props: ToolTipProps) {
  const classes = useStyles();

  return (
    <Tooltip
      classes={{
        tooltip: classes.tooltip,
        tooltipArrow: classes.positionArrow,
      }}
      title={props.text}
      placement="top"
      TransitionComponent={Zoom}
      arrow
    >
      <Link target="_blank" rel="noopener noreferrer" href={props.link}>
        <TooltipIcon />
      </Link>
    </Tooltip>
  );
}
