import styled from 'styled-components'
import contentData from '../../../data/contentData'
import FeatureAbout from '../../features/about/FeatureAbout'

const ContentAbout = () => {
  return (
    <Container>
      <Title>❤ 아재개그의 매력 ❤</Title>
      {contentData.map((data, index) => (
        <FeatureAbout key={index} title={data.title} description={data.description} />
      ))}
    </Container>
  )
}

export default ContentAbout

const Container = styled.div`
  padding: 50px 150px;
  margin-top: 40px;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
`
