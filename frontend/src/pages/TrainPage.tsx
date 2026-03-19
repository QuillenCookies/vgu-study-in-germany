import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '../components/ui/carousel';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Euro,
  MapPin,
  Search,
  Train,
  AlertCircle,
  Loader2,
  Navigation
} from 'lucide-react';

interface CommuteRow {
  from: string;
  to: string;
  line: string;
  time: string;
  delay?: string;
}

const tickets = [
  { name: 'Single Ticket (Zone 50)', price: '€3.40', validity: '2 hours', note: 'Good for one trip within Frankfurt' },
  { name: 'Day Ticket', price: '€8.90', validity: '24 hours', note: 'Best for tourist days / arrivals' },
  { name: 'Weekly Ticket', price: '€30.50', validity: '7 days', note: 'Unlimited rides in Frankfurt' },
  { name: 'Semester Ticket', price: '~€200/sem', validity: 'Full semester', note: 'Included with VGU / Goethe enrollment' },
  { name: 'Deutschlandticket', price: '€58/month', validity: '1 month', note: 'Nationwide travel on all regional trains' },
];

const TrainPage: React.FC = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [stationName, setStationName] = useState('Frankfurt');
  const [searchInput, setSearchInput] = useState('Frankfurt');
  const [commuteData, setCommuteData] = useState<CommuteRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrainData = (query: string) => {
    setIsLoading(true);
    setError(null);
    fetch(`http://localhost:8000/api/trains/routes?station=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setCommuteData(data.data);
          setStationName(query);
        } else {
          setError(data.message || 'Error fetching data');
        }
      })
      .catch(err => setError('Failed to connect to backend: ' + err.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchTrainData('Frankfurt');
  }, []);

  useEffect(() => {
    if (!carouselApi) return;
    const update = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    update();
    carouselApi.on('select', update);
    return () => { carouselApi.off('select', update); };
  }, [carouselApi]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) fetchTrainData(searchInput);
  };

  const getLineStyles = (line: string) => {
    if (line.startsWith('S')) return 'bg-[#008d3f] border-[#006b30]';
    if (line.startsWith('U')) return 'bg-[#003090] border-[#002060]';
    if (line.match(/^(RE|RB|SE)/)) return 'bg-[#be0000] border-[#8b0000]';
    return 'bg-[#333333] border-black';
  };

  return (
    <Layout>
      {/* HERO & SEARCH BAR */}
      <section className="relative bg-[#0a2463] text-white py-16 px-4">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1920&q=80')] bg-cover" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Badge variant="orange" className="mb-4 gap-2 px-4 py-1">
            <Train className="w-3 h-3" /> Live DB Connection
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 tracking-tight">
            Departures from <span className="text-[#f97316]">{stationName}</span>
          </h1>

          <form onSubmit={handleSearch} className="flex max-w-lg mx-auto gap-3 bg-white/10 p-2 rounded-2xl backdrop-blur-lg border border-white/20 shadow-2xl">
            <div className="flex-1 flex items-center pl-3">
              <Navigation className="w-5 h-5 text-white/50" />
              {/* REPLACED Input Component with standard HTML input */}
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search station (e.g. Frankfurt, Darmstadt...)"
                className="w-full bg-transparent border-none text-white placeholder:text-white/50 focus:outline-none focus:ring-0 text-lg px-3"
              />
            </div>
            <Button type="submit" className="bg-[#f97316] hover:bg-[#ea580c] rounded-xl px-8 h-12 font-bold transition-transform active:scale-95">
              <Search className="w-5 h-5 mr-2" /> Find
            </Button>
          </form>
        </div>
      </section>

      {/* DYNAMIC CAROUSEL */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="mb-10 flex items-end justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-[#0a2463]">Fastest Connections</h2>
              <p className="text-gray-500">Next available departures from {stationName}.</p>
            </div>
            <div className="hidden md:flex gap-2">
              <Button size="icon" variant="outline" onClick={() => carouselApi?.scrollPrev()} disabled={!canScrollPrev} className="rounded-xl"><ArrowLeft /></Button>
              <Button size="icon" variant="outline" onClick={() => carouselApi?.scrollNext()} disabled={!canScrollNext} className="rounded-xl"><ArrowRight /></Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center py-20 gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-[#f97316]" />
            </div>
          ) : (
            <Carousel setApi={setCarouselApi} className="w-full">
              <CarouselContent className="-ml-4">
                {commuteData.slice(0, 8).map((route, idx) => (
                  <CarouselItem key={idx} className="pl-4 md:basis-1/2 lg:basis-1/4">
                    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all h-full border-b-8" style={{ borderBottomColor: getLineStyles(route.line).split(' ')[0].replace('bg-[', '').replace(']', '') }}>
                      <div className="flex justify-between items-start mb-6">
                        <span className={`${getLineStyles(route.line)} text-white font-black px-4 py-1.5 rounded-lg text-sm`}>
                          {route.line}
                        </span>
                        <div className="text-right">
                          <p className={`text-2xl font-black ${route.delay ? 'text-red-500' : 'text-[#0a2463]'}`}>{route.time}</p>
                          {route.delay && <Badge variant="destructive" className="mt-1 text-[10px] animate-pulse">{route.delay}</Badge>}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-[#0a2463] mb-1 line-clamp-2">{route.to}</h3>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
        </div>
      </section>

      {/* DEPARTURE BOARD TABLE */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0a2463] mb-8">Live Departure Board</h2>
          <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#0a2463] text-white">
                  <tr>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest">Line</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest">Destination</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest">Time</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {commuteData.map((row, i) => (
                    <tr key={i} className="hover:bg-blue-50/50 group">
                      <td className="px-8 py-5">
                        <span className={`${getLineStyles(row.line)} text-white font-bold text-xs px-3 py-1 rounded-md`}>
                          {row.line}
                        </span>
                      </td>
                      <td className="px-8 py-5 font-bold text-[#0a2463]">{row.to}</td>
                      <td className="px-8 py-5 font-mono font-bold text-gray-600">{row.time}</td>
                      <td className="px-8 py-5">
                        {row.delay ? (
                          <span className="text-red-600 font-black text-[11px] flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {row.delay}
                          </span>
                        ) : (
                          <span className="text-green-600 font-black text-[11px] uppercase">On Time</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TrainPage;