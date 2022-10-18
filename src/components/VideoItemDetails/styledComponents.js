import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${props => (props.bgColor ? '#f9f9f9' : '#181818')};
  display: flex;
  flex-direction: row;
  margin-top: 0px;
  max-height: 85vh;
  height: 85vh;
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
export const VideoItemContainer = styled.div`
  width: 75%;
  background-color: ${props => (props.bgColor ? ' #f9f9f9' : ' #0f0f0f')};
  overflow-y: auto;
  max-height: 85vh;
`
export const VideoDetailsHeading = styled.p`
  font-family: 'Roboto';
  color: ${props => (props.bgColor ? '#212121' : '#f1f1f1')};
  font-size: 18px;
  margin-left: 20px;
  margin-top: 0px;
`

export const VideoDetailsPara = styled.p`
  font-family: 'Roboto';
  color: ${props => (props.bgColor ? '#231f20' : ' #ebebeb')};
`

export const LikeButton = styled.button`
  background-color: transparent;
  border-width: 0;
  outline: none;
  cursor: pointer;
  color: ${props => (props.likeClr === 'INITIAL' ? '#64748b' : '#2563eb')};
`

export const DisLikeButton = styled.button`
  background-color: transparent;
  border-width: 0;
  outline: none;
  cursor: pointer;
  color: ${props => (props.dislikeClr === 'INITIAL' ? '#64748b' : '#2563eb')};
`
export const LikePara = styled.p`
  font-family: 'Roboto';
  color: ${props => (props.likeClr === 'INITIAL' ? '#64748b' : '#2563eb')};
`
export const DisLikePara = styled.p`
  font-family: 'Roboto';
  color: ${props => (props.dislikeClr === 'INITIAL' ? '#64748b' : '#2563eb')};
`
export const SaveButton = styled.p`
  background-color: transparent;
  border-width: 0;
  outline: none;
  cursor: pointer;
  color: ${props => (props.saved === 'not-saved' ? '#64748b' : '#2563eb')};
`
export const SavePara = styled.p`
  font-family: 'Roboto';
  color: ${props => (props.saved === 'not-saved' ? '#64748b' : '#2563eb')};
`

export const VideoItemPara = styled.p`
  font-family: 'Roboto';
  color: ${props => (props.bgColor ? '#231f20' : ' #f9f9f9')};
  margin-left: 10px;
`
