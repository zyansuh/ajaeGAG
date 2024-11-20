import styled from 'styled-components'

const Feature = ({ title, description }) => {
  return (
    <FeatureContainer>
      <h2>{title}</h2>
      <p>{description}</p>
    </FeatureContainer>
  )
}

export default Feature

const FeatureContainer = styled.div`
  margin-bottom: 20px;

  h2 {
    font-size: 16px;
    font-weight: bold;
    margin: 10px 0;
  }

  p {
    line-height: 1.6;
  }
`
