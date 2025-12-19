import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/intro">
            Start Learning 🚀
          </Link>
        </div>
      </div>
    </header>
  );
}

function CourseHighlights() {
  const highlights = [
    {
      title: '🤖 Comprehensive Curriculum',
      description: 'Learn everything from robot basics to advanced AI integration, covering 18 detailed chapters.',
    },
    {
      title: '💻 Hands-On Learning',
      description: 'Build real robots with ROS 2, Python programming, and simulation tools like Gazebo and Isaac Sim.',
    },
    {
      title: '🧠 AI-Powered Robotics',
      description: 'Master Vision-Language-Action models, GPT integration, and machine learning for intelligent robots.',
    },
    {
      title: '🚶 Humanoid Focus',
      description: 'Specialize in bipedal walking, balance control, manipulation, and human-robot interaction.',
    },
    {
      title: '🛠️ Real-World Skills',
      description: 'Learn industry-standard tools, hardware selection, sim-to-real transfer, and deployment strategies.',
    },
    {
      title: '🎓 Project-Based',
      description: 'Complete a capstone project building your own smart humanoid robot from scratch.',
    },
  ];

  return (
    <section className={styles.highlights}>
      <div className="container">
        <Heading as="h2" className="text--center margin-bottom--lg">
          Why This Course??
        </Heading>
        <div className={styles.highlightGrid}>
          {highlights.map((highlight, idx) => (
            <div key={idx} className={styles.highlightCard}>
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoursePath() {
  const parts = [
    { title: 'Part I: Foundations', chapters: 'Chapters 1-3', topics: 'Physical AI, Intelligent Machines, Robot Sensing' },
    { title: 'Part II: ROS 2 & Simulation', chapters: 'Chapters 4-6', topics: 'ROS 2 Basics, Programming, Gazebo Simulation' },
    { title: 'Part III: Modeling & Physics', chapters: 'Chapters 7-8', topics: 'URDF/SDF Models, Robot Physics' },
    { title: 'Part IV: Advanced Simulation', chapters: 'Chapters 9-10', topics: 'NVIDIA Isaac, Vision, SLAM, Navigation' },
    { title: 'Part V: Humanoid Robotics', chapters: 'Chapters 11-13', topics: 'Movement, Walking, Balance, Manipulation' },
    { title: 'Part VI: AI Integration', chapters: 'Chapters 14-15', topics: 'VLA Models, GPT Integration, Voice Commands' },
    { title: 'Part VII: Hardware & Deployment', chapters: 'Chapters 16-17', topics: 'Hardware Selection, Sim-to-Real Transfer' },
    { title: 'Part VIII: Final Project', chapters: 'Chapter 18', topics: 'Build Your Smart Humanoid Robot' },
  ];

  return (
    <section className={styles.coursePath}>
      <div className="container">
        <Heading as="h2" className="text--center margin-bottom--lg">
          Course Structure
        </Heading>
        <div className={styles.pathGrid}>
          {parts.map((part, idx) => (
            <div key={idx} className={styles.pathCard}>
              <div className={styles.partNumber}>{idx + 1}</div>
              <h3>{part.title}</h3>
              <p className={styles.chapters}>{part.chapters}</p>
              <p className={styles.topics}>{part.topics}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <Heading as="h2" className="text--center">
          Ready to Build the Future of Robotics?
        </Heading>
        <p className="text--center margin-bottom--lg">
          Join thousands of students learning Physical AI and Humanoid Robotics
        </p>
        <div className="text--center">
          <Link
            className="button button--primary button--lg"
            to="/docs/intro">
            Start Your Journey Now →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="Learn Physical AI and Humanoid Robotics - A comprehensive course covering ROS 2, simulation, AI integration, and real-world robot deployment">
      <HomepageHeader />
      <main>
        <CourseHighlights />
        <CoursePath />
        <CTASection />
      </main>
    </Layout>
  );
}
