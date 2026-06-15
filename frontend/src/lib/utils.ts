import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export function formatDate(date: string): string {
  if (date === 'Present') return 'Present';
  const [month, year] = date.split(' ');
  return `${month} ${year}`;
}

export function getRelativeTime(startDate: string, endDate: string): string {
  if (endDate === 'Present') {
    const start = new Date(startDate.replace(' ', ' 1, '));
    const now = new Date();
    const months = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
    if (months < 12) return `${months} mos`;
    const years = Math.floor(months / 12);
    const remaining = months % 12;
    return remaining > 0 ? `${years} yr ${remaining} mos` : `${years} yr`;
  }
  return '';
}

export function splitTextIntoChars(text: string): string[] {
  return text.split('');
}

export function splitTextIntoWords(text: string): string[] {
  return text.split(' ');
}

export function generateGradient(color1: string, color2: string): string {
  return `linear-gradient(135deg, ${color1}, ${color2})`;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function hexToRgba(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

export const easing = {
  easeInOutCubic: [0.645, 0.045, 0.355, 1.0] as [number, number, number, number],
  easeOutExpo: [0.16, 1, 0.3, 1] as [number, number, number, number],
  easeInOutQuart: [0.76, 0, 0.24, 1] as [number, number, number, number],
  spring: { type: 'spring' as const, stiffness: 100, damping: 20 },
  springBouncy: { type: 'spring' as const, stiffness: 260, damping: 20 },
};

export const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easing.easeOutExpo,
    },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
};
