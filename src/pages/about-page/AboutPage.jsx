import styled from 'styled-components'
import SectionOne from '../../components/ui/about/SectionOne'
import SectionTwo from '../../components/ui/about/SectionTwo'
import SectionThree from '../../components/ui/about/SectionThree'

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
