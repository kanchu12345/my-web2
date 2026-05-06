import Link from "next/link";
import { ArrowRight, Layout, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Portfolio | Infinite Design",
  description: "Explore our latest web design and development projects.",
};

const projects = [
  { name: "Versells Lanka", url: "https://versellslanka.com", category: "Corporate", desc: "A premium corporate identity and scalable web platform." },
  { name: "Richmond Leos", url: "https://richmondleos.org", category: "Non-Profit", desc: "Dynamic community platform with event management." },
  { name: "Lanka Sunrays", url: "https://lankasunrays.lk", category: "E-commerce", desc: "High-conversion e-commerce storefront for retail." },
  { name: "Shanthi Wedamadura", url: "https://shanthiwedamadura.com", category: "Healthcare", desc: "Trust-building healthcare clinic website with appointment booking." },
  { name: "Nations Trust Holdings", url: "https://nationstrustholdingslondon.com", category: "Finance", desc: "Secure, professional portal for international finance." },
  { name: "Enlyt Partners", url: "https://enlytpartners.com", category: "Consulting", desc: "Lead-generating landing pages for B2B consulting." },
  { name: "GPS Lanka Travels", url: "https://gpslankatravels.com", category: "Travel", desc: "Immersive booking experience for international tourists." },
  { name: "Tropica Flavours", url: "https://tropicaflavours.com", category: "FMCG", desc: "Vibrant brand showcase and product catalog." },
  { name: "Perx Lanka", url: "https://perxlanka.com", category: "Business Services", desc: "Modern service directory and client portal." }
];

export default function Portfolio() {
  return (
    <div className="pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">Our <span className="text-accent-blue text-glow">Portfolio</span></h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Explore our recent deployments across various industries. We build digital experiences that drive measurable results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((proj, i) => (
          <div key={i} className="group flex flex-col glass rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300">
            
            <div className="relative aspect-video bg-gray-900 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <Layout size={48} className="text-gray-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 z-10">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider text-white border border-white/20">
                  {proj.category}
                </span>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold mb-2">{proj.name}</h3>
              <p className="text-gray-400 mb-6 flex-grow">{proj.desc}</p>
              
              <div className="flex items-center justify-between mt-auto border-t border-white/10 pt-4">
                <Link href={`/portfolio/${proj.name.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-medium hover:text-accent-blue transition-colors flex items-center gap-1">
                  Read Case Study <ArrowRight size={14} />
                </Link>
                <a href={proj.url} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-full hover:bg-white/20 transition-colors" title="View Live Site">
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
