import styled from 'styled-components'
import contentData from '../../features/about/ContentData'
import Feature from '../../features/about/Feature'

const Content = () => {
  return (
    <Container>
      <Title>❤ 아재개그의 매력 ❤</Title>
      {contentData.map((feature, index) => (
        <Feature key={index} title={feature.title} description={feature.description} />
      ))}
    </Container>
  )
}

export default Content

const Container = styled.div`
  padding: 50px 100px;
  margin-top: 30px;

  h1 {
    font-size: 20px;
    font-weight: bold;
    margin: 20px 0;
  }

  h2 {
    font-size: 16px;
    font-weight: bold;
    margin: 10px 0;
  }

  p {
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin: 20px 0;
  text-align: center;
`
