import React, { useState, useEffect, useMemo } from 'react';
import Layout from '../components/Layout';
import { Badge } from '../components/ui/badge';
import { MapPin, Globe, BookOpen, Star, ExternalLink, Loader2, X, Filter, ArrowDownUp } from 'lucide-react';
import { useUniversity } from '../context/UniversityContext';

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

const UniversitiesPage: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Context
  const { selectedLocation, setSelectedLocation } = useUniversity();

  // Local Filter & Sort State
  const [filterCity, setFilterCity] = useState<string>('All');
  const [filterHighlight, setFilterHighlight] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'default' | 'global' | 'subject'>('default');

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await fetch('/api/universities');
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data = await res.json();

        const mappedData: University[] = data.map((dbUni: any) => ({
          id: String(dbUni.uni_id),
          name: dbUni.uni_name,
          city: dbUni.city_name || `City Region ${dbUni.city_id}`,
          type: dbUni.type ? (dbUni.type.charAt(0).toUpperCase() + dbUni.type.slice(1)) as 'Public' | 'Private' : 'Public',
          globalRank: dbUni.ranking_global ? `#${dbUni.ranking_global} Global` : 'Unranked',
          subjectRank: dbUni.ranking_by_sub ? `#${dbUni.ranking_by_sub} Subject` : 'N/A',
          highlights: dbUni.highlights || ['International focus', 'Research driven'], // Ensure this maps correctly if added to DB
          image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
          url: dbUni.website_url || '#',
        }));

        setUniversities(mappedData);
      } catch (err: any) {
        console.error('Error fetching universities:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  // Dynamically extract unique cities and highlights for the dropdowns
  const availableCities = useMemo(() => Array.from(new Set(universities.map(u => u.city))).sort(), [universities]);
  const availableHighlights = useMemo(() => Array.from(new Set(universities.flatMap(u => u.highlights))).sort(), [universities]);

  // Apply Context, Local Filters, and Sorting
  const processedUniversities = useMemo(() => {
    let result = [...universities];

    // 1. Apply Context Filter (From Homepage)
    if (selectedLocation) {
      if (selectedLocation.type === 'city') {
        result = result.filter(u => u.city.toLowerCase() === selectedLocation.name.toLowerCase());
      } else if (selectedLocation.type === 'university') {
        result = result.filter(u => u.id === String(selectedLocation.id));
      }
    }

    // 2. Apply Local Dropdown Filters
    if (filterCity !== 'All') {
      result = result.filter(u => u.city === filterCity);
    }
    if (filterHighlight !== 'All') {
      result = result.filter(u => u.highlights.includes(filterHighlight));
    }

    // 3. Apply Sorting
    // Helper function to extract the first number from a ranking string (e.g., "#201 Global" -> 201)
    const parseRank = (rankString: string) => {
      const match = rankString.match(/\d+/);
      return match ? parseInt(match[0], 10) : 999999; // 999999 pushes "Unranked" to the bottom
    };

    if (sortBy === 'global') {
      result.sort((a, b) => parseRank(a.globalRank) - parseRank(b.globalRank));
    } else if (sortBy === 'subject') {
      result.sort((a, b) => parseRank(a.subjectRank) - parseRank(b.subjectRank));
    }

    return result;
  }, [universities, selectedLocation, filterCity, filterHighlight, sortBy]);


  if (isLoading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 animate-spin text-[#f97316] mb-4" />
          <p className="text-[#0a2463] font-medium">Loading universities...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh] text-red-500">
          Error loading universities: {error}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="relative bg-[#0a2463] text-white py-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80')" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Badge variant="orange" className="mb-4 text-sm px-4 py-1">🏛 Universities</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Study in <span className="text-[#f97316]">Germany</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Compare top universities — from global research powerhouses to career-focused applied sciences schools.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-50 min-h-screen">
        <div className="max-w-screen-xl mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a2463] tracking-tight">
              {selectedLocation?.type === 'city'
                ? `Universities in ${selectedLocation.name}`
                : 'University Comparison'}
            </h2>

            {selectedLocation && (
              <button
                onClick={() => setSelectedLocation(null)}
                className="flex items-center gap-2 px-4 py-2 bg-white text-gray-600 border border-gray-200 rounded-full hover:bg-gray-100 hover:text-red-500 transition-colors shadow-sm text-sm font-medium w-fit"
              >
                <span>Filtering by: <strong>{selectedLocation.name}</strong></span>
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* FILTER AND SORT BAR */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
              <div className="flex items-center gap-2 text-gray-500">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filter:</span>
              </div>

              <select
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-[#f97316] focus:border-[#f97316] p-2.5 outline-none cursor-pointer"
              >
                <option value="All">All Cities</option>
                {availableCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>-

              <select
                value={filterHighlight}
                onChange={(e) => setFilterHighlight(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-[#f97316] focus:border-[#f97316] p-2.5 outline-none cursor-pointer max-w-[200px]"
              >
                <option value="All">All Highlights</option>
                {availableHighlights.map(highlight => (
                  <option key={highlight} value={highlight}>{highlight}</option>
                ))}
              </select>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-4 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
              <div className="flex items-center gap-2 text-gray-500">
                <ArrowDownUp className="w-4 h-4" />
                <span className="text-sm font-medium">Sort by:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-[#f97316] focus:border-[#f97316] p-2.5 outline-none cursor-pointer"
              >
                <option value="default">Default</option>
                <option value="global">Global Rank (Best First)</option>
                <option value="subject">Subject Rank (Best First)</option>
              </select>
            </div>
          </div>

          {/* Fallback state */}
          {processedUniversities.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="text-4xl mb-4">🕵️‍♂️</div>
              <h3 className="text-xl font-bold text-[#0a2463] mb-2">No matching universities</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters to see more results.</p>
              <button
                onClick={() => {
                  setFilterCity('All');
                  setFilterHighlight('All');
                }}
                className="px-6 py-2 bg-[#f97316] text-white rounded-lg hover:bg-[#ea6c0a] transition-colors font-medium"
              >
                Clear Local Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {processedUniversities.map((uni) => (
                <div key={uni.id} className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <img src={uni.image} alt={uni.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a2463]/70 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      <Badge variant={uni.type === 'Public' ? 'default' : 'orange'} className="text-xs">
                        {uni.type}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-5 gap-3">
                    <h3 className="text-lg font-bold text-[#0a2463] leading-tight group-hover:text-[#f97316] transition-colors">
                      {uni.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <MapPin className="w-4 h-4 shrink-0 text-[#f97316]" />
                      {uni.city}
                    </div>

                    <div className="grid grid-cols-1 gap-1.5 bg-gray-50 p-3 rounded-xl mt-2 border border-gray-100">
                      <div className="flex items-start justify-between text-sm">
                        <span className="flex items-center gap-2 text-gray-600">
                          <Globe className="w-4 h-4 text-blue-500" /> Global Rank
                        </span>
                        <span className="font-semibold text-[#0a2463]">{uni.globalRank}</span>
                      </div>
                      <div className="flex items-start justify-between text-sm">
                        <span className="flex items-center gap-2 text-gray-600">
                          <BookOpen className="w-4 h-4 text-purple-500" /> Subject Rank
                        </span>
                        <span className="font-semibold text-[#0a2463]">{uni.subjectRank}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {uni.highlights.map((h, idx) => (
                        <span key={idx} className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 border border-blue-100 rounded-full px-2.5 py-1">
                          <Star className="w-3 h-3 text-blue-400" />
                          {h}
                        </span>
                      ))}
                    </div>

                    <a href={uni.url} target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center justify-between text-sm font-semibold text-[#0a2463] hover:text-[#f97316] transition-colors pt-4 border-t border-gray-100">
                      Visit Website
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default UniversitiesPage;