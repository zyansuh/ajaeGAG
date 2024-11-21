import styled from 'styled-components'

import logo from '/public/images/logo.png'

const ProfileImg = ({ imgUrl, $width, $height }) => {
  return <CommentProfile src={imgUrl ? imgUrl : logo} alt="profile img" width={$width} height={$height} />
}

export default ProfileImg

const CommentProfile = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50%;
`
