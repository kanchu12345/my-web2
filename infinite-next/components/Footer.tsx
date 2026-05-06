import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold tracking-tighter text-glow">INFINITE</span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-6">
              We build premium, conversion-focused websites and digital experiences that drive real business growth for international clients.
            </p>
            <div className="flex space-x-4">
              {/* Social placeholders */}
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-accent-blue hover:border-accent-blue transition-all">In</a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-accent-blue hover:border-accent-blue transition-all">Tw</a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-accent-blue hover:border-accent-blue transition-all">Ig</a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/services" className="hover:text-accent-blue transition-colors">Web Development</Link></li>
              <li><Link href="/services" className="hover:text-accent-blue transition-colors">E-commerce</Link></li>
              <li><Link href="/services" className="hover:text-accent-blue transition-colors">UI/UX Design</Link></li>
              <li><Link href="/services" className="hover:text-accent-blue transition-colors">Branding</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-accent-blue transition-colors">About Us</Link></li>
              <li><Link href="/portfolio" className="hover:text-accent-blue transition-colors">Portfolio</Link></li>
              <li><Link href="/contact" className="hover:text-accent-blue transition-colors">Contact</Link></li>
              <li><a href="https://wa.me/94789714912" className="hover:text-accent-green transition-colors">WhatsApp</a></li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Infinite Design. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
