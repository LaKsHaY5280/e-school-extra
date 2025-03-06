import { FadeIn } from '../ScrollAnimations';
import CourseCarousel from '../CourseCarousel';

export default function CoursesSection() {
  return (
    <section className="container mx-auto max-w-[1200px] px-8 py-24">
      <FadeIn direction="up">
        <h2 className="text-3xl md:text-4xl font-bold text-[#413960] text-center mb-16">Online Courses</h2>
      </FadeIn>
      <CourseCarousel />
    </section>
  );
}
