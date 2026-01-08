import Link from 'next/link';
import Image from 'next/image';
import SectionContainer from '@/components/SectionContainer';
import PageTitle from '@/components/PageTitle';

export const metadata = {
  title: 'Business Analytics Projects | Chaimaa Atraoui',
  description: 'Comprehensive data science and analytics portfolio showcasing expertise in machine learning, business intelligence, and data-driven strategic insights.',
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
    },
    {
      id: 'ab-testing-platform',
      title: 'E-commerce A/B Testing & Conversion Optimization',
      description: 'Designed and analyzed 15+ A/B tests for an e-commerce platform, optimizing checkout flow, pricing strategies, and UI elements. Implemented Bayesian A/B testing framework achieving 23% increase in conversion rate.',
      image: '/projects/hero_ab_testing.png',
      tags: ['A/B Testing', 'Statistical Analysis', 'Python', 'Experimentation'],
      metrics: {
        tests: '15+ experiments conducted',
        conversion: '23% conversion increase',
        revenue: '€1.2M annual revenue impact'
      },
      link: '/projects/ab-testing-platform'
    },
    {
      id: 'sentiment-analysis-nlp',
      title: 'Multi-Language Sentiment Analysis & Topic Modeling',
      description: 'NLP system analyzing 500K+ customer reviews across 12 languages using fine-tuned BERT models. Achieved 91% sentiment accuracy and identified 5 critical product issues, leading to 18-point NPS improvement.',
      image: '/projects/hero_sentiment_analysis.png',
      tags: ['NLP', 'BERT', 'Python', 'Topic Modeling'],
      metrics: {
        accuracy: '91% sentiment accuracy',
        scale: '500K+ reviews, 12 languages',
        impact: '+18 NPS improvement'
      },
      link: '/projects/sentiment-analysis-nlp'
    },
    {
      id: 'clv-prediction',
      title: 'Customer Lifetime Value Prediction & Segmentation',
      description: 'Probabilistic CLV model for 250K+ customers using BG/NBD and Gamma-Gamma models. Enabled targeted retention strategies reducing churn by 28% in high-value segments and achieving 3.4x marketing ROI.',
      image: '/projects/hero_clv_prediction.png',
      tags: ['Predictive Analytics', 'Customer Segmentation', 'Python', 'BG/NBD'],
      metrics: {
        customers: '250K+ customers analyzed',
        churn: '28% churn reduction',
        roi: '3.4x marketing ROI'
      },
      link: '/projects/clv-prediction'
    },
    {
      id: 'recommendation-engine',
      title: 'Hybrid Recommendation System with Deep Learning',
      description: 'Production-scale recommendation engine serving 2M+ users using two-tower neural network architecture. Achieved 34% CTR increase with sub-50ms inference latency through hybrid collaborative filtering approach.',
      image: '/projects/hero_recommendation_engine.png',
      tags: ['Deep Learning', 'Neural Networks', 'Python', 'Production ML'],
      metrics: {
        users: '2M+ users served',
        ctr: '34% CTR increase',
        latency: '<50ms inference'
      },
      link: '/projects/recommendation-engine'
    },
    {
      id: 'demand-forecasting',
      title: 'Multi-Horizon Demand Forecasting System',
      description: 'Ensemble forecasting system for 5,000+ SKUs combining Prophet, LSTM, and XGBoost. Achieved 87% accuracy at 4-week horizon, reducing inventory costs by €3.1M annually while improving stock availability.',
      image: '/projects/hero_demand_forecasting.png',
      tags: ['Time Series', 'Forecasting', 'Prophet', 'LSTM'],
      metrics: {
        accuracy: '87% forecast accuracy',
        skus: '5,000+ SKUs forecasted',
        savings: '€3.1M cost reduction'
      },
      link: '/projects/demand-forecasting'
    },
    {
      id: 'fraud-detection',
      title: 'Real-Time Fraud Detection with Graph Neural Networks',
      description: 'GNN-powered fraud detection system processing 1M+ daily transactions. Achieved 94% detection rate with 0.8% false positive rate, preventing €8.7M in fraudulent transactions annually.',
      image: '/projects/hero_fraud_detection.png',
      tags: ['Graph Neural Networks', 'Real-time ML', 'Python', 'Fraud Prevention'],
      metrics: {
        detection: '94% detection rate',
        precision: '0.8% false positive',
        prevented: '€8.7M fraud prevented'
      },
      link: '/projects/fraud-detection'
    },
    {
      id: 'anomaly-detection-system',
      title: 'Real-Time Anomaly Detection for IoT Sensors',
      description: 'Production MLOps system processing 10M+ daily sensor readings using Isolation Forest and LSTM autoencoders. Achieved 67% false positive reduction with 48-hour advance failure warnings.',
      image: '/projects/hero_anomaly_detection.png',
      tags: ['MLOps', 'Anomaly Detection', 'IoT', 'Predictive Maintenance'],
      metrics: {
        scale: '10M+ daily readings',
        accuracy: '67% FP reduction',
        warning: '48-hour advance warning'
      },
      link: '/projects/anomaly-detection-system'
    }
  ];

  return (
    <>
      <PageTitle>Data Science & Analytics Projects</PageTitle>
      <SectionContainer>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              Comprehensive portfolio showcasing expertise in machine learning, business intelligence, statistical analysis, and data-driven strategic insights
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
                These projects demonstrate comprehensive data science and analytics capabilities, combining advanced 
                technical skills with strategic business thinking. Each project showcases:
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 font-bold text-primary-500">→</span>
                  <span><strong>Technical Expertise:</strong> Machine Learning, Deep Learning, NLP, Time Series, Statistical Analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold text-primary-500">→</span>
                  <span><strong>Business Impact:</strong> Quantified results, ROI analysis, strategic recommendations</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold text-primary-500">→</span>
                  <span><strong>Production Skills:</strong> Scalable systems, real-time processing, MLOps practices</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold text-primary-500">→</span>
                  <span><strong>Communication:</strong> Clear visualizations, actionable insights, stakeholder presentations</span>
                </li>
              </ul>
              <p>
                All projects include rigorous methodology, professional visualizations, and measurable business outcomes.
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