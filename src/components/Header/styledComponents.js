import styled from 'styled-components'

export const NavHeader = styled.nav`
  display: flex;
  justify-content: center;
  border-bottom-width: ${props => (props.bgColor ? 0 : 1)}px;
  border-bottom-style: ${props => (props.bgColor ? 'none' : 'solid')};
  border-bottom-color: ${props => (props.bgColor ? '' : 'rgb(243, 243, 243)')};
  background-color: ${props => (props.bgColor ? '#f9f9f9' : '#181818')};
  max-height: 15vh;
`

export const CustomButton = styled.button`
  background-color: transparent;
  outline: none;
  cursor: pointer;
  border-style: solid;
  border-width: 1px;
  border-color: ${props => (props.bgColor ? ' #3b82f6' : '#ffffff')};
  border-radius: 6px;
  color: ${props => (props.bgColor ? '#181818' : '#ffffff')};
`
export const PopupContainer = styled.div`
  height: 170px;
  width: 330px;
  background-color: #181818;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
`
export const PopupHeading = styled.p`
  color: ${props => (props.bgColor ? '#181818' : '#f9f9f9')};
  font-family: 'Roboto';
  font-size: 15px;
  font-weight: 500;
`
export const CancelButton = styled.button`
  background-color: transparent;
  outline: none;
  cursor: pointer;
  border-style: solid;
  border-width: 1px;
  border-color: ${props => (props.bgColor ? ' #3b82f6' : '#ffffff')};
  border-radius: 6px;
  color: ${props => (props.bgColor ? '#181818' : '#ffffff')};
  height: 30px;
  width: 110px;
  margin-right: 5px;
`
