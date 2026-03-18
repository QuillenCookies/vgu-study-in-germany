import React from 'react';
import Layout from '../components/Layout';
import { Badge } from '../components/ui/badge';
import { MapPin, Globe, BookOpen, Star, ExternalLink } from 'lucide-react';

interface University {
  id: string;
  name: string;
  city: string;
  type: 'Public' | 'Private';
  globalRank: string;
  subjectRank: string;
  highlights: string[];
  image: string;
  url: string;
}

const frankfurtUniversities: University[] = [
  {
    id: 'goethe',
    name: 'Goethe University Frankfurt',
    city: 'Frankfurt am Main',
    type: 'Public',
    globalRank: '#201–250 (QS World)',
    subjectRank: '#101 Finance & Accounting',
    highlights: ['Strong research output', 'EU Erasmus programs', '45,000+ students', 'Free tuition (BA/MA)'],
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    url: 'https://www.goethe-university-frankfurt.de/en',
  },
  {
    id: 'frankfurt-uas',
    name: 'Frankfurt University of Applied Sciences',
    city: 'Frankfurt am Main',
    type: 'Public',
    globalRank: 'Top German UAS',
    subjectRank: '#Top 10 Engineering (Germany)',
    highlights: ['Practice-oriented curriculum', 'Industry partnerships', '15,000+ students', 'Affordable semester fees'],
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    url: 'https://www.frankfurt-university.de/en/',
  },
  {
    id: 'frankfurt-school',
    name: 'Frankfurt School of Finance & Management',
    city: 'Frankfurt am Main',
    type: 'Private',
    globalRank: '#70 (FT European Business Schools)',
    subjectRank: '#1 Finance in Germany',
    highlights: ['Finance & Banking hub', 'Prestigious AACSB accredited', 'Strong alumni network', 'MBA programs'],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
    url: 'https://www.frankfurt-school.de/en/',
  },
  {
    id: 'ebs',
    name: 'EBS Universität (European Business School)',
    city: 'Wiesbaden / Frankfurt region',
    type: 'Private',
    globalRank: 'Top 5 Private (Germany)',
    subjectRank: '#Top Business School — Germany',
    highlights: ['International focus', 'Germany\'s oldest private business school', 'Strong industry ties', 'Small class sizes'],
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
    url: 'https://www.ebs.edu/en',
  },
  {
    id: 'hda',
    name: 'Hochschule Darmstadt (h_da)',
    city: 'Darmstadt (30 min from Frankfurt)',
    type: 'Public',
    globalRank: 'Leading German UAS',
    subjectRank: '#Top 5 Computer Science UAS',
    highlights: ['IT & Engineering focus', '15 min by S-Bahn to Frankfurt', 'Low tuition fees', 'International student friendly'],
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
    url: 'https://h-da.de/en/',
  },
  {
    id: 'fias',
    name: 'Frankfurt Institute for Advanced Studies (FIAS)',
    city: 'Frankfurt am Main',
    type: 'Public',
    globalRank: 'Research Institute',
    subjectRank: '#Top Natural Sciences Research (Germany)',
    highlights: ['Pure research institution', 'Physics, Neuroscience, CS', 'PhD programs', 'International campus'],
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80',
    url: 'https://fias.institute/',
  },
];

const UniversitiesPage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative bg-[#0a2463] text-white py-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80')" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Badge variant="orange" className="mb-4 text-sm px-4 py-1">🏛 Frankfurt Universities</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Study in <span className="text-[#f97316]">Frankfurt</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Compare top universities in Frankfurt — from global research powerhouses to career-focused applied sciences schools.
          </p>
          {/* Quick comparison stats */}
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            {[
              { label: 'Universities', value: '6+' },
              { label: 'Public Options', value: '4' },
              { label: 'Private Options', value: '2' },
              { label: 'Avg. QS Rank', value: 'Top 250' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 min-w-[120px]">
                <div className="text-3xl font-extrabold text-[#f97316]">{value}</div>
                <div className="text-sm text-white/70 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* University Grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col gap-3 mb-10">
            <Badge className="w-fit">Platform</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a2463] tracking-tight">
              Frankfurt University Comparison
            </h2>
            <p className="text-gray-500 max-w-xl text-lg">
              Side-by-side comparison of universities across city, type, ranking, and key features.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {frankfurtUniversities.map((uni) => (
              <div
                key={uni.id}
                className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={uni.image}
                    alt={uni.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a2463]/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    <Badge variant={uni.type === 'Public' ? 'default' : 'orange'} className="text-xs">
                      {uni.type}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <h3 className="text-lg font-bold text-[#0a2463] leading-tight group-hover:text-[#f97316] transition-colors">
                    {uni.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <MapPin className="w-4 h-4 shrink-0 text-[#f97316]" />
                    {uni.city}
                  </div>

                  <div className="grid grid-cols-1 gap-1.5">
                    <div className="flex items-start gap-2 text-sm">
                      <Globe className="w-4 h-4 shrink-0 text-blue-500 mt-0.5" />
                      <span className="text-gray-700"><strong>Global Rank:</strong> {uni.globalRank}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <BookOpen className="w-4 h-4 shrink-0 text-purple-500 mt-0.5" />
                      <span className="text-gray-700"><strong>Subject:</strong> {uni.subjectRank}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {uni.highlights.map((h) => (
                      <span key={h} className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 rounded-full px-2.5 py-1">
                        <Star className="w-3 h-3" />
                        {h}
                      </span>
                    ))}
                  </div>

                  <a
                    href={uni.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center gap-2 text-sm font-semibold text-[#0a2463] hover:text-[#f97316] transition-colors pt-2 border-t border-gray-100"
                  >
                    Visit University Website
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0a2463] mb-6">Quick Comparison Table</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#0a2463] text-white">
                <tr>
                  {['University', 'City', 'Type', 'Global Rank', 'Tuition'].map((h) => (
                    <th key={h} className="px-5 py-4 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {frankfurtUniversities.map((uni, i) => (
                  <tr key={uni.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-5 py-3 font-medium text-[#0a2463]">{uni.name}</td>
                    <td className="px-5 py-3 text-gray-600">{uni.city}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${uni.type === 'Public' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                        {uni.type}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{uni.globalRank}</td>
                    <td className="px-5 py-3 text-gray-600">
                      {uni.type === 'Public' ? '~€300–500/sem' : '€10,000+/yr'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UniversitiesPage;
