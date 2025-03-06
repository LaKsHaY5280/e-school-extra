import { StaggerContainer, StaggerItem } from '../ScrollAnimations';
import StatCard from '../ui/StatCard';

const statsData = [
  {
    iconSrc: "/stat1.png",
    iconAlt: "Topics Icon",
    count: 1500,
    suffix: "+",
    title: "Topic",
    description: "Learn Anythings"
  },
  {
    iconSrc: "/stat2.png",
    iconAlt: "Students Icon",
    count: 1800,
    suffix: "+",
    title: "Students",
    description: "Learn Anythings"
  },
  {
    iconSrc: "/stat3.png",
    iconAlt: "Test Token Icon",
    count: 9,
    suffix: "K+",
    title: "Test Token",
    description: "Learn Anythings"
  },
  {
    iconSrc: "/stat4.png",
    iconAlt: "Student Icon",
    count: 2000,
    suffix: "+",
    title: "Student",
    description: "Learn Anythings"
  }
];

export default function StatsSection() {
  return (
    <section className="container mx-auto max-w-[1200px] px-8 py-12">
      <StaggerContainer delay={0.2} staggerDelay={0.15}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <StaggerItem key={stat.iconAlt}>
              <StatCard {...stat} index={index} />
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>
    </section>
  );
}
