import { useState } from 'react'

const ProfileImageUpload = ({ onImageSelect }) => {
  const [imagePreview, setImagePreview] = useState(null)

  // 이미지 선택 시 실행되는 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
      onImageSelect(file) // 부모 컴포넌트로 이미지 파일 전달
    }
  }

  return (
    <div>
      <label>프로필 이미지:</label>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {imagePreview && <img src={imagePreview} alt="Profile Preview" width="100" />}
    </div>
  )
}

export default ProfileImageUpload
