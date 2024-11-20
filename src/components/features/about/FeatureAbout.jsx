import styled from 'styled-components'

const FeatureAbout = ({ title, description }) => {
  return (
    <FeatureContainer>
      <h1>{title}</h1>
      <p>{description}</p>
    </FeatureContainer>
  )
}

export default FeatureAbout

const FeatureContainer = styled.div`

  h1 {
    font-size: 16px;
    font-weight: bold;
    margin: 10px 0;
  }

  p {
    line-height: 1.6;
  }
`
