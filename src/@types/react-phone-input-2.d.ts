declare module 'react-phone-input-2' {
  interface PhoneInputProps {
    country: string
    value?: string
    onChange: (phone: string) => void
    onlyCountries: string[]
    disableDropdown: boolean
    countryCodeEditable: boolean
    autoFormat: boolean
    masks?: { [se: string]: string }
    defaultMask: string
    alwaysDefaultMask: boolean
  }

  const PhoneInput: React.FunctionComponent<PhoneInputProps>
  export default PhoneInput
}
