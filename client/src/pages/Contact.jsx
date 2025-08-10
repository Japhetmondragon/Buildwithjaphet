import React, { useState } from 'react';
import Container from '../components/UI/Container';
import Section from '../components/UI/Section';
import Heading from '../components/UI/Heading';
import Button from '../components/UI/Button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      // In production, send to API
      console.log('Form submitted:', formData);
      setSubmitted(true);
    } else {
      setErrors(newErrors);
    }
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear error on change
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };
  
  if (submitted) {
    return (
      <Section>
        <Container>
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="text-6xl mb-4">🚀</div>
            <Heading level="h2" className="mb-4">
              Message Sent!
            </Heading>
            <p className="text-xl text-neutral-600 mb-8">
              I'll get back to you within 24 hours. Usually faster.
            </p>
            <Button onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                email: '',
                company: '',
                budget: '',
                message: ''
              });
            }}>
              Send Another
            </Button>
          </div>
        </Container>
      </Section>
    );
  }
  
  return (
    <>
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <Heading level="h1" animate className="mb-4">
              Let's Make Money Together
            </Heading>
            
            <p className="text-xl text-neutral-600 mb-12">
              Got a project that needs to ship yesterday? 
              Fill this out. No agencies, no BS, just direct access.
            </p>
            
            <div className="grid md:grid-cols-2 gap-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-display uppercase text-sm mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 ${
                      errors.name ? 'border-red-500' : 'border-brand-black'
                    } focus:outline-none focus:border-brand-blue transition-colors`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block font-display uppercase text-sm mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 ${
                      errors.email ? 'border-red-500' : 'border-brand-black'
                    } focus:outline-none focus:border-brand-blue transition-colors`}
                    placeholder="john@company.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block font-display uppercase text-sm mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-brand-black focus:outline-none focus:border-brand-blue transition-colors"
                    placeholder="Awesome Inc."
                  />
                </div>
                
                <div>
                  <label className="block font-display uppercase text-sm mb-2">
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-brand-black focus:outline-none focus:border-brand-blue transition-colors"
                  >
                    <option value="">Select budget</option>
                    <option value="5-10k">$5k - $10k</option>
                    <option value="10-25k">$10k - $25k</option>
                    <option value="25-50k">$25k - $50k</option>
                    <option value="50k+">$50k+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block font-display uppercase text-sm mb-2">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full px-4 py-3 border-2 ${
                      errors.message ? 'border-red-500' : 'border-brand-black'
                    } focus:outline-none focus:border-brand-red transition-colors resize-none`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>
                
                <Button type="submit" size="lg" fullWidth>
                  Send Message
                </Button>
              </form>
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-xl uppercase mb-4">
                    Direct Line
                  </h3>
                  <a 
                    href="mailto:hello@yourdomain.com" 
                    className="text-lg text-brand-blue hover:underline"
                  >
                    Japhet@optibizboost.com
                  </a>
                </div>
                
                <div>
                  <h3 className="font-display text-xl uppercase mb-4">
                    Response Time
                  </h3>
                  <p className="text-neutral-600">
                    Usually within 2-4 hours during business days. 
                    24 hours max.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-display text-xl uppercase mb-4">
                    What Happens Next?
                  </h3>
                  <ol className="space-y-2 text-neutral-600">
                    <li>1. I'll review your project details</li>
                    <li>2. Quick 15-min call to discuss scope</li>
                    <li>3. Proposal with timeline & pricing</li>
                    <li>4. We start shipping</li>
                  </ol>
                </div>
                
                <div className="p-6 bg-neutral-100 border-l-4 border-brand-amber">
                  <p className="font-semibold mb-2">Prefer to talk now?</p>
                  <p className="text-neutral-600">
                    Book a call: 
                    <a 
                      href="https://optibizboost.com/book" 
                      className="text-brand-blue hover:underline ml-1"
                    >
                      optibizboost.com/build-with-japhet
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default Contact;