import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, MapPin, FileText, Shield, Phone, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const districts = [
  {
    name: 'Sachsenhausen', coordinates: '50.0988° N, 8.6883° E',
    type: 'Popular & Lively', rent: '€700 – €1,100/mo', color: 'from-blue-500 to-indigo-600',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80',
    proximity: { hospital: '10 min', supermarket: '3 min', uni: '20 min', transport: 'U1, U2, S-Bahn' },
    highlight: 'Famous Apfelwein district. Very social, close to museums & riverside.',
    costs: { electricity: '€60–80', water: '€30', food: '€250–350' },
  },
  {
    name: 'Bornheim', coordinates: '50.1210° N, 8.7103° E',
    type: 'Student-Friendly', rent: '€650 – €950/mo', color: 'from-green-500 to-emerald-600',
    image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=600&q=80',
    proximity: { hospital: '15 min', supermarket: '5 min', uni: '15 min', transport: 'U4, U7, Tram 12' },
    highlight: 'Multicultural, vibrant. Great local markets and affordable dining options.',
    costs: { electricity: '€55–75', water: '€28', food: '€220–320' },
  },
  {
    name: 'Westend', coordinates: '50.1195° N, 8.6548° E',
    type: 'Premium & Quiet', rent: '€1,000 – €1,800/mo', color: 'from-amber-500 to-orange-500',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80',
    proximity: { hospital: '8 min', supermarket: '5 min', uni: '10 min', transport: 'U6, U7, S-Bahn' },
    highlight: 'Upscale residential area. Close to Goethe University and the financial district.',
    costs: { electricity: '€70–90', water: '€35', food: '€280–400' },
  },
  {
    name: 'Nordend', coordinates: '50.1277° N, 8.6893° E',
    type: 'Trendy & Cultural', rent: '€750 – €1,100/mo', color: 'from-purple-500 to-violet-600',
    image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=600&q=80',
    proximity: { hospital: '12 min', supermarket: '4 min', uni: '18 min', transport: 'U5, Tram 18' },
    highlight: 'Highly sought-after by students and young professionals. Great cafe culture.',
    costs: { electricity: '€60–80', water: '€30', food: '€240–340' },
  },
  {
    name: 'Gallus', coordinates: '50.1065° N, 8.6481° E',
    type: 'Budget-Friendly', rent: '€550 – €800/mo', color: 'from-rose-500 to-pink-600',
    image: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=600&q=80',
    proximity: { hospital: '18 min', supermarket: '7 min', uni: '25 min', transport: 'U4, S1-S9' },
    highlight: 'Most affordable option near the main station. Fast redevelopment underway.',
    costs: { electricity: '€50–70', water: '€25', food: '€200–280' },
  },
  {
    name: 'Bockenheim', coordinates: '50.1152° N, 8.6456° E',
    type: 'University Quarter', rent: '€600 – €900/mo', color: 'from-teal-500 to-cyan-600',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    proximity: { hospital: '10 min', supermarket: '5 min', uni: '5 min', transport: 'U6, U7, Tram 16' },
    highlight: 'Directly adjacent to Goethe University campus. Best for freshers and international students.',
    costs: { electricity: '€55–75', water: '€28', food: '€210–310' },
  },
];

const legalTips = [
  { title: 'Mietvertrag (Rental Contract)', icon: <FileText className="w-5 h-5" />, color: 'bg-blue-50 border-blue-200 text-blue-800', desc: 'Always get a written contract. Key items: rent amount (Kaltmiete vs Warmmiete), notice period (usually 3 months), deposit cap (max 3 months cold rent), and Nebenkosten (utility costs).' },
  { title: 'Anmeldung (Registration)', icon: <Home className="w-5 h-5" />, color: 'bg-green-50 border-green-200 text-green-800', desc: 'Legally required within 14 days of moving in. Visit the Einwohnermeldeamt (residents\' registration office) with your rental contract and passport. Critical for opening a bank account and getting a student visa.' },
  { title: 'Kaution (Deposit)', icon: <Shield className="w-5 h-5" />, color: 'bg-amber-50 border-amber-200 text-amber-800', desc: 'Legally capped at 3 months\' cold rent. Must be returned within 3–6 months after move-out, minus any deductions for damages. Keep all receipts and document the apartment\'s condition with photos at move-in.' },
  { title: 'Tenant Rights', icon: <Shield className="w-5 h-5" />, color: 'bg-purple-50 border-purple-200 text-purple-800', desc: 'German tenants have strong legal protections. Landlords cannot raise rent more than 20% in 3 years (Mietpreisbremse). Contact the Mieterverein (Tenants\' Association) if you have disputes.' },
];

