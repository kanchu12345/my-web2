"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code, Layout, Palette, Search, Smartphone, ShoppingBag, CheckCircle, Globe, Zap } from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* HERO SECTION */}
          <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-blue/10 via-background to-background z-0 pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
              >
                We Build Websites That <br className="hidden md:block"/>
                <span className="text-glow text-accent-blue">Drive Real Business Growth.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed"
              >
                Infinite Design is a modern web design and development agency creating high-performance websites, e-commerce platforms, and digital experiences that convert visitors into customers.
              </motion.p>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link href="/contact" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all box-glow flex items-center gap-2">
                  Start Your Project <ArrowRight size={20} />
                </Link>
                <Link href="/portfolio" className="px-8 py-4 glass text-white font-medium rounded-full hover:bg-white/10 transition-all border border-white/20">
                  View Portfolio
                </Link>
              </motion.div>
            </div>
          </section>

          {/* TRUST SECTION */}
          <section className="border-y border-white/10 bg-white/5 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center justify-center p-4">
                  <CheckCircle className="text-accent-green mb-3" size={32} />
                  <h3 className="text-3xl font-bold mb-1">9+</h3>
                  <p className="text-gray-400">Projects Delivered</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4">
                  <Globe className="text-accent-blue mb-3" size={32} />
                  <h3 className="text-2xl font-bold mb-1">International</h3>
                  <p className="text-gray-400">Multi-industry Experience</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4">
                  <Zap className="text-yellow-400 mb-3" size={32} />
                  <h3 className="text-2xl font-bold mb-1">High-Performance</h3>
                  <p className="text-gray-400">Modern Scalable Solutions</p>
                </div>
              </div>
            </div>
          </section>

          {/* SERVICES BENTO GRID */}
          <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Expertise</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Comprehensive digital solutions engineered for growth and aesthetic brilliance.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Code, title: "Business Websites", desc: "Fast, responsive sites built to convert.", color: "text-blue-400" },
                { icon: ShoppingBag, title: "E-commerce", desc: "Scalable stores that drive sales.", color: "text-green-400" },
                { icon: Layout, title: "UI/UX Design", desc: "Intuitive interfaces and seamless experiences.", color: "text-purple-400" },
                { icon: Palette, title: "Branding & Identity", desc: "Memorable visual systems and logos.", color: "text-pink-400" },
                { icon: Search, title: "SEO Optimization", desc: "Rank higher and attract organic traffic.", color: "text-yellow-400" },
                { icon: Smartphone, title: "Custom Web Apps", desc: "Complex solutions for unique problems.", color: "text-red-400" }
              ].map((service, i) => (
                <div key={i} className="glass p-8 rounded-2xl hover:-translate-y-2 hover:bg-white/10 transition-all duration-300 group cursor-pointer border border-white/5 hover:border-white/20">
                  <service.icon className={`${service.color} mb-6 group-hover:scale-110 transition-transform`} size={40} strokeWidth={1.5} />
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-400">{service.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FEATURED PROJECTS */}
          <section className="py-24 bg-white/5 border-y border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="text-4xl font-bold mb-4">Featured Work</h2>
                  <p className="text-gray-400">A glimpse into our recent successful deployments.</p>
                </div>
                <Link href="/portfolio" className="hidden sm:flex items-center gap-2 text-accent-blue hover:underline">
                  View All Projects <ArrowRight size={16} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: "Versells Lanka", url: "https://versellslanka.com", tag: "Corporate" },
                  { name: "Lanka Sunrays", url: "https://lankasunrays.lk", tag: "E-commerce" },
                  { name: "Shanthi Wedamadura", url: "https://shanthiwedamadura.com", tag: "Healthcare" }
                ].map((proj, i) => (
                  <div key={i} className="group relative rounded-2xl overflow-hidden aspect-[4/3] glass border border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
                    <div className="absolute inset-0 bg-gray-800 group-hover:scale-105 transition-transform duration-700">
                      {/* Placeholder for actual screenshot image */}
                      <div className="w-full h-full flex items-center justify-center text-gray-600">
                        <Layout size={48} opacity={0.5} />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                      <span className="text-xs font-bold text-accent-blue uppercase tracking-wider mb-2 block">{proj.tag}</span>
                      <h3 className="text-2xl font-bold text-white mb-1">{proj.name}</h3>
                      <p className="text-sm text-gray-300">{proj.url}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 sm:hidden">
                <Link href="/portfolio" className="flex items-center justify-center gap-2 text-accent-blue w-full glass py-3 rounded-full">
                  View All Projects <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>

          {/* PROCESS SECTION */}
          <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Process</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">A streamlined approach to transforming your vision into reality.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
              
              {[
                { step: "01", title: "Discover", desc: "Understanding your business goals and audience." },
                { step: "02", title: "Design", desc: "Crafting intuitive and stunning visual prototypes." },
                { step: "03", title: "Develop", desc: "Building robust, scalable, and secure solutions." },
                { step: "04", title: "Launch", desc: "Deploying and optimizing for peak performance." }
              ].map((process, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full glass border border-white/20 flex items-center justify-center text-2xl font-bold text-accent-blue mb-6 box-glow">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{process.title}</h3>
                  <p className="text-gray-400 text-sm">{process.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FINAL CTA */}
          <section className="py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-accent-blue/5 z-0"></div>
            <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Your business deserves more than just a website.</h2>
              <p className="text-xl text-gray-400 mb-10">Let's build something powerful together.</p>
              <Link href="/contact" className="inline-flex px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all box-glow items-center gap-2 text-lg">
                Start Your Project <ArrowRight size={24} />
              </Link>
            </div>
          </section>
        </motion.div>
      )}
    </>
  );
}
