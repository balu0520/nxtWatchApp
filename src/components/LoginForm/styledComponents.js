import styled from 'styled-components'

export const BackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: auto;
  background-color: ${props => (props.bgColor ? '#ffffff' : '#181818')};
`
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 350px;
  background-color: ${props => (props.bgColor ? '#ffffff' : '#000000')};
`
export const Label = styled.label`
  color: ${props => (props.bgColor ? '#1e293b' : '#f9f9f9')};
`
export const LoginButton = styled.button`
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 14px;
  color: #ffffff;
  height: 40px;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 2px;
  background-color: #0b69ff;
  border-radius: 8px;
  border: none;
  outline: none;
  cursor: pointer;
`
