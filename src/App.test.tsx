import { render } from '@testing-library/react'
import React from 'react'

import Widget from './components/Widget'

test('renders learn react link', () => {
  const { getByText } = render(<Widget />)
  const linkElement = getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
