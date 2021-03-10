import { styled } from '../../styles/stitches.config'

export const Form = styled('form', {
  // alignItems: 'center',
  // display: 'flex',
  // flexDirection: 'column',
  // justifyContent: 'center',
  // width: '100%',
})

export const InputFieldWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

export const TextField = styled('input', {
  // padding: 20px;
  // display: block;
  // margin: 5px;
  // font-size: 15px;
  // border: 1px solid ${gray18};
  // border-radius: 5px;
  // box-sizing: border-box;
})

export const CheckboxWrapper = styled('label', {
  alignItems: 'center',
  display: 'flex',
})

export const CheckBox = styled('input', {
  marginLeft: '$s50',

  // &:hover {
  //   cursor: pointer;
  //   opacity: 0.5;
  // }
})

export const CheckboxLabel = styled('p', {
  display: 'inline-block',
  fontSize: '$12',
  marginLeft: '$s25',
})
