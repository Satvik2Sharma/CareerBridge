import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';

import { LandingPage } from '../pages/LandingPage';
import { CareerDashboard } from '../pages/CareerDashboard';
import { MSMEDashboard } from '../pages/MSMEDashboard';
import { ProfilePage } from '../pages/ProfilePage';
import { ResumePage } from '../pages/ResumePage';
import { JobDiscoveryPage } from '../pages/JobDiscoveryPage';
import { JobDetailsPage } from '../pages/JobDetailsPage';
import { GovernmentJobsPage } from '../pages/GovernmentJobsPage';
import { CareerExplorerPage } from '../pages/CareerExplorerPage';
import { CareerComparisonPage } from '../pages/CareerComparisonPage';
import { SkillGapPage } from '../pages/SkillGapPage';
import { RoadmapPage } from '../pages/RoadmapPage';
import { AssessmentsPage } from '../pages/AssessmentsPage';
import { BusinessProfilePage } from '../pages/BusinessProfilePage';
import { MSMEAssessmentPage } from '../pages/MSMEAssessmentPage';
import { MSMERecommendationsPage } from '../pages/MSMERecommendationsPage';
import { MSMERoadmapPage } from '../pages/MSMERoadmapPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/career',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/career/dashboard" replace /> },
      { path: 'dashboard', element: <CareerDashboard /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'resume', element: <ResumePage /> },
      { path: 'jobs', element: <JobDiscoveryPage /> },
      { path: 'jobs/:id', element: <JobDetailsPage /> },
      { path: 'government-jobs', element: <GovernmentJobsPage /> },
      { path: 'careers', element: <CareerExplorerPage /> },
      { path: 'careers/compare', element: <CareerComparisonPage /> },
      { path: 'skill-gap', element: <SkillGapPage /> },
      { path: 'roadmap', element: <RoadmapPage /> },
      { path: 'assessments', element: <AssessmentsPage /> }
    ]
  },
  {
    path: '/business',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/business/dashboard" replace /> },
      { path: 'dashboard', element: <MSMEDashboard /> },
      { path: 'profile', element: <BusinessProfilePage /> },
      { path: 'assessment', element: <MSMEAssessmentPage /> },
      { path: 'recommendations', element: <MSMERecommendationsPage /> },
      { path: 'roadmap', element: <MSMERoadmapPage /> }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);
