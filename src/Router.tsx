import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/home/Home';
import Onboarding from './pages/onboarding/Onboarding';
import Layout from './components/ui/layout/Layout';
import AllScholarships from './pages/scholarship/AllScholarships';
import RecommendScholarships from './pages/scholarship/RecommendScholarships';
import ScholarshipDetail from './pages/scholarship/ScholarshipDetail';
import MyScholarshipsLayout from './components/ui/layout/MyScholarshipsLayout';
import MyScholarshipsDate from './pages/my-scholarship/MyScholarshipsDate';
import AuthKakaoCallback from './pages/auth/AuthKakaoCallback';
import MyScholarshipsList from './pages/my-scholarship/MyScholarshipList';
import MyScholarshipsFavorite from './pages/my-scholarship/MyScholarshipsFavorite';
import MyScholarshipDetail from './pages/my-scholarship/MyScholarshipDetail';
import ArticleList from './pages/article/ArticleList';
import ArticleDetail from './pages/article/ArticleDetail';
import CoverLetterList from './pages/cover-letter/CoverLetterList';
import CoverLetterCreate from './pages/cover-letter/CoverLetterCreate';
import CoverLetterDetail from './pages/cover-letter/CoverLetterDetail';
import CoverLetterEdit from './pages/cover-letter/CoverLetterEdit';
import MyPage from './pages/mypage/root/MyPage';
import ReviewList from './pages/mypage/reviews/ReviewList';
import ReviewEdit from './pages/mypage/reviews/ReviewEdit';
import DocumentList from './pages/mypage/documents/DocumentList';
import DocumentNew from './pages/mypage/documents/DocumentNew';
import DocumentEdit from './pages/mypage/documents/DocumentEdit';
import Privacy from './pages/mypage/privacy/Privacy';
import SearchScholarships from './pages/search/SearchScholarships';
import Login from './pages/auth/Login';
import Landing from './pages/landing/Landing';
import FoundationDetail from './pages/foundation/FoundationDetail';
import AuthRoute from './pages/auth/AuthRoute';
import AuthNaverCallback from './pages/auth/AuthNaverCallback';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/landing',
        element: <Landing />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/auth',
        children: [
          {
            path: 'kakao/callback',
            element: <AuthKakaoCallback />,
          },
          {
            path: 'naver/callback',
            element: <AuthNaverCallback />,
          },
        ],
      },
      {
        path: '/onboarding',
        element: <Onboarding />,
      },
      {
        path: '',
        element: <AuthRoute />,
        children: [
          {
            path: '/scholarships',
            children: [
              {
                path: '',
                element: <AllScholarships />,
              },
              {
                path: ':id',
                children: [
                  {
                    path: '',
                    element: <ScholarshipDetail />,
                  },
                  {
                    path: 'foundations',
                    children: [
                      {
                        path: ':foundationId',
                        element: <FoundationDetail />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            path: '/recommend',
            element: <RecommendScholarships />,
          },

          {
            path: '/my-scholarships',
            element: <MyScholarshipsLayout />,
            children: [
              {
                path: 'date',
                element: <MyScholarshipsDate />,
              },
              {
                path: 'list',
                element: <MyScholarshipsList />,
              },
              { path: 'favorite', element: <MyScholarshipsFavorite /> },
              { path: ':id', element: <MyScholarshipDetail /> },
            ],
          },
          {
            path: '/cover-letters',
            children: [
              {
                path: '',
                element: <CoverLetterList />,
              },
              {
                path: 'new',
                element: <CoverLetterCreate />,
              },
              {
                path: ':coverLetterId',
                children: [
                  {
                    path: '',
                    element: <CoverLetterDetail />,
                  },
                  {
                    path: 'edit',
                    element: <CoverLetterEdit />,
                  },
                ],
              },
            ],
          },
          {
            path: '/me',
            children: [
              {
                path: '',
                element: <MyPage />,
              },
              {
                path: 'documents',
                children: [
                  {
                    path: '',
                    element: <DocumentList />,
                  },
                  {
                    path: 'new',
                    element: <DocumentNew />,
                  },
                  {
                    path: ':id/edit',
                    element: <DocumentEdit />,
                  },
                ],
              },
              {
                path: 'privacy',
                element: <Privacy />,
              },
              {
                path: 'reviews',
                children: [
                  {
                    path: '',
                    element: <ReviewList />,
                  },
                  {
                    path: ':id/edit',
                    element: <ReviewEdit />,
                  },
                ],
              },
            ],
          },
          {
            path: '/articles',
            children: [
              {
                path: '',
                element: <ArticleList />,
              },
              {
                path: ':id',
                element: <ArticleDetail />,
              },
            ],
          },
          {
            path: '/search',
            element: <SearchScholarships />,
          },
        ],
      },
    ],
  },
]);
