import styled from 'styled-components'
import CatchLine from '../../components/ui/about/CatchLine'
import Content from '../../components/ui/about/Content'

const AboutPage = () => {
  return (
    <>
      <AboutContainer>
        <CatchLine />
        <Content />
      </AboutContainer>
    </>
  )
}

export default AboutPage

const AboutContainer = styled.div`
  padding: 50px;
`
