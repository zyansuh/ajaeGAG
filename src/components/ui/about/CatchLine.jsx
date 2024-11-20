import styled from 'styled-components'

const CatchLine = () => {
  return (
    <>
      <CatchLineContainer>
        <h1>마침내 세계가 놀랄 글로벌 아재개그를 탄생시킬</h1>
        <h1>아재슐랭의 베일이 벗겨진다!</h1>
      </CatchLineContainer>
      <TitleContainer>
        <h1>글로벌 아재개그 육성 프로젝트</h1>
        <h2>아재슐랭</h2>
      </TitleContainer>
    </>
  )
}

export default CatchLine

const CatchLineContainer = styled.div`
  text-align: center;
  font-size: 30px;
  margin-top: 50px;

  h1 {
    padding: 10px;
  }
`

const TitleContainer = styled.div`
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
