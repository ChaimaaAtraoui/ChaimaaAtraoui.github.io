import Link from 'next/link';
import Image from 'next/image';
import SectionContainer from '@/components/SectionContainer';
import PageTitle from '@/components/PageTitle';

export const metadata = {
  title: 'Business Analytics Projects | Chaimaa Atraoui',
  description: 'Market Intelligence and Data Analytics portfolio showcasing dashboard development, machine learning, and strategic analysis projects.',
};

export default function ProjectsPage() {
  const projects = [
    {
      id: 'market-dashboard',
      title: 'Interactive Market Share Dashboard',
      description: 'Comprehensive Power BI dashboard analyzing FMCG market dynamics across multiple product categories, regions, and time periods. Provides real-time competitive intelligence and market performance tracking.',
      image: '/projects/hero_market_dashboard.png',
      tags: ['Power BI', 'Market Analysis', 'FMCG', 'Competitive Intelligence'],
      metrics: {
        data: '€108M sales analyzed',
        scope: '5 brands, 3 regions',
        impact: '21% growth identified'
      },
      link: '/projects/market-dashboard'
    },
    {
      id: 'churn-prediction',
      title: 'Customer Churn Prediction Model',
      description: 'Advanced machine learning model predicting customer churn in telecommunications. Achieved 69.6% ROC-AUC using Gradient Boosting, enabling proactive retention strategies and customer lifetime value optimization.',
      image: '/projects/hero_churn_prediction.png',
      tags: ['Machine Learning', 'Python', 'Predictive Analytics', 'Customer Retention'],
      metrics: {
        accuracy: '69.6% ROC-AUC',
        data: '5,000 customers',
        impact: '€2-3M revenue protection'
      },
      link: '/projects/churn-prediction'
    },
    {
      id: 'viral-marketing',
      title: 'Social Media Virality Impact Analysis',
      description: 'Strategic analysis of TikTok and viral video marketing effectiveness across product categories. Identifies optimal platform-content combinations and quantifies ROI for viral marketing campaigns.',
      image: '/projects/hero_viral_marketing.png',
      tags: ['Social Media Analytics', 'Marketing Strategy', 'TikTok', 'ROI Analysis'],
      metrics: {
        scope: '200 campaigns analyzed',
        impact: '85% avg sales increase',
        roi: '285% average ROI'
      },
      link: '/projects/viral-marketing'
    }
  ];

  return (
    <>
      <PageTitle>Business Analytics Projects</PageTitle>
      <SectionContainer>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              Demonstrating expertise in market intelligence, predictive analytics, and data-driven strategic insights
            </p>
          </div>

          {/* Projects Grid */}
          <div className="py-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Link 
                  key={project.id}
                  href={project.link}
                  className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
                >
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="mb-3 text-lg font-bold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-500">
                      {project.title}
                    </h3>
                    
                    <p className="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    <div className="mb-4 space-y-2">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="flex items-center text-sm">
                          <span className="mr-2 font-semibold text-primary-500">✓</span>
                          <span className="text-gray-700 dark:text-gray-300">{value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 dark:bg-gray-700 dark:text-primary-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View Project Link */}
                    <div className="flex items-center font-semibold text-primary-500 group-hover:text-primary-700 dark:group-hover:text-primary-400">
                      View Project Details
                      <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* About Section */}
          <div className="py-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">About These Projects</h2>
            <div className="prose max-w-none text-gray-700 dark:prose-invert dark:text-gray-300">
              <p className="mb-4">
                These projects demonstrate comprehensive market intelligence capabilities, combining advanced 
                analytical techniques with strategic business thinking. Each project showcases:
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 font-bold text-primary-500">→</span>
                  <span><strong>Technical Proficiency:</strong> Power BI, Python, Machine Learning, Statistical Analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold text-primary-500">→</span>
                  <span><strong>Business Acumen:</strong> Market analysis, ROI calculation, strategic recommendations</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold text-primary-500">→</span>
                  <span><strong>Communication Skills:</strong> Clear visualizations, actionable insights, stakeholder presentations</span>
                </li>
              </ul>
              <p>
                All projects include real data analysis, professional visualizations, and quantified business impact.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="py-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Interested in Working Together?</h2>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
              Let's discuss how data-driven insights can drive your business forward.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-lg bg-primary-500 px-8 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-primary-600 hover:shadow-xl"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </SectionContainer>
    </>
  );
}
