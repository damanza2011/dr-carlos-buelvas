/**
 * Calculador Interactivo de Sonrisa & Pre-Valoración Virtual 3D
 * Dr. Carlos Buelvas - Odontología Especializada & Estética Dental
 */

window.SmileQuiz = (function() {
  const WHATSAPP_PHONE = '573007045427';
  let currentStep = 1;
  const totalSteps = 3;

  const quizState = {
    goal: 'Diseno de Sonrisa Integral',
    goalLabel: 'Diseño de Sonrisa Completo',
    timeline: 'Inmediato (Este mes)',
    hasFiles: 'Tengo fotos en mi celular para enviar',
    recommendedTreatment: 'Lentes Cerámicos en Disilicato de Litio E-Max'
  };

  const RECOMMENDATION_MAP = {
    'color': {
      title: 'Blanqueamiento Dental Láser + Carillas Cerámicas',
      desc: 'Ideal para aclarar de 4 a 6 tonos y corregir coloraciones profundas sin sensibilidad.'
    },
    'alineacion': {
      title: 'Ortodoncia Invisible con Alineadores Transparentes',
      desc: 'Corrección estética milimétrica sin brackets metálicos, cómoda y 100% removible.'
    },
    'desgaste': {
      title: 'Lentes Cerámicos E-Max de Alta Densidad',
      desc: 'Recupera la longitud, volumen y juventud de los dientes con mínima preparación.'
    },
    'perdida': {
      title: 'Implantes Dentales Guiados por Computador 3D',
      desc: 'Reemplazo anatómico de titanio biocompatible con fuerza masticatoria idéntica al diente natural.'
    },
    'completo': {
      title: 'Diseño de Sonrisa Boutique Personalizado',
      desc: 'Planificación digital 3D integral según la proporción áurea y tu fisonomía facial.'
    }
  };

  function selectOption(step, key, label) {
    if (step === 1) {
      quizState.goal = key;
      quizState.goalLabel = label;
      const rec = RECOMMENDATION_MAP[key] || RECOMMENDATION_MAP['completo'];
      quizState.recommendedTreatment = rec.title;
    } else if (step === 2) {
      quizState.timeline = label;
    } else if (step === 3) {
      quizState.hasFiles = label;
    }

    // Actualizar estilos activos
    const container = document.getElementById(`quizStep${step}`);
    if (container) {
      container.querySelectorAll('.quiz-option-card').forEach(card => {
        card.classList.remove('border-dorado', 'bg-dorado/10', 'ring-2', 'ring-dorado');
        card.classList.add('border-slate-200');
      });
      const activeBtn = event.currentTarget;
      if (activeBtn) {
        activeBtn.classList.remove('border-slate-200');
        activeBtn.classList.add('border-dorado', 'bg-dorado/10', 'ring-2', 'ring-dorado');
      }
    }
  }

  function nextStep() {
    if (currentStep < totalSteps) {
      document.getElementById(`quizStep${currentStep}`).classList.add('hidden');
      currentStep++;
      document.getElementById(`quizStep${currentStep}`).classList.remove('hidden');
      updateProgress();
    } else {
      showResults();
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      document.getElementById(`quizStep${currentStep}`).classList.add('hidden');
      currentStep--;
      document.getElementById(`quizStep${currentStep}`).classList.remove('hidden');
      updateProgress();
    }
  }

  function updateProgress() {
    const bar = document.getElementById('quizProgressBar');
    const label = document.getElementById('quizStepIndicator');
    if (bar) bar.style.width = `${(currentStep / totalSteps) * 100}%`;
    if (label) label.textContent = `Paso ${currentStep} de ${totalSteps}`;
  }

  function showResults() {
    const stepsContainer = document.getElementById('quizStepsContainer');
    const resultContainer = document.getElementById('quizResultContainer');
    if (stepsContainer) stepsContainer.classList.add('hidden');
    if (resultContainer) {
      resultContainer.classList.remove('hidden');
      
      const recEl = document.getElementById('quizResultTreatment');
      const descEl = document.getElementById('quizResultDesc');
      const whatsappBtn = document.getElementById('quizWhatsAppResultBtn');

      const rec = RECOMMENDATION_MAP[quizState.goal] || RECOMMENDATION_MAP['completo'];
      if (recEl) recEl.textContent = rec.title;
      if (descEl) descEl.textContent = rec.desc;

      const message = `✨ *PRE-VALORACIÓN VIRTUAL — DR. CARLOS BUELVAS*\n\n` +
        `Hola Dr. Carlos Buelvas, completé el calculador interactivo de sonrisa en tu sitio web con el siguiente perfil:\n\n` +
        `• *Objetivo principal:* ${quizState.goalLabel}\n` +
        `• *Tratamiento sugerido:* ${rec.title}\n` +
        `• *Plazo deseado:* ${quizState.timeline}\n` +
        `• *Disponibilidad de fotos/radiografías:* ${quizState.hasFiles}\n\n` +
        `Quisiera agendar una cita de valoración personalizada y conocer los pasos a seguir.`;

      if (whatsappBtn) {
        whatsappBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
      }
    }
  }

  function restart() {
    currentStep = 1;
    const stepsContainer = document.getElementById('quizStepsContainer');
    const resultContainer = document.getElementById('quizResultContainer');
    if (stepsContainer) stepsContainer.classList.remove('hidden');
    if (resultContainer) resultContainer.classList.add('hidden');

    for (let i = 1; i <= totalSteps; i++) {
      const stepEl = document.getElementById(`quizStep${i}`);
      if (stepEl) {
        if (i === 1) stepEl.classList.remove('hidden');
        else stepEl.classList.add('hidden');
      }
    }
    updateProgress();
  }

  return {
    selectOption,
    nextStep,
    prevStep,
    restart
  };
})();
