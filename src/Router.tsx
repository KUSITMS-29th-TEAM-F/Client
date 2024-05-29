import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Layout from './pages/Layout';
import AllScholarships from './pages/AllScholarships';
import RecommendScholarships from './pages/RecommendScholarships';
import ScholarshipDetail from './pages/ScholarshipDetail';
import MyScholarshipsLayout from './pages/MyScholarshipsLayout';
import MyScholarshipsDate from './pages/MyScholarshipsDate';
import AuthKakaoCallback from './pages/AuthKakaoCallback';
import MyScholarshipsList from './pages/MyScholarshipList';
import MyScholarshipsFavorite from './pages/MyScholarshipsFavorite';
import MyScholarshipDetail from './pages/MyScholarshipDetail';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail';
import CoverLetterList from './pages/CoverLetterList';
import CoverLetterCreate from './pages/CoverLetterCreate';
import CoverLetterDetail from './pages/CoverLetterDetail';
import CoverLetterEdit from './pages/CoverLetterEdit';
import MyPage from './pages/MyPage';
import ReviewList from './pages/ReviewList';
import ReviewEdit from './pages/ReviewEdit';
import DocumentList from './pages/DocumentList';
import DocumentNew from './pages/DocumentNew';
import DocumentEdit from './pages/DocumentEdit';
import Privacy from './pages/Privacy';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/auth/kakao/callback',
        element: <AuthKakaoCallback />,
      },
      {
        path: '/onboarding',
        element: <Onboarding />,
      },
      {
        path: '/scholarships',
        children: [
          {
            path: '',
            element: <AllScholarships />,
          },
          {
            path: ':id',
            element: <ScholarshipDetail />,
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
            path: ':id',
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
    ],
  },
]);
