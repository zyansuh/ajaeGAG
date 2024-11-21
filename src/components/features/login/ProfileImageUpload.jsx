import { useState } from 'react'

import styled from 'styled-components'

const ProfileImageUpload = ({ onImageSelect }) => {
  const [imagePreview, setImagePreview] = useState()

  // 이미지 선택 시 실행되는 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
      onImageSelect(file)
      console.log(file)
    }
  }

  return (
    <ProfileImage>
      <Label>프로필 이미지</Label>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {imagePreview && <ImagePreview src={imagePreview} alt="Profile Preview" />}
    </ProfileImage>
  )
}

export default ProfileImageUpload

const ProfileImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`
const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
`
const ImagePreview = styled.img`
  margin-top: 15px;
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 10%;
  border: 2px solid #ddd;
`
