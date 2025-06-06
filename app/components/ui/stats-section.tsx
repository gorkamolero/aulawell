import { TrendingUp, Users, Star, GraduationCap } from 'lucide-react';
import { AnimatedCounter } from './animated-counter';
import { FadeIn } from './fade-in';

const stats = [
  {
    icon: <TrendingUp className="w-8 h-8" />,
    value: 95,
    suffix: '%',
    label: 'Grade Improvement Rate',
    description: 'of students improve by at least one grade'
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    value: 500,
    suffix: '+',
    label: 'Students Taught',
    description: 'successfully guided since 2014'
  },
  {
    icon: <Star className="w-8 h-8" />,
    value: 4.9,
    suffix: '/5',
    label: 'Parent Rating',
    description: 'average satisfaction score'
  },
  {
    icon: <Users className="w-8 h-8" />,
    value: 20,
    suffix: '+',
    label: 'Nationalities',
    description: 'international families supported'
  }
];

export function StatsSection() {
  return (
    <section className="py-20 bg-navy text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Proven Excellence in Education</h2>
          <p className="text-xl text-gray-300">Numbers that speak to our commitment</p>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 text-gold rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2">
                  <AnimatedCounter 
                    end={stat.value} 
                    suffix={stat.suffix}
                    duration={2000 + index * 200}
                    decimals={stat.value === 4.9 ? 1 : 0}
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1">{stat.label}</h3>
                <p className="text-sm text-gray-400">{stat.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}