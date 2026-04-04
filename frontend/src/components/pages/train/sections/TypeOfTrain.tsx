// frontend/src/components/pages/train/sections/TypeOfTrain.tsx
import React from 'react';
import { Badge } from '../../../ui/badge';

interface TransitType {
  abbr: string;
  name: string;
  emoji: string;
  color: string;
  badgeClass: string;
  speed: string;
  coverage: string;
  description: string;
}

const TRANSIT_TYPES: TransitType[] = [
  {
    abbr: 'ICE',
    name: 'InterCity Express',
    emoji: '🚄',
    color: '#ff0000',
    badgeClass: 'bg-gray-100 text-red-600 border border-gray-300',
    speed: 'Up to 300 km/h',
    coverage: 'National & European',
    description:
      'Germany\'s flagship high-speed train. Connects major cities like Frankfurt, Berlin, Hamburg and Munich at top speed. Requires a supplement on some tickets.',
  },
  {
    abbr: 'IC / EC',
    name: 'InterCity / EuroCity',
    emoji: '🚆',
    color: '#cc0000',
    badgeClass: 'bg-gray-100 text-red-700 border border-gray-200',
    speed: 'Up to 200 km/h',
    coverage: 'National & International',
    description:
      'Comfortable long-distance trains. EC extends to neighboring European countries. Not covered by the Semesterticket — a separate ticket or supplement is required.',
  },
  {
    abbr: 'RE / IR',
    name: 'RegionalExpress / InterRegio',
    emoji: '🚉',
    color: '#be0000',
    badgeClass: 'bg-[#be0000] text-white border-[#8b0000]',
    speed: 'Up to 160 km/h',
    coverage: 'Regional',
    description:
      'Connects cities within a federal state and beyond. Stops at major stations only. Covered by the Semesterticket within the RMV/VRN zone.',
  },
  {
    abbr: 'RB',
    name: 'RegionalBahn',
    emoji: '🚊',
    color: '#be0000',
    badgeClass: 'bg-[#be0000] text-white border-[#8b0000]',
    speed: 'Up to 120 km/h',
    coverage: 'Local & Regional',
    description:
      'Slower regional trains that stop at every station. Ideal for exploring smaller towns around your university city. Covered by Semesterticket.',
  },
  {
    abbr: 'S-Bahn',
    name: 'Stadtschnellbahn',
    emoji: '🟢',
    color: '#008d3f',
    badgeClass: 'bg-[#008d3f] text-white border-[#006b30]',
    speed: 'Up to 100 km/h',
    coverage: 'City & Suburbs',
    description:
      'Urban rapid transit running on shared DB tracks. The backbone of Frankfurt\'s student commute. Connects city center, airport, and outer districts. Always covered by the Semesterticket.',
  },
  {
    abbr: 'U-Bahn',
    name: 'Untergrundbahn',
    emoji: '🔵',
    color: '#003090',
    badgeClass: 'bg-[#003090] text-white border-[#002060]',
    speed: 'Up to 80 km/h',
    coverage: 'Inner City',
    description:
      'Underground / metro in major cities (Frankfurt, Berlin, Munich, Hamburg). Runs frequently and is fully covered by your Semesterticket for urban travel.',
  },
  {
    abbr: 'STR / Tram',
    name: 'Straßenbahn (Tram)',
    emoji: '🚋',
    color: '#c0392b',
    badgeClass: 'bg-[#c0392b] text-white border-[#922b21]',
    speed: 'Up to 70 km/h',
    coverage: 'Inner City',
    description:
      'Street-level trams found in Frankfurt, Darmstadt, Heidelberg and other cities. Covered by Semesterticket within the city zone. Great for last-mile travel.',
  },
  {
    abbr: 'BUS',
    name: 'Bus (Stadt / Regional)',
    emoji: '🚌',
    color: '#6d3fc8',
    badgeClass: 'bg-[#6d3fc8] text-white border-[#4a2a8a]',
    speed: 'Up to 60 km/h',
    coverage: 'City-wide & Villages',
    description:
      'City buses and regional coaches fill gaps in rail coverage. Night buses (N-lines) run when trains stop. All included in your Semesterticket.',
  },
];

const TypeOfTrain: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="orange" className="mb-3">German Transit Network</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A2B4C] dark:text-white mb-3">
            Know Your Trains 🇩🇪
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Germany has one of Europe's most comprehensive public transport
            systems. Here's every type of vehicle you'll encounter as a student.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TRANSIT_TYPES.map((t) => (
            <div
              key={t.abbr}
              className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all group overflow-hidden flex flex-col"
            >
              {/* Color bar */}
              <div
                className="h-1.5 w-full"
                style={{ backgroundColor: t.color }}
              />

              <div className="p-6 flex flex-col gap-4 flex-1">
                {/* Abbr badge + emoji */}
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-black px-3 py-1.5 rounded-lg border ${t.badgeClass}`}
                  >
                    {t.abbr}
                  </span>
                  <span className="text-2xl">{t.emoji}</span>
                </div>

                {/* Name */}
                <div>
                  <h3 className="font-bold text-[#1A2B4C] dark:text-white text-base leading-tight">
                    {t.name}
                  </h3>
                </div>

                {/* Meta chips */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    ⚡ <span className="font-medium">{t.speed}</span>
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    📍 <span className="font-medium">{t.coverage}</span>
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mt-auto">
                  {t.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TypeOfTrain;
