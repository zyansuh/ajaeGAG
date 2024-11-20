import styled from 'styled-components'

const SectionThree = () => {
  return (
    <>
      <Container>
        <h1>❤ 아재개그의 매력 ❤</h1>
        <h2>1. 단순함</h2>
        <p>
          아재개그는 복잡한 사고나 배경지식 없이도 이해할 수 있습니다.
          <br />
          단어나 상황을 꼬아 만든 웃음이기 때문에 빠르게 반응할 수 있습니다.
        </p>
        <h2>2. 예상치 못한 반전</h2>
        <p>의외로 기발한 말장난이나 예상치 못한 전개가 들어있어서 "이게 뭐야?" 하면서 웃게 됩니다.</p>
        <h2>3. 공감요소</h2>
        <p>
          일상적인 소재를 가지고 유머를 만들기 때문에 많은 사람들이 쉽게 공감할 수 있습니다. <br />
          특히 세대 간에 통하는 단어나 상황이 많아 대화의 물꼬를 트기도 합니다.
        </p>
        <h2>4. 부담 없는 유머</h2>
        <p>
          심각하거나 논쟁적인 주제를 다루지 않아서 분위기를 가볍게 만들기에 좋습니다. <br />
          웃기든 안 웃기든 "센스 없다"며 농담으로 넘길 수 있습니다.
        </p>
        <h2>5. 옛날 감성</h2>
        <p>약간 촌스럽거나 옛날 감성이 있는 농담이어서 추억을 불러일으키거나 친근함을 느끼게 만듭니다.</p>
        <h2>6. 리액션 유발</h2>
        <p>
          아재개그를 들으면 대부분 "아, 진짜~" 하면서도 피식 웃게 되는 리액션이 나오는데, <br />
          이게 말한 사람과 듣는 사람 모두에게 즐거움을 줄 수 있습니다.
        </p>
      </Container>
    </>
  )
}

export default SectionThree

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
`
