
// Interface para los datos de las secciones
export interface SectionData {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  ctaText: string;
  ctaLink: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}
