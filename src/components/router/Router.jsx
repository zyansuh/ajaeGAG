import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import GlobalStyle from '../styled-component/GlobalStyle'
import AboutPage from '../../pages/about-page/AboutPage'
import LoginPage from '../../pages/login-page/LoginPage'
import SignUpPage from '../../pages/signup-page/SignUpPage'
import MyPage from '../../pages/my-page/MyPage'
import ListDetailPage from '../../pages/list-detail-page/ListDetailPage'
import PostPage from '../../pages/post-page/PostPage'
import HomePage from '../../pages/home-page/HomePage'
import ListPage from '../../pages/list-page/ListPage'
import Layout from '../layout/Layout'
import UpdatePage from '../../pages/update-page/UpdatePage'
import ProtectedRoute from './ProtectedRoute'

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <GlobalStyle />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="mypage" element={<MyPage />} />
              <Route path="list" element={<ListPage />} />
              <Route path="list/:id" element={<ListDetailPage />} />
              <Route path="post" element={<PostPage />} />
              <Route path="post/:id" element={<UpdatePage />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default Router
