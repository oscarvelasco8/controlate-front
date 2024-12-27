import { SectionData } from '../interfaces/section-data.interface';
import { FaqItem } from '../interfaces/faq-item.interface';

export const SECTIONS: SectionData[] = [
  {
    id: 'insulina',
    title: 'Calcula tu dosis de insulina en segundos',
    description: 'Con nuestra herramienta, ajusta tus dosis de insulina de manera rápida y segura basándote en tus necesidades personales. Olvídate de los cálculos complicados y enfócate en lo que importa: tu bienestar.',
    benefits: [
      'Algoritmos avanzados y personalizados.',
      'Compatible con diferentes planes alimenticios.',
      'Fácil de usar en cualquier momento.'
    ],
    ctaText: 'Descubre cómo optimizar tu tratamiento',
    ctaLink: '/optimizar-tratamiento',
    imageSrc: 'home/mundial-salud.webp',
    imageAlt: 'Interfaz de cálculo de insulina en tiempo real'
  },
  {
    id: 'macronutrientes',
    title: 'Gestiona tus macronutrientes como un experto',
    description: 'Nuestra app no solo calcula insulina, también te ayuda a balancear proteínas, carbohidratos y grasas en tus comidas. Lleva un control detallado para mantener tus objetivos de salud.',
    benefits: [
      'Calculadora de macronutrientes integrada.',
      'Personalización según tus metas diarias.',
      'Informes claros y fáciles de entender.'
    ],
    ctaText: 'Empieza a diseñar tu plan alimenticio ahora',
    ctaLink: '/plan-alimenticio',
    imageSrc: 'home/corazon.webp',
    imageAlt: 'Usuario interactuando con gráficos de macronutrientes en una app',
    reverse: true
  }
];

export const faqData: FaqItem[] = [
  {
    header: '¿Cómo puedo registrar mis alimentos diarios?',
    content: 'Nuestra aplicación permite registrar cada comida fácilmente. Solo ingresa los alimentos que consumiste y su cantidad; automáticamente calcularemos las calorías, macronutrientes y su impacto en los niveles de insulina.'
  },
  {
    header: '¿Qué es el índice glucémico y cómo afecta mis niveles de insulina?',
    content: 'El índice glucémico (IG) mide cómo un alimento afecta el nivel de azúcar en sangre. Los alimentos con IG alto pueden causar picos rápidos en el azúcar, mientras que los de IG bajo tienen un efecto más gradual, ayudando a mantener el control de la insulina.'
  },
  {
    header: '¿Cómo puedo establecer objetivos de calorías y nutrientes?',
    content: 'Personaliza tus objetivos según tus necesidades: pérdida de peso, mantenimiento o ganancia muscular. También puedes configurar alertas para mantenerte dentro de tus límites diarios.'
  },
  {
    header: '¿Qué hacer si soy diabético y uso insulina?',
    content: 'Nuestra aplicación permite registrar dosis de insulina y relacionarlas con la ingesta de alimentos para un seguimiento más preciso.'
  },
  {
    header: '¿Se pueden agregar alimentos personalizados?',
    content: 'No, lamentablemente no tenemos implementada esa funcionalidad. Sin embargo, estamos trabajando en ello para mejorar la experiencia de nuestros usuarios.'
  }
];
