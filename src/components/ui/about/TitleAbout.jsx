import styled from 'styled-components'

const TitleAbout = () => {
  return (
    <>
      <CatchLineContainer>
        <p>마침내 세계가 놀랄 글로벌 아재개그를 탄생시킬</p>
        <p>아재슐랭의 베일이 벗겨진다!</p>
      </CatchLineContainer>
      <TitleContainer>
        <p>글로벌 아재개그 육성 프로젝트</p>
        <h1>아재슐랭</h1>
      </TitleContainer>
    </>
  )
}

export default TitleAbout

const CatchLineContainer = styled.div`
  text-align: center;
  font-size: 30px;
  margin-top: 50px;

  p {
    padding: 10px;
  }
`

const TitleContainer = styled.div`
  text-align: center;
  font-size: 40px;
  margin-top: 20px;
  font-weight: 700;

  p {
    padding: 5px;
    margin-bottom: 10px;
  }

  h1 {
    font-size: 45px;
  }
`
