import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  context?: string;
  rating?: number;
}

export default function TestimonialCard({
  quote,
  author,
  context,
  rating,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
      <div className="flex items-start mb-4">
        <Quote className="text-gold w-8 h-8 flex-shrink-0 mr-2" />
        {rating && (
          <div className="ml-auto flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-lg ${
                  i < rating ? 'text-gold' : 'text-gray-300'
                }`}
              >
                ★
              </span>
            ))}
          </div>
        )}
      </div>
      
      <blockquote className="text-gray-700 italic mb-4 flex-grow">
        "{quote}"
      </blockquote>
      
      <div className="border-t border-gray-200 pt-4 mt-auto">
        <p className="font-semibold text-navy">{author}</p>
        {context && (
          <p className="text-sm text-gray-600">{context}</p>
        )}
      </div>
    </div>
  );
}