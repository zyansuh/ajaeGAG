import styled from 'styled-components'

const Footer = () => {
  return (
    <FooterContainer>
      <span>© 2024 아재슐랭. All rights reserved.</span>
      <div>
        <p>Team: 4조참치🐟</p>
        <p>Members: 서지안, 조동희, 김민후, 정은혜, 이경민</p>
      </div>
    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled.footer`
  max-width: 1200px;
  height: 70px;
  display: flex;
  padding-left: 20px;
  align-items: center;
  justify-content: start;
  font-size: 14px;
  font-weight: bold;
  margin: 0 auto;
  color: var(--logo--color);
  background-color: var(--nav--color);

  div {
    display: flex;
    gap: 20px;
    margin-left: auto;
    margin-right: 20px;
  }
  /* 미디어 쿼리: 768px 이하일 때 */
  @media (max-width: 768px) {
    height: 50px;
    padding: 10px;
    text-align: center;
    justify-content: center;
    font-size: 12px;
  }
`
