"use client";

import { useState } from "react";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">Let's <span className="text-accent-blue text-glow">Talk</span></h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Ready to start your next project? Fill out the form below or reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Contact Info */}
        <div className="glass p-8 rounded-2xl border border-white/10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-lg text-accent-blue"><MapPin size={24} /></div>
              <div>
                <h4 className="text-sm text-gray-400 mb-1">Address</h4>
                <p className="font-medium text-lg">No 37/1c Dammarathana Road,<br/>Dankatiya, Tangalle, Sri Lanka</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-lg text-accent-green"><Phone size={24} /></div>
              <div>
                <h4 className="text-sm text-gray-400 mb-1">WhatsApp / Phone</h4>
                <a href="https://wa.me/94789714912" className="font-medium text-lg hover:text-accent-green transition-colors">+94 78 971 4912</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-lg text-pink-400"><Mail size={24} /></div>
              <div>
                <h4 className="text-sm text-gray-400 mb-1">Email</h4>
                <a href="mailto:hello@infinitedesign.com" className="font-medium text-lg hover:text-pink-400 transition-colors">hello@infinitedesign.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass p-8 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
              <input 
                type="text" 
                id="name" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-background border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
              <input 
                type="email" 
                id="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-background border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Project Details</label>
              <textarea 
                id="message" 
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-background border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors resize-none"
                placeholder="Tell us about your goals..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === "submitting"}
              className="w-full py-4 bg-accent-blue text-background font-bold rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === "submitting" ? "Sending..." : "Send Message"} 
              <Send size={18} />
            </button>

            {status === "success" && (
              <p className="text-accent-green text-center text-sm font-medium">Message sent successfully! We will get back to you soon.</p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-center text-sm font-medium">Something went wrong. Please try again or contact us via WhatsApp.</p>
            )}
          </form>
        </div>

      </div>

      <FloatingWhatsApp phone="94789714912" />
    </div>
  );
}
