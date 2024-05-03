import React from 'react';

interface PillProps {
    title: string;
    color: 'red' | 'green' | 'yellow';
}

const Pill: React.FC<PillProps> = ({ title, color }) => {
  // Mapeo de colores a clases de Tailwind CSS
  const colorClasses = {
    red: "bg-red-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500"
  };

  return (
    <div className={`${colorClasses[color]} text-white text-xs font-medium rounded px-2 py-1 inline-block mb-2`}>
        {title}
    </div>
  )
}

export default Pill;