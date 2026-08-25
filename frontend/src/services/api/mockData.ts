import {
  UserProfile,
  Job,
  JobRecommendation,
  GovernmentRecruitment,
  Career,
  CareerRecommendation,
  Assessment,
  BusinessProfile,
  MSMEAnalysis,
  LearningRoadmapItem
} from '../../types';

export const mockDemoUser: UserProfile = {
  id: 'usr-1',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@example.com',
  career_goal: 'Backend Developer',
  experience_years: 0.5,
  education: 'B.Tech Computer Science (2025)',
  work_preference: 'Hybrid',
  skills: ['Python', 'Java', 'SQL', 'React', 'Git', 'REST APIs'],
  projects: [
    {
      title: 'Smart Career Recommendation Engine',
      technologies: ['Python', 'FastAPI', 'React', 'SQL'],
      description: 'Built job matching platform with deterministic scoring rules.'
    },
    {
      title: 'E-Commerce Microservices',
      technologies: ['Java', 'REST APIs', 'Git'],
      description: 'Designed RESTful catalog service with JWT authentication.'
    }
  ],
  certifications: ['AWS Cloud Practitioner'],
  readiness_score: 82.0,
  phone: '+91 98765 43210',
  location: 'Roorkee, Uttarakhand',
  bio: 'Passionate computer science graduate seeking backend software development roles with AI/cloud focus.'
};

export const mockDemoBusiness: BusinessProfile = {
  id: 'biz-1',
  name: 'Shree Ram Textiles & Retail',
  business_type: 'Clothing & Apparel Store',
  owner_name: 'Rajesh Kumar',
  location: 'Roorkee, Uttarakhand',
  employees_count: 4,
  monthly_orders: 280,
  current_tech: ['WhatsApp', 'Excel Notebook'],
  challenges: ['Inventory tracking', 'Customer retention', 'Online catalog'],
  digital_payments: true,
  online_presence: false,
  inventory_system: false
};

export const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Backend Developer Intern / Junior',
    company: 'TechInnovate Solutions',
    location: 'Remote / Bengaluru',
    work_type: 'Hybrid',
    experience_level: '0-1 years',
    category: 'Software Development',
    salary_range: '₹5,00,000 - ₹8,00,000 / year',
    career_id: 'car-2',
    required_skills: ['Java', 'SQL', 'REST APIs', 'Git'],
    preferred_skills: ['Spring Boot', 'Docker'],
    description: 'Build robust microservices using Java and REST APIs in an agile engineering squad.',
    type: 'PRIVATE_JOB',
    source: 'CareerBridge Core',
    source_url: 'https://techinnovate.example.com/careers/job-1',
    verification_status: 'VERIFIED',
    published_at: '2 hours ago',
    deadline: '15 Sep 2026'
  },
  {
    id: 'job-2',
    title: 'Python / FastAPI Backend Engineer',
    company: 'CloudScale Dynamics',
    location: 'Gurugram / Hybrid',
    work_type: 'Hybrid',
    experience_level: '0-2 years',
    category: 'Software Development',
    salary_range: '₹7,50,000 - ₹11,00,000 / year',
    career_id: 'car-2',
    required_skills: ['Python', 'FastAPI', 'SQL', 'Git'],
    preferred_skills: ['PostgreSQL', 'Docker', 'Redis'],
    description: 'Develop high-throughput asynchronous REST APIs for enterprise cloud SaaS products.',
    type: 'PRIVATE_JOB',
    source: 'Adzuna Partner Network',
    source_url: 'https://adzuna.com/job/py-eng-102',
    verification_status: 'VERIFIED',
    published_at: '1 day ago',
    deadline: '20 Sep 2026'
  },
  {
    id: 'job-3',
    title: 'Associate Software Engineer - Full Stack',
    company: 'NextGen Systems',
    location: 'Noida / Onsite',
    work_type: 'Onsite',
    experience_level: '0-2 years',
    category: 'Software Development',
    salary_range: '₹6,00,000 - ₹9,50,000 / year',
    career_id: 'car-1',
    required_skills: ['React', 'JavaScript', 'Python', 'Git'],
    preferred_skills: ['TypeScript', 'Node.js', 'TailwindCSS'],
    description: 'Collaborate across front-end React components and back-end RESTful microservices.',
    type: 'PRIVATE_JOB',
    source: 'National Career Service (NCS)',
    source_url: 'https://ncs.gov.in/job-post/ng-109',
    verification_status: 'VERIFIED',
    published_at: '3 days ago',
    deadline: '30 Sep 2026'
  }
];

