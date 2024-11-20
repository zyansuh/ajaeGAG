import styled from 'styled-components'
import SectionOne from './SectionOne'
import SectionTwo from './SectionTwo'
import SectionThree from './SectionThree'

const AboutPage = () => {
  return (
    <>
      <AboutContainer>
        <SectionOne />
        <SectionTwo />
        <SectionThree />
      </AboutContainer>
    </>
  )
}

export default AboutPage

const AboutContainer = styled.div`
  padding: 50px;
`
