import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, ChevronRight, ArrowRight, CheckCircle2, MapPin, Mail, Send } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { id, value } = e.target;
  setFormData((prev) => ({ ...prev, [id]: value }));
}, []);
  const [scrolled, setScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    companyName: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network request
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '', companyName: '' });
      setTimeout(() => {
        setIsContactModalOpen(false);
        setFormStatus('idle');
      }, 2000);
    } catch (error) {
      setFormStatus('error');
    }
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network request
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '', companyName: '' });
      setTimeout(() => {
        setCurrentService(null);
        setFormStatus('idle');
      }, 2000);
    } catch (error) {
      setFormStatus('error');
    }
  };

  const services = [
    {
      title: "Data Annotation Services",
      description: "Video and graphical data labeling for machine learning and model preparation, both in-office and remotely.",
      formPrompt: "Leave your project details, guest access parameters, and receive sample data the next day"
    },
    {
      title: "Quality Assurance",
      description: "Thorough quality checks of completed annotations to ensure accuracy and consistency.",
      formPrompt: "Share your project requirements for enhanced data quality"
    },
    {
      title: "Technical Staff Replacement",
      description: "Temporary technical personnel coverage during vacations or sick leave.",
      formPrompt: "Tell us about your staffing needs"
    },
    {
      title: "IT Infrastructure Support",
      description: "Setup and maintenance of software, Internet access, email services, and network infrastructure.",
      formPrompt: "Describe your IT infrastructure needs"
    },
    {
      title: "On-site Technical Support",
      description: "Client visits for installation, troubleshooting, and updating your software.",
      formPrompt: "Tell us about your on-site support requirements"
    },
    {
      title: "Data Recovery",
      description: "Professional recovery of deleted or lost data.",
      formPrompt: "Share details about your data recovery needs"
    },
    {
      title: "Documentation Support",
      description: "Assistance with report preparation and spreadsheet configuration.",
      formPrompt: "Describe your documentation requirements"
    },
    {
      title: "Rapid Website Development",
      description: "Quick and efficient website creation services.",
      formPrompt: "Share your website project details"
    }
  ];

  const ServiceModal = ({ service }: { service: typeof services[0] }) => (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => setCurrentService(null)}
    >
      <div 
        className="bg-zinc-900 rounded-2xl max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-400">{service.formPrompt}</p>
            </div>
            <button 
              onClick={() => {
                setCurrentService(null);
                setFormStatus('idle');
                setFormData({ name: '', email: '', message: '', companyName: '' });
              }}
              className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

<form onSubmit={handleServiceSubmit} className="space-y-6">
  <div>
    <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-2">
      Company Name <span className="text-emerald-500">*</span>
    </label>
    <input
      type="text"
      id="companyName"
      required
      value={formData.companyName}
      onChange={handleInputChange}
      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors text-white placeholder-gray-400"
      placeholder="Your company name"
    />
  </div>

  <div>
    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
      Email <span className="text-emerald-500">*</span>
    </label>
    <input
      type="email"
      id="email"
      required
      value={formData.email}
      onChange={handleInputChange}
      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors text-white placeholder-gray-400"
      placeholder="your@email.com"
    />
  </div>

  <div>
    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
      Project Details <span className="text-emerald-500">*</span>
    </label>
    <textarea
      id="message"
      required
      value={formData.message}
      onChange={handleInputChange}
      rows={4}
      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors text-white placeholder-gray-400 resize-none"
      placeholder={service.formPrompt}
    />
  </div>

  <button
    type="submit"
    disabled={formStatus === 'sending'}
    className={`w-full py-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-200 ${
      formStatus === 'sending'
        ? 'bg-emerald-600 cursor-not-allowed'
        : formStatus === 'success'
        ? 'bg-emerald-500'
        : formStatus === 'error'
        ? 'bg-red-500'
        : 'bg-emerald-500 hover:bg-emerald-600'
    }`}
  >
    {formStatus === 'sending' ? (
      <>
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Sending...</span>
      </>
    ) : formStatus === 'success' ? (
      <>
        <CheckCircle2 className="w-5 h-5" />
        <span>Message Sent!</span>
      </>
    ) : formStatus === 'error' ? (
      <span>Error Sending Message</span>
    ) : (
      <>
        <Send className="w-5 h-5" />
        <span>Send Message</span>
      </>
    )}
  </button>
