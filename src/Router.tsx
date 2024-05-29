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
    ],
  },
]);
