import React from 'react'

const ColorContext = React.createContext({
  activeBackground: true,
  ChangeBackground: () => {},
  savedVideoItems: [],
})

export default ColorContext