export const mockGovernmentRecruitments: GovernmentRecruitment[] = [
  {
    id: 'gov-rec-1',
    recruiting_body: 'UPSC (Union Public Service Commission)',
    recruitment_name: 'Combined Defense Services & Digital Governance Examination 2026',
    notification_number: 'UPSC/04/2026-DG',
    notification_url: 'https://upsc.gov.in/notifications/04-2026',
    official_apply_url: 'https://upsconline.nic.in',
    total_vacancies: 450,
    selection_process: 'Written Exam + Technical Interview + Document Verification',
    status: 'ACTIVE',
    posts: [
      {
        id: 'post-101',
        recruitment_id: 'gov-rec-1',
        post_name: 'Assistant Section Officer (ASO) - Digital Governance',
        department: 'Ministry of Electronics & IT (MeitY)',
        pay_level: 'Level-7 (₹44,900 - ₹1,42,400)',
        vacancies: 120,
        education_required: 'Bachelor Degree in Engineering / Science',
        degree: 'B.Tech / B.E.',
        branch: 'Computer Science / IT / ECE',
        age_min: 20,
        age_max: 30,
        experience_years_required: 0
      }
    ]
  },
  {
    id: 'gov-rec-2',
    recruiting_body: 'SSC (Staff Selection Commission)',
    recruitment_name: 'Combined Graduate Level (CGL) Examination 2026',
    notification_number: 'SSC/CGL/2026-OFFICIAL',
    notification_url: 'https://ssc.gov.in/notice-cgl-2026',
    official_apply_url: 'https://ssc.gov.in/apply',
    total_vacancies: 8400,
    selection_process: 'Tier-1 CBT + Tier-2 CBT + Skill Test',
    status: 'ACTIVE',
    posts: [
      {
        id: 'post-201',
        recruitment_id: 'gov-rec-2',
        post_name: 'Junior Statistical Officer (JSO) & System Assistant',
        department: 'Ministry of Statistics & Programme Implementation',
        pay_level: 'Level-6 (₹35,400 - ₹1,12,400)',
        vacancies: 450,
        education_required: 'Graduation in any discipline with Mathematics or CS background',
        degree: 'B.Tech / B.Sc / BCA',
        branch: 'Any Discipline',
        age_min: 18,
        age_max: 30,
        experience_years_required: 0
      }
    ]
  }
];

export const mockCareers: Career[] = [
  {
    id: 'car-1',
    title: 'Full Stack Engineer',
    category: 'Software Engineering',
    description: 'Build end-to-end web applications combining React interfaces with backend database services.',
    required_skills: ['React', 'Python', 'SQL', 'Git', 'REST APIs'],
    preferred_skills: ['TypeScript', 'Docker', 'TailwindCSS'],
    education_expectations: 'B.Tech / BCA / B.Sc Computer Science',
    typical_experience: '0-2 years',
    prep_effort_months: '3-5 months',
    opportunity_demand: 'Extremely High'
  },
  {
    id: 'car-2',
    title: 'Backend Developer',
    category: 'Software Engineering',
    description: 'Design server-side logic, API endpoints, microservices, and database query optimization.',
    required_skills: ['Python', 'Java', 'SQL', 'Git', 'REST APIs'],
    preferred_skills: ['FastAPI', 'PostgreSQL', 'Docker', 'Redis'],
    education_expectations: 'B.Tech Computer Science or IT',
    typical_experience: '0-2 years',
    prep_effort_months: '2-4 months',
    opportunity_demand: 'High'
  },
  {
    id: 'car-3',
    title: 'Data Analyst & BI Specialist',
    category: 'Data & Analytics',
    description: 'Transform raw business data into actionable dashboards, insights, and statistical models.',
    required_skills: ['SQL', 'Python', 'Excel', 'Data Visualization'],
    preferred_skills: ['PowerBI', 'Pandas', 'Statistics'],
    education_expectations: 'Any Graduate with Analytical Background',
    typical_experience: '0-1 years',
    prep_effort_months: '2-3 months',
    opportunity_demand: 'High'
  }
];

export const mockCareerRecommendations: CareerRecommendation[] = [
  {
    career_id: 'car-2',
    title: 'Backend Developer',
    category: 'Software Engineering',
    match_score: 88,
    description: 'Excellent fit based on your core strength in Python, Java, SQL, and REST APIs.',
    strengths: ['Python', 'Java', 'SQL', 'REST APIs'],
    gaps: ['FastAPI', 'Docker', 'PostgreSQL'],
    prep_effort_months: '2-3 months',
    typical_experience: '0-2 years',
    explanation: 'Your profile exhibits strong technical alignment with backend architectural patterns.',
    next_step: 'Complete Docker & PostgreSQL containerization module.'
  },
  {
    career_id: 'car-1',
    title: 'Full Stack Engineer',
    category: 'Software Engineering',
    match_score: 84,
    description: 'High compatibility due to your React frontend skills and Python backend background.',
    strengths: ['React', 'Python', 'SQL', 'Git'],
    gaps: ['TypeScript', 'State Management'],
    prep_effort_months: '3 months',
    typical_experience: '0-2 years',
    explanation: 'Solid dual-layer candidate ready for junior full-stack engineering roles.',
    next_step: 'Build a end-to-end full stack project using React & FastAPI.'
  }
];

