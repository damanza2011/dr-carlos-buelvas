/**
 * Módulo Centralizado de Datos Institucionales - Dr. Carlos Buelvas
 * Odontología Especializada & Estética Dental
 * 
 * Centraliza toda la información editable del negocio para facilitar actualizaciones
 * sin tocar la estructura de componentes ni la UI.
 */

window.CLINIC_DATA = {
  // Identidad y Marca
  brand: {
    doctorName: 'Dr. Carlos Buelvas',
    tagline: 'Odontología Especializada & Estética Dental',
    specialty: 'Rehabilitación Oral, Diseño de Sonrisa & Estética de Alta Precisión',
    registrationNumber: 'Reg. Profesional MinSalud Colombia: 08-9421',
    bio: 'Especialista en Rehabilitación Oral y Estética Dental con más de 15 años de trayectoria transformando sonrisas en el Caribe colombiano. Pionero en odontología digital 3D mínimamente invasiva, biomateriales cerámicos de última generación y armonización de la sonrisa guiada por la anatomía facial única de cada paciente.',
    stats: [
      { value: '+15', label: 'Años de Experiencia', sub: 'Trayectoria Clínica' },
      { value: '+3.800', label: 'Sonrisas Diseñadas', sub: 'Satisfacción 99.4%' },
      { value: '100%', label: 'Tecnología Digital 3D', sub: 'Sin Dolor ni Moldes' },
      { value: 'VIP', label: 'Atención Boutique', sub: '1 Paciente por Turno' },
    ]
  },

  // Contacto Oficial
  contact: {
    whatsappNumber: '+57 300 704 5427',
    whatsappRaw: '573007045427',
    phoneFormatted: '+57 (300) 704 5427',
    email: 'contacto@drcarlosbuelvas.com',
    emergencyDirect: '+57 300 704 5427',
  },

  // Redes Sociales Oficiales con switches enabled: boolean
  socials: {
    instagram: {
      enabled: true,
      handle: '@dr.carlosbuelvas',
      url: 'https://www.instagram.com/dr.carlosbuelvas/',
      label: 'Instagram Oficial',
      badge: 'Ver Casos Reales'
    },
    facebook: {
      enabled: true,
      handle: 'Dr. Carlos Buelvas Odontología',
      url: 'https://facebook.com/dr.carlosbuelvas',
      label: 'Facebook Oficial'
    },
    tiktok: {
      enabled: true,
      handle: '@drcarlosbuelvas',
      url: 'https://tiktok.com/@drcarlosbuelvas',
      label: 'TikTok Odontología & Consejos'
    },
    youtube: {
      enabled: false, // Flag modular listo para activación
      handle: 'Dr. Carlos Buelvas TV',
      url: 'https://youtube.com/@drcarlosbuelvas',
      label: 'YouTube Canal Clínico'
    },
    googleMaps: {
      enabled: true,
      url: 'https://maps.google.com/?q=Dr+Carlos+Buelvas+Odontologia+Barranquilla',
      label: 'Google Maps / Reseñas 5 Estrellas',
      rating: '4.9 ★★★★★ (184 reseñas)'
    }
  },

  // Ubicación y Horarios (Colombia)
  location: {
    city: 'Barranquilla',
    department: 'Atlántico',
    country: 'Colombia',
    address: 'Cra. 51B # 82-254, Medical Center Altos de Riomar / Consultorio 402',
    zone: 'Norte / Altos de Riomar',
    schedule: {
      weekdays: 'Lunes a Viernes: 8:00 AM – 6:30 PM',
      saturday: 'Sábados: 8:00 AM – 1:30 PM',
      sunday: 'Domingos y Festivos: Urgencias VIP con cita previa'
    },
    parking: 'Parqueadero privado con vigilancia dentro del edificio médico',
    internationalPatients: {
      enabled: true,
      label: 'Turismo Dental Internacional',
      description: 'Atención prioritaria y paquetes especiales para pacientes de Estados Unidos, Canadá, Europa y Centroamérica con cronograma intensivo en 4 a 6 días hábiles.'
    }
  },

  // Catálogo de Tratamientos Clínicos Especializados
  treatments: [
    {
      id: 'lentes-ceramicos',
      name: 'Diseño de Sonrisa en Lentes Cerámicos',
      shortName: 'Lentes Cerámicos',
      subtitle: 'Disilicato de Litio E-Max & Feldespática de Alta Densidad',
      description: 'Láminas cerámicas ultrafinas (0.2 a 0.3 mm) adheridas con precisión microscópica a la superficie dental. No cambian de color con café ni vino, brillo natural permanente y mínima preparación del esmalte.',
      benefits: [
        'Brillo vítreo natural y translucidez idéntica al esmalte joven',
        'Cero manchas por pigmentos alimentarios a lo largo de los años',
        'Biocompatibilidad absoluta y alta resistencia mecánica (+400 MPa)',
        'Garantía clínica certificada por escrito'
      ],
      idealFor: 'Dientes manchados, desgastados, diastemas (separaciones) o desalineaciones leves.',
      duration: '2 a 3 citas clínicas',
      badge: 'Tratamiento Estrella',
      estimatedPrice: 'Desde $1.200.000 COP por pieza dental',
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80',
      whatsappMessage: 'Hola Dr. Carlos Buelvas, deseo agendar una valoración personalizada para Diseño de Sonrisa en Lentes Cerámicos.'
    },
    {
      id: 'carillas-resina',
      name: 'Carillas en Resina de Alta Densidad',
      shortName: 'Carillas en Resina',
      subtitle: 'Estratificación Biomimética Mínimamente Invasiva',
      description: 'Reconstrucción anatómica directa en nano-híbridos cerámicos que reproduce lóbulos de desarrollo, microtexturas y degradado de luz. Procedimiento realizado en una sola sesión sin desgastar tus dientes naturales.',
      benefits: [
        'Sonrisa transformada en una sola sesión de 3 a 4 horas',
        '100% reversible y sin desgaste de estructura dental sana',
        'Mantenimiento y pulido semestral ultra sencillo',
        'Excelente relación costo-beneficio de alta gama'
      ],
      idealFor: 'Pacientes jóvenes o quienes buscan una transformación inmediata y no invasiva.',
      duration: '1 sola sesión (3-4 horas)',
      badge: 'En 1 Sola Sesión',
      estimatedPrice: 'Desde $450.000 COP por pieza dental',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80',
      whatsappMessage: 'Hola Dr. Carlos Buelvas, me interesa consultar sobre el Diseño de Sonrisa con Carillas en Resina de Alta Densidad.'
    },
    {
      id: 'implantes-guiados',
      name: 'Implantes Dentales Guiados por Computador',
      shortName: 'Implantes 3D',
      subtitle: 'Titanio Grado Médico & Cirugía Digital Guiada',
      description: 'Reemplazo de dientes perdidos mediante raíces de titanio biocompatibles colocadas con tomografía computarizada 3D y férulas quirúrgicas guiadas sin incisiones amplias ni puntos traumáticos.',
      benefits: [
        'Cirugía digital milimétrica: sin colgajos amplios ni inflamación severa',
        'Osteointegración acelerada con superficie bioactiva',
        'Recupera la masticación con fuerza y estabilidad idéntica al diente natural',
        'Prevención de pérdida ósea facial y envejecimiento prematuro'
      ],
      idealFor: 'Pérdida de una o varias piezas dentales por traumatismo, caries o enfermedad periodontal.',
      duration: 'Valoración 3D + Colocación en 45 min por implante',
      badge: 'Tecnología 3D Guiada',
      estimatedPrice: 'Valoración tomográfica personalizada',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80',
      whatsappMessage: 'Hola Dr. Carlos Buelvas, deseo consultar sobre Implantes Dentales de Titanio con Guía Digital 3D.'
    },
    {
      id: 'ortodoncia-invisible',
      name: 'Ortodoncia Invisible con Alineadores Transparentes',
      shortName: 'Alineadores Invisibles',
      subtitle: 'Planificación Digital 3D sin Brackets Metálicos',
      description: 'Alineación dental progresiva mediante placas transparentes termoplásticas removibles y personalizadas. Nadie notará que los llevas puestos y podrás retirarlos para comer y cepillarte con total comodidad.',
      benefits: [
        '100% transparente y prácticamente imperceptible a la vista',
        'Removible para comer tus alimentos favoritos sin restricciones',
        'Cero llagas, aftas o emergencias por alambres desprendidos',
        'Simulación 3D antes de comenzar: conoce tu sonrisa final en pantalla'
      ],
      idealFor: 'Adultos y profesionales que buscan corregir apiñamiento o mordida sin estética metálica.',
      duration: 'Planes desde 6 hasta 18 meses según complejidad',
      badge: 'Sin Brackets',
      estimatedPrice: 'Planes de financiación mensual a tu medida',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80',
      whatsappMessage: 'Hola Dr. Carlos Buelvas, quisiera información sobre los Alineadores Invisibles sin Brackets.'
    },
    {
      id: 'blanqueamiento-laser',
      name: 'Blanqueamiento Dental Láser sin Sensibilidad',
      shortName: 'Blanqueamiento Láser',
      subtitle: 'Activación Foto-Térmica con Desensibilizante Bioactivo',
      description: 'Aclaramiento dental profundo en consultorio de hasta 4 a 6 tonos en solo 45 minutos. Fórmula con nitrato de potasio y flúor de última generación que bloquea los túbulos dentinarios y previene la sensibilidad.',
      benefits: [
        'Aclara entre 4 y 6 tonos de forma segura y uniforme',
        'Tecnología desensibilizante: disfruta café o agua fría sin molestias',
        'Protección total de encías con barrera fotopolimerizable',
        'Resultados inmediatos al salir del consultorio'
      ],
      idealFor: 'Dientes oscurecidos por té, café, tabaco o el paso natural del tiempo.',
      duration: '1 sesión de 45 minutos',
      badge: 'Cero Sensibilidad',
      estimatedPrice: '$450.000 – $650.000 COP según técnica combinada',
      image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=900&q=80',
      whatsappMessage: 'Hola Dr. Carlos Buelvas, deseo consultar la disponibilidad para un Blanqueamiento Dental Láser sin sensibilidad.'
    },
    {
      id: 'rehabilitacion-oral',
      name: 'Rehabilitación Oral Integral & Alta Complejidad',
      shortName: 'Rehabilitación Oral',
      subtitle: 'Recuperación Oclusal, Funcional y Estética',
      description: 'Tratamiento integral para pacientes con desgaste severo por bruxismo, mordidas colapsadas o pérdida múltiple de dientes. Combina coronas de zirconio, incrustaciones cerámicas e implantes para devolver la dimensión vertical y la juventud del rostro.',
      benefits: [
        'Rejuvenecimiento del tercio inferior facial y soporte labial',
        'Eliminación del dolor articular (ATM), muscular y de cuello',
        'Oclusión balanceada y masticación placentera',
        'Reconstrucción total con biomateriales de duración vitalicia'
      ],
      idealFor: 'Bruxismo avanzado, piezas erosionadas o rehabilitación dental completa.',
      duration: 'Plan por fases clínicas con provisionales estéticos inmediatos',
      badge: 'Alta Complejidad',
      estimatedPrice: 'Diagnóstico integral con tomografía y escaneo intraoral',
      image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=900&q=80',
      whatsappMessage: 'Hola Dr. Carlos Buelvas, quisiera agendar una consulta de valoración para Rehabilitación Oral Integral.'
    }
  ],

  // Preguntas Frecuentes Médicas
  faqs: [
    {
      question: '¿El Diseño de Sonrisa en Lentes Cerámicos desgasta mis dientes naturales?',
      answer: 'No realizamos desgastes agresivos ni mutilaciones. En la odontología estética moderna del Dr. Carlos Buelvas aplicamos micro-preparaciones de 0.2 a 0.3 mm (el grosor de un lente de contacto) o en muchos casos técnica aditiva ("No-Prep"), preservando el 95%+ de tu esmalte dental intacto.'
    },
    {
      question: '¿Cuánto tiempo dura un diseño de sonrisa en lentes cerámicos?',
      answer: 'Los lentes de disilicato de litio y feldespato tienen una vida útil clínicamente comprobada de 15 a 20+ años con adecuada higiene y controles anuales de pulido. Al no ser porosos, conservan su brillo y color original de por vida.'
    },
    {
      question: '¿Qué facilidades de pago o financiación ofrecen en Barranquilla?',
      answer: 'Contamos con planes de pago escalonados por fases clínicas, recepción de todas las tarjetas de crédito, transferencias bancarias, alianzas de crédito odontológico local y tarifas especiales para pacientes de turismo dental internacional.'
    },
    {
      question: '¿Cómo funciona la Pre-Valoración Virtual si vivo fuera de Barranquilla?',
      answer: 'Puedes enviar fotos de tu sonrisa o radiografías panorámicas por nuestro WhatsApp oficial (+57 300 704 5427) o usar el asistente interactivo de esta web. El Dr. Carlos Buelvas elabora una propuesta preliminar con tiempos estimados y presupuesto antes de que viajes a la ciudad.'
    },
    {
      question: '¿Los implantes dentales duelen durante o después del procedimiento?',
      answer: 'El procedimiento es completamente indoloro. Aplicamos anestesia local de precisión computarizada y colocación guiada 3D por micro-incisión. La mayoría de los pacientes reportan menor molestia que una extracción común y regresan a sus actividades en 24 horas.'
    }
  ]
};

// Helper global para generar enlaces de WhatsApp con codificación segura
window.createWhatsAppLink = function(customText) {
  const phone = window.CLINIC_DATA.contact.whatsappRaw;
  const text = customText || 'Hola Dr. Carlos Buelvas, deseo consultar sobre una valoración odontológica.';
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
};
