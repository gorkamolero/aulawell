interface ServiceCardProps {
  title: string;
  subtitle?: string;
  description: string | string[];
  outcome: string;
  icon?: React.ReactNode;
}

export default function ServiceCard({
  title,
  subtitle,
  description,
  outcome,
  icon,
}: ServiceCardProps) {
  return (
    <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col hover:-translate-y-1 border border-transparent hover:border-gold/20">
      {icon && (
        <div className="w-12 h-12 bg-navy text-white rounded-full flex items-center justify-center mb-4 group-hover:bg-gold transition-colors duration-300">
          {icon}
        </div>
      )}
      
      <h3 className="text-xl font-bold text-navy mb-2">{title}</h3>
      
      {subtitle && (
        <p className="text-sm font-semibold text-gray-600 mb-3">{subtitle}</p>
      )}
      
      <div className="flex-grow">
        {Array.isArray(description) ? (
          <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
            {description.map((item, index) => (
              <li key={index} className="text-sm">{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700 mb-4">{description}</p>
        )}
      </div>
      
      <div className="mt-auto pt-4 border-t border-gray-200">
        <p className="text-sm font-semibold text-gold italic">{outcome}</p>
      </div>
    </div>
  );
}