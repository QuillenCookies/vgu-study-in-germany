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
import { ArrowLeft, ArrowRight, Clock, Euro, MapPin, Info } from 'lucide-react';

interface TrainRoute {
  id: string;
  title: string;
  description: string;
  image: string;
  lines: string[];
  duration: string;
}

const frankfurtRoutes: TrainRoute[] = [
  {
    id: 's-bahn',
    title: 'S-Bahn — Frankfurt Metro Rail',
    description: 'The backbone of Frankfurt commuting. S1–S9 lines connect the city centre, university campuses, suburbs, and the airport. Runs every 15–30 minutes with a 30-min city loop.',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1080&q=80',
    lines: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S8', 'S9'],
    duration: 'Every 15–30 min',
  },
  {
    id: 'u-bahn',
    title: 'U-Bahn — City Subway',
    description: 'Frankfurt\'s underground subway covers the inner city. U4, U5, U6, U7 serve popular student areas, Sachsenhausen, Bockenheim, and Bornheim. Perfect for daily commutes.',
    image: 'https://images.unsplash.com/photo-1555661530-68c8e98db4e6?auto=format&fit=crop&w=1080&q=80',
    lines: ['U1', 'U2', 'U3', 'U4', 'U5', 'U6', 'U7', 'U8', 'U9'],
    duration: 'Every 5–10 min (peak)',
  },
  {
    id: 'airport',
    title: 'Airport Express — S8 & S9',
    description: 'Direct rail from Frankfurt Central to Frankfurt Airport (FRA) in just 11 minutes. S8 and S9 run every 15 minutes, 24/7, making arrival and travel easy for international students.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1080&q=80',
    lines: ['S8', 'S9'],
    duration: '11 min to Airport',
  },
  {
    id: 'rmv',
    title: 'RMV Regional Trains',
    description: 'The Rhine-Main-Verkehrsverbund (RMV) regional network connects Frankfurt to Darmstadt, Wiesbaden, Mainz, and Marburg. One ticket works across all modes in the region.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1080&q=80',
    lines: ['RE', 'RB', 'SE lines'],
    duration: 'Regional connections',
  },
  {
    id: 'ice',
    title: 'ICE Long-Distance (DB)',
    description: 'Frankfurt Hauptbahnhof is one of Germany\'s busiest rail hubs. ICE trains reach Berlin in 4h, Munich in 3.5h, Hamburg in 4h. The Deutsche Bahn Semester Ticket gives huge discounts.',
    image: 'https://images.unsplash.com/photo-1462310078�7be2a19f25e19afba78?auto=format&fit=crop&w=1080&q=80',
    lines: ['ICE', 'IC', 'EC'],
    duration: 'Berlin 4h / Munich 3.5h',
  },
];

// Fix one broken URL
frankfurtRoutes[4].image = 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1080&q=80';

interface TicketInfo {
  name: string;
  price: string;
  validity: string;
  note: string;
}

const tickets: TicketInfo[] = [
  { name: 'Single Ticket (Zone 50)', price: '€3.40', validity: '2 hours', note: 'Good for one trip within Frankfurt' },
  { name: 'Day Ticket', price: '€8.90', validity: '24 hours', note: 'Best for tourist days / arrivals' },
  { name: 'Weekly Ticket', price: '€30.50', validity: '7 days', note: 'Unlimited rides in Frankfurt' },
  { name: 'Semester Ticket', price: '~€200/sem', validity: 'Full semester', note: 'Included with Goethe / h_da enrollment' },
  { name: 'Deutschlandticket', price: '€58/month', validity: '1 month', note: 'Nationwide travel on all regional trains' },
];

interface CommuteRow {
  from: string;
  to: string;
  line: string;
  time: string;
}

const commuteData: CommuteRow[] = [
  { from: 'Frankfurt Hbf', to: 'Goethe Uni (Bockenheim)', line: 'U6/U7', time: '12 min' },
  { from: 'Frankfurt Hbf', to: 'Frankfurt Airport', line: 'S8/S9', time: '11 min' },
  { from: 'Frankfurt Hbf', to: 'Sachsenhausen', line: 'S3/S4/S5', time: '8 min' },
  { from: 'Frankfurt Hbf', to: 'Darmstadt (h_da)', line: 'S3', time: '38 min' },
  { from: 'Frankfurt Hbf', to: 'Wiesbaden', line: 'S1/S8/S9', time: '45 min' },
  { from: 'Frankfurt Hbf', to: 'Mainz', line: 'S8/S9', time: '40 min' },
];

