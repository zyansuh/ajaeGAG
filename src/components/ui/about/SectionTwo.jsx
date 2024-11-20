import styled from 'styled-components'

const SectionTwo = () => {
  return (
    <>
      <Container>
        <h1>글로벌 아재개그 육성 프로젝트</h1>
        <h2>아재슐랭</h2>
      </Container>
    </>
  )
}

export default SectionTwo

const Container = styled.div`
  text-align: center;
  font-size: 40px;
  margin-top: 20px;
  font-weight: 700;

  h1 {
    padding: 5px;

    margin-bottom: 10px;
  }

  h2 {
    font-size: 45px;
  }
`