const resources = [
  { name: 'WG-Gesucht', desc: 'Germany\'s largest flatshare & room rental platform.', url: 'https://www.wg-gesucht.de', icon: '🏠' },
  { name: 'Studierendenwerk Frankfurt', desc: 'Official student housing from the university. Very competitive.', url: 'https://www.studierendenwerk-frankfurt.de', icon: '🎓' },
  { name: 'ImmoScout24', desc: 'Largest German real estate portal for long-term rentals.', url: 'https://www.immobilienscout24.de', icon: '🏢' },
  { name: 'Mieterverein Frankfurt', desc: 'Tenants\' association for legal advice and tenant rights.', url: 'https://mietverein-frankfurt.de', icon: '⚖️' },
];

const HousingPage: React.FC = () => {
  const { tr } = useLanguage();
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      {/* Navbar spacer — compensates for fixed positioning */}
      <div className="h-[59px]" />

      {/* Hero */}
      <section className="relative w-full flex items-center justify-center" style={{ minHeight: '60vh' }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1920&q=80)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/85 via-[#0a2463]/70 to-[#0a2463]/50" />
        <div className="relative z-10 flex flex-col items-center text-center px-4 py-20 w-full max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition-colors backdrop-blur-sm">
            <ArrowLeft className="w-4 h-4" /> {tr('housing', 'backHome')}
          </Link>
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-500/30 text-blue-200 text-sm font-medium border border-blue-400/30">{tr('housing', 'badge')}</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
            {tr('housing', 'title1')} <span className="text-blue-400">{tr('housing', 'title2')}</span>
          </h1>
          <p className="text-lg text-white/85 mb-10 max-w-2xl">
            {tr('housing', 'desc')}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl">
            {[
              { label: tr('housing', 'statStudio'), value: '€750/mo', icon: '🏠' },
              { label: tr('housing', 'statWG'), value: '€550/mo', icon: '🛏️' },
              { label: tr('housing', 'statDist'), value: '16 Districts', icon: '🗺️' },
              { label: tr('housing', 'statReg'), value: '14 Days', icon: '📋' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-white/70 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GDPR Notice */}
      <div className="bg-amber-50 border-b border-amber-200 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-800">
            <strong>GDPR Compliance Notice:</strong> {tr('housing', 'gdprNotice')}
          </p>
        </div>
      </div>

      {/* Districts */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">{tr('housing', 'secDistBadge')}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{tr('housing', 'secDistTitle')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{tr('housing', 'secDistDesc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {districts.map((d, idx) => (
              <motion.div key={d.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative h-44 overflow-hidden">
                  <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${d.color} opacity-50`} />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold">{d.type}</span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-white text-gray-800 text-sm font-bold shadow">{d.rent}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{d.name}</h3>
                  <p className="text-xs text-gray-400 mb-3 flex items-center gap-1"><MapPin className="w-3 h-3" />{d.coordinates}</p>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{d.highlight}</p>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { label: 'Hospital', value: d.proximity.hospital, icon: '🏥' },
                      { label: 'Supermarket', value: d.proximity.supermarket, icon: '🛒' },
                      { label: 'University', value: d.proximity.uni, icon: '🎓' },
                      { label: 'Transport', value: d.proximity.transport, icon: '🚌' },
                    ].map((item) => (
                      <div key={item.label} className="bg-gray-50 rounded-xl p-2 text-center">
                        <div className="text-base">{item.icon}</div>
                        <div className="text-xs font-semibold text-gray-700">{item.value}</div>
                        <div className="text-xs text-gray-400">{item.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                    <p className="text-xs font-semibold text-blue-800 mb-1.5">Est. Monthly Living Costs</p>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div><span className="text-blue-600 font-bold">{d.costs.electricity}</span><br /><span className="text-gray-500">Electricity</span></div>
                      <div><span className="text-blue-600 font-bold">{d.costs.water}</span><br /><span className="text-gray-500">Water</span></div>
                      <div><span className="text-blue-600 font-bold">{d.costs.food}</span><br /><span className="text-gray-500">Food</span></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Housing Price Summary Table */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold">{tr('housing', 'secPriceBadge')}</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">{tr('housing', 'secPriceTitle')}</h2>
          </div>
          <div className="overflow-x-auto rounded-2xl shadow border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0a2463] text-white">
                  <th className="px-5 py-4 text-left font-semibold">District</th>
                  <th className="px-5 py-4 text-left font-semibold">Type</th>
                  <th className="px-5 py-4 text-left font-semibold">Avg Rent</th>
                  <th className="px-5 py-4 text-left font-semibold">Price/m²</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Bockenheim', type: 'Student Quarter', avg: '€600–900', sqm: '€14–18' },
                  { name: 'Bornheim', type: 'Multicultural', avg: '€650–950', sqm: '€15–19' },
                  { name: 'Gallus', type: 'Budget-Friendly', avg: '€550–800', sqm: '€12–16' },
                  { name: 'Nordend', type: 'Trendy', avg: '€750–1,100', sqm: '€16–22' },
                  { name: 'Sachsenhausen', type: 'Popular', avg: '€700–1,100', sqm: '€15–20' },
                  { name: 'Westend', type: 'Premium', avg: '€1,000–1,800', sqm: '€20–30' },
                ].map((row, i) => (
                  <tr key={row.name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-5 py-3 font-medium text-gray-900">{row.name}</td>
                    <td className="px-5 py-3 text-gray-600">{row.type}</td>
                    <td className="px-5 py-3 font-semibold text-blue-700">{row.avg}</td>
                    <td className="px-5 py-3 text-gray-600">{row.sqm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">* Prices are approximate averages based on aggregated market data. Individual prices may vary.</p>
        </div>
      </section>

      {/* Legal Information */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#0a1628] to-[#0a2463]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-semibold">{tr('housing', 'secLegalBadge')}</span>
            <h2 className="text-3xl font-extrabold text-white mb-3">{tr('housing', 'secLegalTitle')}</h2>
            <p className="text-white/70 max-w-xl mx-auto">{tr('housing', 'secLegalDesc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {legalTips.map((tip) => (
              <motion.div key={tip.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className={`rounded-2xl p-5 border ${tip.color}`}>
                <div className="flex items-center gap-3 mb-3">
                  {tip.icon}
                  <h3 className="font-bold text-base">{tip.title}</h3>
                </div>
                <p className="text-sm leading-relaxed opacity-90">{tip.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">{tr('housing', 'secResourcesBadge')}</span>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">{tr('housing', 'secResourcesTitle')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {resources.map((r) => (
              <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 group">
                <div className="text-3xl">{r.icon}</div>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{r.name}</h4>
                  <p className="text-sm text-gray-600 mt-0.5">{r.desc}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-8 bg-amber-50 rounded-2xl p-5 border border-amber-200 flex gap-4">
            <Phone className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-800 mb-1">Need Help? Contact the International Office</h4>
              <p className="text-sm text-amber-700">Goethe University's International Office offers free housing consultations for new international students. Book your slot at <a href="https://www.uni-frankfurt.de/international" target="_blank" rel="noreferrer" className="underline">uni-frankfurt.de/international</a></p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HousingPage;