const TrainsPage: React.FC = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative bg-[#0a2463] text-white py-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1920&q=80')" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Badge variant="orange" className="mb-4 text-sm px-4 py-1">🚆 Frankfurt Transport</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Get Around <span className="text-[#f97316]">Frankfurt</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Master the S-Bahn, U-Bahn, RMV, and ICE — your complete guide to public transport in Frankfurt for international students.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            {[
              { label: 'Train Lines', value: '15+' },
              { label: 'S-Bahn Lines', value: '9' },
              { label: 'Airport in', value: '11 min' },
              { label: 'Semester Ticket', value: '~€200' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 min-w-[120px]">
                <div className="text-3xl font-extrabold text-[#f97316]">{value}</div>
                <div className="text-sm text-white/70 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery4 Carousel ───────────────────────────────── */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="mb-10 flex items-end justify-between">
            <div className="flex flex-col gap-3">
              <Badge className="w-fit">Route Discovery</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a2463] tracking-tight">
                Frankfurt Transport Lines
              </h2>
              <p className="text-gray-500 max-w-lg text-lg">
                Explore every transport line that connects your university, home, and the city.
              </p>
            </div>
            <div className="hidden md:flex shrink-0 gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => carouselApi?.scrollPrev()}
                disabled={!canScrollPrev}
                className="disabled:opacity-40 rounded-xl border-[#0a2463]/30 hover:bg-[#0a2463] hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => carouselApi?.scrollNext()}
                disabled={!canScrollNext}
                className="disabled:opacity-40 rounded-xl border-[#0a2463]/30 hover:bg-[#0a2463] hover:text-white transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="w-full">
          <Carousel
            setApi={setCarouselApi}
            opts={{ breakpoints: { '(max-width: 768px)': { dragFree: true } } }}
          >
            <CarouselContent className="ml-4 md:ml-[max(2rem,calc(50vw-560px))]">
              {frankfurtRoutes.map((route) => (
                <CarouselItem key={route.id} className="max-w-[300px] md:max-w-[340px] pl-5">
                  <div className="group relative h-full min-h-[420px] overflow-hidden rounded-2xl cursor-pointer">
                    <img
                      src={route.image}
                      alt={route.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a2463]/90 via-[#0a2463]/30 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      {/* Line badges */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {route.lines.map((l) => (
                          <span key={l} className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#f97316] text-white">
                            {l}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{route.title}</h3>
                      <p className="text-sm text-white/75 line-clamp-3 mb-3">{route.description}</p>
                      <div className="flex items-center gap-1.5 text-sm text-[#f97316] font-medium">
                        <Clock className="w-4 h-4" />
                        {route.duration}
                        <ArrowRight className="ml-auto w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Dot indicators */}
          <div className="mt-6 flex justify-center gap-2">
            {frankfurtRoutes.map((_, i) => (
              <button
                key={i}
                className={`h-2 rounded-full transition-all ${currentSlide === i ? 'w-6 bg-[#0a2463]' : 'w-2 bg-gray-300'}`}
                onClick={() => carouselApi?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Ticket Prices ───────────────────────────────────── */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col gap-3 mb-8">
            <Badge variant="orange" className="w-fit">Ticket Prices & Portals</Badge>
            <h2 className="text-2xl font-bold text-[#0a2463]">Frankfurt RMV Ticket Guide</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tickets.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-[#0a2463]">{t.name}</h3>
                  <span className="text-xl font-extrabold text-[#f97316]">{t.price}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {t.validity}
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600 bg-blue-50 rounded-xl p-3">
                  <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  {t.note}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="https://www.rmv.de/en/homepage/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#0a2463] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#0a2463]/90 transition-colors"
            >
              <MapPin className="w-4 h-4" /> RMV Journey Planner
            </a>
            <a
              href="https://www.bahn.de/en"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors"
            >
              <Euro className="w-4 h-4" /> Deutsche Bahn Tickets
            </a>
          </div>
        </div>
      </section>

      {/* ── Commute Estimations ──────────────────────────────── */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col gap-3 mb-8">
            <Badge className="w-fit">Commute Analytics</Badge>
            <h2 className="text-2xl font-bold text-[#0a2463]">Commute Time Estimations from Frankfurt Hbf</h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#0a2463] text-white">
                <tr>
                  {['From', 'To', 'Line', 'Est. Time'].map((h) => (
                    <th key={h} className="px-5 py-4 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {commuteData.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-5 py-3 text-gray-600">{row.from}</td>
                    <td className="px-5 py-3 font-medium text-[#0a2463]">{row.to}</td>
                    <td className="px-5 py-3">
                      <span className="bg-[#f97316]/10 text-[#f97316] font-bold text-xs px-2 py-0.5 rounded-full">
                        {row.line}
                      </span>
                    </td>
                    <td className="px-5 py-3 flex items-center gap-1.5 text-gray-600">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {row.time}
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

export default TrainsPage;
