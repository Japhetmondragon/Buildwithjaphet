import React from 'react';
import Container from '../UI/Container';

const Footer = () => {
  return (
    <footer className="bg-brand-black text-neutral-50 py-12 mt-auto">
      <Container>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-2xl uppercase mb-4">Let's Work</h3>
            <p className="text-neutral-400">
              Ready to build something amazing? Let's talk.
            </p>
          </div>
          
          <div>
            <h4 className="font-display uppercase mb-4">Connect</h4>
            <div className="space-y-2">
              <a href="https://github.com" className="block text-neutral-400 hover:text-brand-green transition-colors">
                GitHub
              </a>
              <a href="https://linkedin.com" className="block text-neutral-400 hover:text-brand-green transition-colors">
                LinkedIn
              </a>
              <a href="mailto:hello@example.com" className="block text-neutral-400 hover:text-brand-green transition-colors">
                Email
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-display uppercase mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="/projects" className="block text-neutral-400 hover:text-brand-green transition-colors">
                Projects
              </a>
              <a href="/about" className="block text-neutral-400 hover:text-brand-green transition-colors">
                About
              </a>
              <a href="/contact" className="block text-neutral-400 hover:text-brand-green transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-neutral-800 text-center text-neutral-400">
          <p>&copy; {new Date().getFullYear()} YourName. Built Different.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;