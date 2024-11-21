import styled from 'styled-components'

import TitleAbout from '../../components/ui/about/TitleAbout'
import ContentAbout from '../../components/ui/about/ContentAbout'

const AboutPage = () => {
  return (
    <>
      <AboutContainer>
        <TitleAbout />
        <ContentAbout />
      </AboutContainer>
    </>
  )
}

export default AboutPage

const AboutContainer = styled.div`
  padding: 50px;
`
