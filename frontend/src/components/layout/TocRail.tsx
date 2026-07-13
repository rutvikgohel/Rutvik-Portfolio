import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'hero', num: '00', label: 'Intro' },
  { id: 'about', num: '01', label: 'Background' },
  { id: 'experience', num: '02', label: 'Experience' },
  { id: 'projects', num: '03', label: 'Projects' },
  { id: 'skills', num: '04', label: 'Toolkit' },
  { id: 'contact', num: '05', label: 'Contact' },
];

export function TocRail() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="toc-rail" aria-label="Section navigation">
      {SECTIONS.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => handleClick(section.id)}
            className={`toc-rail-item text-left ${isActive ? 'active' : ''}`}
          >
            <span className="num">{section.num}</span>
            <span className="tick"></span>
            <span className="label">{section.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
