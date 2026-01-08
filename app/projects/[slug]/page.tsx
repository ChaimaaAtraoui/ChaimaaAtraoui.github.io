import { notFound } from 'next/navigation';

// This creates dynamic routes for all 10 projects

const projectData = {
  // Original 3 projects
  'market-dashboard': {
    title: 'Interactive Market Share Dashboard',
    description: 'FMCG market intelligence and competitive analysis',
  },
  'churn-prediction': {
    title: 'Customer Churn Prediction Model',
    description: 'Machine learning for customer retention',
  },
  'viral-marketing': {
    title: 'Social Media Virality Impact Analysis',
    description: 'TikTok and viral marketing effectiveness',
  },
  // New 7 projects
  'ab-testing-platform': {
    title: 'A/B Testing & Conversion Optimization',
    description: 'Statistical experimentation and conversion rate optimization',
  },
  'sentiment-analysis-nlp': {
    title: 'Multi-Language Sentiment Analysis',
    description: 'NLP-powered sentiment analysis across 12 languages',
  },
  'clv-prediction': {
    title: 'Customer Lifetime Value Prediction',
    description: 'Predictive analytics for customer value and retention',
  },
  'recommendation-engine': {
    title: 'Hybrid Recommendation System',
    description: 'Deep learning-powered product recommendations',
  },
  'demand-forecasting': {
    title: 'Demand Forecasting System',
    description: 'Time series forecasting for inventory optimization',
  },
  'fraud-detection': {
    title: 'Real-Time Fraud Detection',
    description: 'Graph neural networks for fraud prevention',
  },
  'anomaly-detection-system': {
    title: 'IoT Anomaly Detection System',
    description: 'Predictive maintenance using machine learning',
  },
};

export async function generateStaticParams() {
  return [
    // Original 3 projects
    { slug: 'market-dashboard' },
    { slug: 'churn-prediction' },
    { slug: 'viral-marketing' },
    // New 7 projects
    { slug: 'ab-testing-platform' },
    { slug: 'sentiment-analysis-nlp' },
    { slug: 'clv-prediction' },
    { slug: 'recommendation-engine' },
    { slug: 'demand-forecasting' },
    { slug: 'fraud-detection' },
    { slug: 'anomaly-detection-system' },
  ];
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projectData[params.slug as keyof typeof projectData];
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Chaimaa Atraoui`,
    description: project.description,
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projectData[params.slug as keyof typeof projectData];

  if (!project) {
    notFound();
  }

  // This page embeds the full HTML portfolio
  // The HTML file should be placed in the public folder
  return (
    <div className="w-full h-screen">
      <iframe
        src={`/portfolio.html#project-${params.slug}`}
        className="w-full h-full border-0"
        title={project.title}
      />
    </div>
  );
}