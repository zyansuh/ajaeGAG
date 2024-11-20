import styled from 'styled-components'

const SectionOne = () => {
  return (
    <>
      <Container>
        <h1>마침내 세계가 놀랄 글로벌 아재개그를 탄생시킬</h1>
        <h1>아재슐랭의 베일이 벗겨진다!</h1>
      </Container>
    </>
  )
}

export default SectionOne

const Container = styled.div`
  text-align: center;
  font-size: 30px;
  margin-top: 50px;

  h1 {
    padding: 10px;
  }
`
