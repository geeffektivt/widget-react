import { styled } from '../../styles/stitches.config'

export const Pane = styled('div', {
  padding: '$s150',
})

// TODO: REMOVE
export const PaneContainer = styled('div', {
  // align-items: center;
  // justify-content: center;
  // padding: 10px 0;
})

export const PaneTitle = styled('h3', {
  fontSize: '$25',
  margin: '$s25 0 $s50',
})

export const UnderTitle = styled('p', {
  // font-size: 15px;
  // align-self: center;
  // margin: 5px;
  // text-align: center;
  // color: gray;
})

export const PrimaryLink = styled('a', {
  color: '$primary100',
  fontSize: '$12',
})

export const ErrorMessage = styled('span', {
  color: '$error100',
  fontSize: '$12',
  paddingLeft: '$s25',
})
