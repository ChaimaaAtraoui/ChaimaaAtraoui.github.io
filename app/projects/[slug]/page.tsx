import { notFound } from 'next/navigation';

// This creates dynamic routes for /projects/market-dashboard, /projects/churn-prediction, etc.

const projectData = {
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
};

export async function generateStaticParams() {
  return [
    { slug: 'market-dashboard' },
    { slug: 'churn-prediction' },
    { slug: 'viral-marketing' },
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
