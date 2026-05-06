import { ArrowRight, Code, Layout, Palette, Search, Smartphone, ShoppingBag } from "lucide-react";

export const metadata = {
  title: "Services | Infinite Design",
  description: "Comprehensive digital solutions for ambitious brands.",
};

export default function Services() {
  const services = [
    { icon: Code, title: "Business Websites", desc: "Fast, responsive sites built to convert.", details: "We build tailored corporate websites using cutting-edge frameworks like Next.js and React. Our focus is on load speed, mobile responsiveness, and intuitive navigation to ensure your business makes a powerful first impression." },
    { icon: ShoppingBag, title: "E-commerce Development", desc: "Scalable stores that drive sales.", details: "From custom Shopify themes to robust WooCommerce builds and headless commerce solutions. We engineer shopping experiences that reduce cart abandonment and maximize your ROI." },
    { icon: Layout, title: "UI/UX Design", desc: "Intuitive interfaces and seamless experiences.", details: "Our design process starts with deep user research. We create wireframes, interactive prototypes, and final high-fidelity interfaces that are not only beautiful but incredibly easy for your customers to use." },
    { icon: Palette, title: "Branding & Identity", desc: "Memorable visual systems and logos.", details: "More than just a logo. We build comprehensive brand guidelines, color palettes, typography systems, and visual assets that communicate your core values to the world." },
    { icon: Search, title: "SEO Optimization", desc: "Rank higher and attract organic traffic.", details: "Technical SEO is baked into every website we build. We ensure clean code structure, fast rendering, meta optimizations, and schema markup to help you dominate search engine results." },
    { icon: Smartphone, title: "Custom Web Applications", desc: "Complex solutions for unique problems.", details: "Need a custom portal, dashboard, or SaaS product? Our full-stack development team builds secure, scalable, and feature-rich web applications tailored precisely to your operational needs." }
  ];

  return (
    <div className="pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">Our <span className="text-accent-blue text-glow">Services</span></h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          We offer a comprehensive, customizable portfolio of creative services that help you solve your most complex business challenges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, i) => (
          <div key={i} className="glass p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-accent-blue">
                <service.icon size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{service.title}</h3>
                <p className="text-gray-400 text-sm">{service.desc}</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {service.details}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
