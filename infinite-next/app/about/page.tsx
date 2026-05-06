export const metadata = {
  title: "About Us | Infinite Design",
  description: "Learn more about our agency and mission.",
};

export default function About() {
  return (
    <div className="pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <h1 className="text-5xl font-bold mb-6">Who We <span className="text-accent-blue text-glow">Are</span></h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            <strong>Infinite Design</strong> solves complex business challenges with outcome-oriented creative services tailored to your needs. From web technology to brand identity and strategy, we offer everything you need to achieve your goals and stand out in the global market.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Founded with a passion for digital excellence, we have grown into a trusted partner for brands across multiple industries. We don't just build websites; we engineer digital growth engines.
          </p>
        </div>
        <div className="glass rounded-2xl p-8 border border-white/10 flex flex-col justify-center items-center text-center h-full min-h-[300px]">
           <div className="text-6xl font-bold text-accent-blue mb-4">12+</div>
           <div className="text-xl text-gray-300">Years of Collective Experience</div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Build Amazing Brands, On Demand</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold text-accent-blue mb-3">Execute Quickly</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Scale up your brand presence rapidly. We offer flexible engagements tailored to your exact timeline and requirements.</p>
          </div>
          <div className="glass p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold text-accent-blue mb-3">The Top 3%</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Every project is handled by top-tier creative talent with a rigorous, proven track record of design success.</p>
          </div>
          <div className="glass p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold text-accent-blue mb-3">Leading the Future</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Our team is ready for tomorrow's business challenges by embracing advanced and specialized design technologies.</p>
          </div>
          <div className="glass p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold text-accent-blue mb-3">A Level Above</h3>
            <p className="text-gray-400 text-sm leading-relaxed">We embody the highest levels of integrity, professionalism, and communication throughout the entire creative process.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