</form>

        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <span className="text-2xl font-bold">CallToLabels</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('benefits')} className="hover:text-gray-300 transition-colors">Clients Benefits</button>
              <a href="#" className="hover:text-gray-300 transition-colors">About</a>
              <button onClick={() => scrollToSection('services')} className="hover:text-gray-300 transition-colors">Services</button>
              <button 
                onClick={() => setIsContactModalOpen(true)} 
                className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                Contact
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button onClick={() => scrollToSection('benefits')} className="block w-full text-left px-3 py-2 hover:bg-gray-900 rounded-md">Clients Benefits</button>
              <a href="#" className="block px-3 py-2 hover:bg-gray-900 rounded-md">About</a>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left px-3 py-2 hover:bg-gray-900 rounded-md">Services</button>
              <button 
                onClick={() => {
                  setIsContactModalOpen(true);
                  setIsMenuOpen(false);
                }} 
                className="block w-full text-left px-3 py-2 hover:bg-gray-900 rounded-md"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          {/* Tel Aviv skyline background */}
          <img 
            src="https://images.unsplash.com/photo-1544971587-b842c27f8e14?auto=format&fit=crop&q=80"
            alt="Tel Aviv Skyline"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">Creating Digital Experiences</h1>
          <p className="text-xl md:text-2xl mb-6 text-gray-300">Professional IT Services in Tel Aviv and Southern Israel</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="group bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-200 transition-colors inline-flex items-center"
            >
              Contact
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center space-x-2 text-gray-300">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <span>Based in Bat-Yam, Israel</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80"
            alt="Airport Terminal"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Clients Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Cost Efficiency",
                description: "Pay only for the services you need, precisely when you need them.",
                image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80"
              },
              {
                title: "Focus on Core Tasks",
                description: "Let your high-paid engineers focus on core development tasks while we do all the rest of the data annotation work.",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
              },
              {
                title: "Remote Efficiency",
                description: "There is no need to rent additional office space or buy computer equipment and furniture. We will do this work remotely",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80"
              },
              {
                title: "On-demand Service",
                description: "No extra staff—delight your clients and elevate your reputation!",
                image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
              }
            ].map((benefit, index) => (
              <div 
                key={index} 
                className="group relative bg-zinc-900 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0">
                  <img 
                    src={benefit.image} 
                    alt={benefit.title}
                    className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                  />
                </div>
                <div className="relative z-10 p-8 h-full flex flex-col">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mb-4" />
                  <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-gray-400 flex-grow">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="p-8 border border-zinc-800 hover:border-white/20 transition-colors rounded-lg">
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <button 
                  onClick={() => setCurrentService(service)}
                  className="group flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Message Now
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-zinc-900 rounded-2xl p-8 md:p-12">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold mb-4">Our Location</h3>
                  <p className="text-gray-400 mb-2">We provide services in the Tel Aviv District and Southern Israel</p>
                  <p className="text-gray-400">Main office: Israel, Bat-Yam</p>
                  <div className="mt-4 flex items-center space-x-2 text-emerald-400">
                    <Mail className="w-5 h-5" />
                    <a href="mailto:hello@calltolabels.com" className="hover:text-emerald-300 transition-colors">
                      hello@calltolabels.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden h-[300px]">
              <img 
                src="https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80"
                alt="Tel Aviv Beach"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CallToLabels</h3>
              <p className="text-gray-400">Creating digital experiences that matter.</p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Navigation</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollToSection('benefits')} className="hover:text-white transition-colors">Clients Benefits</button></li>
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Services</button></li>
                <li><button onClick={() => setIsContactModalOpen(true)} className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Social</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <p className="text-gray-400">hello@calltolabels.com</p>
              <p className="text-gray-400">Israel, Bat-Yam</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-gray-400">
            <p>&copy; 2024 CallToLabels. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Service Modal */}
      {currentService && <ServiceModal service={currentService} />}

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsContactModalOpen(false);
            }
          }}
        >
          <div 
            className="bg-zinc-900 rounded-2xl max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Get in Touch</h3>
                  <p className="text-gray-400">We'll get back to you as soon as possible</p>
                </div>
                <button 
                  onClick={() => {
                    setIsContactModalOpen(false);
                    setFormStatus('idle');
                    setFormData({ name: '', email: '', message: '', companyName: '' });
                  }}
                  className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors text-white placeholder-gray-400"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email <span className="text-emerald-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors text-white placeholder-gray-400"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message <span className="text-emerald-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors text-white placeholder-gray-400 resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className={`w-full py-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-200 ${
                    formStatus === 'sending'
                      ? 'bg-emerald-600 cursor-not-allowed'
                      : formStatus === 'success'
                      ? 'bg-emerald-500'
                      : formStatus === 'error'
                      ? 'bg-red-500'
                      : 'bg-emerald-500 hover:bg-emerald-600'
                  }`}
                >
                  {formStatus === 'sending' ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : formStatus === 'success' ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Message Sent!</span>
                    </>
                  ) : formStatus === 'error' ? (
                    <span>Error Sending Message</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;