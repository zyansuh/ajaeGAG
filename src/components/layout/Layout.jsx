const HeaderStyles = {
  width: '100%',
  background: 'gray',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '20px',
  color: 'white',
  fontWeight: '600',
  gap: '20px'
}
const FooterStyles = {
  width: '100%',
  height: '50px',
  display: 'flex',
  background: 'gray',
  paddingLeft: '20px',
  color: 'white',
  alignItems: 'center',
  justifyContent: 'start',
  fontSize: '12px'
}
const layoutStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '90vh'
}
function Header() {
  return (
    <div style={{ ...HeaderStyles }}>
      <img style={{ width: '50px' }} src="/images/logo.png" />
      <span>목록</span>
      <span>소개</span>
      <div
        style={{
          marginLeft: 'auto',
          paddingRight: '20px',
          display: 'flex',
          gap: '10px'
        }}
      >
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </div>
  )
}
function Footer() {
  return (
    <div style={{ ...FooterStyles }}>
      <span>© 2024 아재슐랭. All rights reserved.</span>
    </div>
  )
}
function Layout({ children }) {
  return (
    <div>
      <Header />
      <div style={{ ...layoutStyles }}>{children}</div>
      <Footer />
    </div>
  )
}
export default Layout