export const mockRoadmap: LearningRoadmapItem[] = [
  {
    step: 1,
    skill: 'FastAPI & Async Python',
    priority: 'HIGH',
    status: 'COMPLETED',
    estimated_weeks: 2,
    resources: [
      {
        id: 'res-1',
        title: 'FastAPI Official Masterclass & Async Architecture',
        type: 'Video Course',
        provider: 'CareerBridge Academy',
        duration: '6 hours',
        url: 'https://fastapi.tiangolo.com/tutorial/'
      }
    ]
  },
  {
    step: 2,
    skill: 'PostgreSQL & ORM Modeling',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    estimated_weeks: 3,
    resources: [
      {
        id: 'res-2',
        title: 'SQLAlchemy 2.0 Async & PostgreSQL Database Design',
        type: 'Interactive Tutorial',
        provider: 'PostgreSQL Docs',
        duration: '8 hours',
        url: 'https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html'
      }
    ]
  },
  {
    step: 3,
    skill: 'Docker Containerization & Microservices',
    priority: 'HIGH',
    status: 'NOT_STARTED',
    estimated_weeks: 2,
    resources: [
      {
        id: 'res-3',
        title: 'Docker for Backend Developers & Compose Setup',
        type: 'Hands-on Lab',
        provider: 'Docker Labs',
        duration: '5 hours',
        url: 'https://docs.docker.com/get-started/'
      }
    ]
  }
];

export const mockAssessments: Assessment[] = [
  {
    id: 'quiz-docker',
    skill: 'Docker',
    title: 'Docker & Containerization Fundamentals',
    description: 'Evaluate your knowledge of Dockerfiles, images, containers, and CLI flags.',
    readiness_boost: 5,
    questions: [
      {
        id: 'q1',
        text: 'Which Dockerfile directive specifies the command to execute when a container starts?',
        options: ['RUN', 'CMD', 'EXPOSE', 'ENTRYPOINT'],
        correct_index: 1
      },
      {
        id: 'q2',
        text: 'Which flag is passed to `docker run` to execute a container in the background (detached mode)?',
        options: ['-d', '-b', '-bg', '-p'],
        correct_index: 0
      },
      {
        id: 'q3',
        text: 'Which command builds an image named `myapp` from the current directory Dockerfile?',
        options: ['docker create .', 'docker build -t myapp .', 'docker image make .', 'docker run -b .'],
        correct_index: 1
      }
    ]
  }
];

export const mockMSMEAnalysis: MSMEAnalysis = {
  digital_maturity_score: 68,
  maturity_level: 'Developing Digital Adopter (Level 2)',
  category_scores: {
    'Digital Payments': 90,
    'Billing & Invoicing': 75,
    'Inventory Tracking': 40,
    'Online Presence': 30,
    'Customer Communication': 80,
    'Marketing Automation': 35
  },
  key_bottlenecks: [
    'Manual spreadsheet inventory tracking leads to out-of-stock items.',
    'No WhatsApp Business Catalog or Google Business Listing for local discovery.',
    'Lack of automated customer retention and loyalty messaging.'
  ],
  recommendations: [
    {
      id: 'rec-1',
      title: 'Implement Digital POS & Mobile Inventory Tracking',
      category: 'Inventory & Billing',
      problem: 'Currently managing inventory manually in notebooks and spreadsheets.',
      solution: 'Deploy a lightweight cloud POS mobile app (Vyapar / Khatabook / MyBillBook).',
      expected_benefit: 'Reduces stock reconciliation time by 80% and eliminates stockouts.',
      effort: 'LOW',
      impact: 'HIGH',
      priority: 1,
      cost_category: 'Freemium (₹0-₹200/mo)'
    },
    {
      id: 'rec-2',
      title: 'Launch Google Business Profile & WhatsApp Storefront',
      category: 'Online Discovery',
      problem: 'Local customers cannot find store operating hours or direct product catalog online.',
      solution: 'Create verified Google Maps business listing and setup WhatsApp Business Catalog.',
      expected_benefit: 'Attracts 30-50 additional walk-in customers weekly from local mobile searches.',
      effort: 'LOW',
      impact: 'HIGH',
      priority: 2,
      cost_category: '100% Free'
    }
  ],
  roadmap_90_day: {
    phase_1_days_1_30: [
      'Set up Google Business Profile & Google Maps location pin.',
      'Transition paper billing to free Vyapar digital invoicing app on smartphone.'
    ],
    phase_2_days_31_60: [
      'Create WhatsApp Business Catalog featuring top 25 clothing items.',
      'Introduce QR-code digital feedback counter stand.'
    ],
    phase_3_days_61_90: [
      'Run festive broadcast campaign to existing WhatsApp customer list.',
      'Review monthly profit & loss analytics inside digital POS app.'
    ]
  }
};
