import { Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Header from './Header'
import Footer from './Footer'
import { UserContextProvider } from '../features/userContext/UserContextProvider'

const Layout = () => {
  const location = useLocation()
  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/signup'

  return (
    <div>
      <UserContextProvider>{!hideHeaderFooter && <Header />}</UserContextProvider>
      <LayoutContainer>
        <Outlet /> {/* 중첩 라우트 렌더링 */}
      </LayoutContainer>
      {!hideHeaderFooter && <Footer />}
    </div>
  )
}

export default Layout

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  min-height: calc(100vh - 100px);
  margin: 0 auto;

  /* 미디어 쿼리: 768px 이하일 때 */
  @media (max-width: 768px) {
    padding: 10px;
    max-width: 100%;
  }
`
