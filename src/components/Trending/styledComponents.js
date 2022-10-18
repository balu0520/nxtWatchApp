import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${props => (props.bgColor ? '#f9f9f9' : '#181818')};
  display: flex;
  flex-direction: row;
  margin-top: 0px;
  max-height: 85vh;
`

export const TypesContainer = styled.div`
  width: 25%;
  max-height:85vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items:flex-start
  background-color: ${props => (props.bgColor ? '#f9f9f9' : '#181818')};
  margin-top:0px;
`
export const TypesList = styled.ul`
  list-style-type: none;
  padding-left: 0px;
  background-color: ${props => (props.bgColor ? '#f9f9f9' : '#181818')};
  margin-top: 0px;
  margin-bottom: 0px;
`
export const ListItem = styled.li`
  background-color: ${props => (props.bgColor ? ' #d7dfe9' : ' #64748b')};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
`
export const TypePara = styled.p`
  font-family: 'Roboto';
  margin-left: 15px;
  color: ${props => (props.bgColor ? '#181818' : '#f9f9f9')};
`
export const ContactContainer = styled.div`
  background-color: ${props => (props.bgColor ? '#f9f9f9' : '#181818')};
`

export const ContactHeading = styled.p`
  font-family: 'Roboto';
  color: ${props => (props.bgColor ? '#181818' : '#f9f9f9')};
`
export const ContactPara = styled.p`
  font-family: 'Roboto';
  color: ${props => (props.bgColor ? '#181818' : '#f9f9f9')};
`
export const TrendingContainer = styled.div`
  width: 75%;
  background-color: ${props => (props.bgColor ? ' #f9f9f9' : ' #0f0f0f')};
  overflow-y: scroll;
`

export const FailureHeading = styled.h1`
  font-family: 'Roboto';
  color: ${props => (props.bgColor ? '#000000' : '#ffffff')};
`
export const FailurePara = styled.p`
  font-family: 'Roboto';
  color: ${props => (props.bgColor ? '#212121' : '#f1f1f1')};
`
export const VideoHeading = styled.p`
  font-family:'Roboto',
  color: ${props => (props.bgColor ? '#212121' : '#f1f1f1')};
  font-size:18px;
`
export const VideoPara = styled.p`
  font-family:'Roboto',
  color: ${props => (props.bgColor ? '#231f20' : ' #ebebeb')}
`
