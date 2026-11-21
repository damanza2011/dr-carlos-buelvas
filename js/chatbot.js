/**
 * Chatbot Concierge Dental ("DrBot") - Dr. Carlos Buelvas
 * Odontología Especializada & Estética Dental
 * 
 * Soporta entrada y salida dual (VOZ + TEXTO):
 * - STT: Dictado por micrófono en tiempo real
 * - TTS: Lectura en voz alta de las respuestas médicas
 * - NLP por intents clínicos
 * - Handover directo con mensaje contextual a WhatsApp (+57 300 704 5427)
 */

window.DentalBot = (function() {
  const WHATSAPP_PHONE = '573007045427';
  let isOpen = false;
  let autoVoiceEnabled = true; // Lee automáticamente la respuesta en voz alta
  let conversationHistory = [];

  // Base de Conocimiento Clínico e Intents
  const INTENTS = [
    {
      name: 'lentes_ceramicos',
      keywords: ['lente', 'lentes', 'ceramica', 'cerámica', 'ceramicos', 'cerámicos', 'emax', 'e-max', 'disilicato', 'porcelana', 'diseño'],
      response: '✨ Los <strong>Lentes Cerámicos en Disilicato de Litio (E-Max)</strong> son el tratamiento insignia del Dr. Carlos Buelvas. Son láminas ultrafinas de 0.3 mm que <strong>no se manchan con café ni vino</strong>, tienen brillo natural permanente y vida útil de más de 15 años sin desgastar agresivamente tu diente natural.',
      ctaText: 'Cotizar Lentes Cerámicos en WhatsApp',
      ctaMessage: 'Hola Dr. Carlos Buelvas, el asistente virtual me explicó sobre los Lentes Cerámicos E-Max. Quisiera agendar una cita de valoración.'
    },
    {
      name: 'carillas_resina',
      keywords: ['resina', 'resinas', 'carilla', 'carillas', 'inmediato', 'rapido', 'rápido', 'una sesion', 'una sesión'],
      response: '💎 Las <strong>Carillas en Resina de Alta Densidad</strong> son ideales si buscas una transformación hermosa y en <strong>una sola sesión de 3 a 4 horas</strong>. Utilizamos técnica de estratificación biomimética capa por capa que no desgasta tu esmalte y es 100% reversible.',
      ctaText: 'Consultar Carillas en Resina',
      ctaMessage: 'Hola Dr. Carlos Buelvas, me interesa consultar disponibilidad para Carillas en Resina de Alta Densidad en una sola sesión.'
    },
    {
      name: 'implantes',
      keywords: ['implante', 'implantes', 'tornillo', 'titanio', 'perdi', 'perdida', 'falta', 'muela', 'diente perdido', 'hueso'],
      response: '🔩 En <strong>Implantes Dentales</strong>, el Dr. Carlos Buelvas utiliza <strong>cirugía guiada por computador 3D</strong> y titanio grado médico. Esto permite colocar el implante con precisión milimétrica sin cortes extensos ni dolor, devolviéndote la fuerza masticatoria y la estética original.',
      ctaText: 'Valoración para Implantes 3D',
      ctaMessage: 'Hola Dr. Carlos Buelvas, deseo consultar sobre el tratamiento de Implantes Dentales con Guía Digital 3D.'
    },
    {
      name: 'ortodoncia_invisible',
      keywords: ['alineador', 'alineadores', 'invisalign', 'ortodoncia', 'frenillos', 'brackets', 'invisibles', 'torcidos'],
      response: '🌿 Con la <strong>Ortodoncia Invisible con Alineadores Transparentes</strong> corriges la alineación de tus dientes sin brackets metálicos. Son placas transparentes, cómodas y removibles para comer y cepillarte con total libertad. Diseñamos tu sonrisa previamente en 3D.',
      ctaText: 'Simular Sonrisa con Alineadores',
      ctaMessage: 'Hola Dr. Carlos Buelvas, quisiera información y precios sobre Ortodoncia Invisible con Alineadores.'
    },
    {
      name: 'blanqueamiento',
      keywords: ['blanqueamiento', 'aclarar', 'blanco', 'manchas', 'manchados', 'amarillos', 'sensibilidad', 'laser', 'láser'],
      response: '⚡ Nuestro <strong>Blanqueamiento Dental Láser</strong> aclara de 4 a 6 tonos en una sola sesión de 45 minutos. Su fórmula bioactiva con nitrato de potasio protege tus encías y <strong>evita la sensibilidad dental</strong> para que sonrías de inmediato.',
      ctaText: 'Agendar Blanqueamiento Dental',
      ctaMessage: 'Hola Dr. Carlos Buelvas, deseo agendar una sesión de Blanqueamiento Dental Láser sin sensibilidad.'
    },
    {
      name: 'urgencia_dolor',
      keywords: ['dolor', 'duele', 'urgencia', 'emergencia', 'sangrado', 'roto', 'partio', 'partió', 'golpe', 'inflamado', 'infeccion', 'infección'],
      response: '🚨 <strong>¡Atención Prioritaria por Urgencia Dental!</strong> Si presentas dolor agudo, trauma dental o una pieza fracturada, podemos atenderte de forma prioritaria en nuestro consultorio del norte de Barranquilla.',
      ctaText: '🚨 Contactar Urgencia al WhatsApp Inmediato',
      ctaMessage: 'URGENCIA DENTAL: Hola Dr. Carlos Buelvas, presento dolor/emergencia dental y requiero atención prioritaria hoy.'
    },
    {
      name: 'precios_financiacion',
      keywords: ['precio', 'precios', 'costo', 'costos', 'cuanto', 'cuánto', 'vale', 'valen', 'cotizacion', 'cotización', 'financian', 'financiacion', 'financiación', 'pagos', 'tarjetas'],
      response: '💳 Ofrecemos <strong>planes de pago personalizados y escalonados</strong> por fases clínicas. Cada paciente recibe un plan de tratamiento detallado tras la valoración 3D. Aceptamos todas las tarjetas de crédito, transferencias y opciones de crédito odontológico.',
      ctaText: 'Solicitar Cotización Detallada',
      ctaMessage: 'Hola Dr. Carlos Buelvas, quisiera consultar sobre las opciones de financiación y costos para un tratamiento dental.'
    },
    {
      name: 'ubicacion_horario',
      keywords: ['donde', 'dónde', 'direccion', 'dirección', 'ubicacion', 'ubicación', 'horario', 'horarios', 'sede', 'consultorio', 'ciudad', 'barranquilla'],
      response: '📍 <strong>Ubicación:</strong> Cra. 51B # 82-254, Medical Center Altos de Riomar, Consultorio 402, Barranquilla, Colombia.<br>⏱️ <strong>Horarios:</strong> Lunes a Viernes de 8:00 AM a 6:30 PM | Sábados de 8:00 AM a 1:30 PM. Contamos con parqueadero privado vigilado.',
      ctaText: 'Ver Ubicación en Google Maps',
      ctaMessage: 'Hola Dr. Carlos Buelvas, quisiera confirmar la dirección exacta y agendar una cita para esta semana.'
    },
    {
      name: 'turismo_dental',
      keywords: ['viaje', 'viajo', 'extranjero', 'usa', 'miami', 'canada', 'canadá', 'europa', 'turismo', 'dias', 'días', 'vuelo'],
      response: '✈️ <strong>Programa de Turismo Dental Internacional:</strong> Atendemos pacientes de EE.UU., Canadá y Europa con cronogramas intensivos de 4 a 6 días hábiles. Iniciamos con pre-valoración virtual por WhatsApp para que viajes con tu plan y presupuesto definidos.',
      ctaText: 'Coordinar Turismo Dental Internacional',
      ctaMessage: 'Hola Dr. Carlos Buelvas, resido fuera de Colombia y deseo coordinar mi tratamiento de Turismo Dental en Barranquilla.'
    }
  ];

  // Respuesta por defecto con fallback inteligente
  const DEFAULT_RESPONSE = {
    text: 'Hola, un gusto saludarte. Soy el asistente clínico del <strong>Dr. Carlos Buelvas</strong>. Puedo orientarte sobre diseño de sonrisa en lentes cerámicos o resina, implantes guiados 3D, alineadores invisibles, blanqueamiento o agendar tu cita.',
    ctaText: 'Conversar con el Dr. Carlos Buelvas',
    ctaMessage: 'Hola Dr. Carlos Buelvas, te escribo desde tu asistente web para agendar una valoración personalizada.'
  };

  function findIntent(text) {
    const clean = (text || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    for (const intent of INTENTS) {
      for (const kw of intent.keywords) {
        const cleanKw = kw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (clean.includes(cleanKw)) {
          return intent;
        }
      }
    }
    return null;
  }

  // Renderizar Mensaje en el Chat
  function appendMessage(sender, text, action = null) {
    const container = document.getElementById('chatMessagesContainer');
    if (!container) return;

    const isUser = sender === 'user';
    const msgDiv = document.createElement('div');
    msgDiv.className = `flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`;

    const bubbleId = 'msg-' + Date.now() + Math.random().toString(36).substring(2, 7);

    if (isUser) {
      msgDiv.innerHTML = `
        <div class="max-w-[85%] bg-petroleo text-white px-4 py-3 rounded-2xl rounded-tr-sm text-xs sm:text-sm shadow-sm leading-relaxed">
          <p>${escapeHtml(text)}</p>
        </div>
      `;
    } else {
      let actionHtml = '';
      if (action) {
        const link = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(action.message)}`;
        actionHtml = `
          <div class="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <a href="${link}" target="_blank" rel="noopener noreferrer" 
               class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all transform hover:-translate-y-0.5">
              <span>📱 ${action.label}</span>
            </a>
            <button onclick="DentalBot.speakText('${bubbleId}')" 
                    class="p-1.5 rounded-full text-slate-500 hover:text-dorado hover:bg-slate-100 transition-colors"
                    title="Escuchar respuesta con voz">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zm-2.5 9.77H8.5V11h3V8.5L7.5 5 3 9.5H0v5h3l4.5 4.5 4-3.5V13zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
            </button>
          </div>
        `;
      } else {
        actionHtml = `
          <div class="mt-2 text-right">
            <button onclick="DentalBot.speakText('${bubbleId}')" 
                    class="p-1.5 rounded-full text-slate-400 hover:text-dorado transition-colors"
                    title="Escuchar respuesta con voz">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zm-2.5 9.77H8.5V11h3V8.5L7.5 5 3 9.5H0v5h3l4.5 4.5 4-3.5V13zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
            </button>
          </div>
        `;
      }

      msgDiv.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-petroleo/10 text-petroleo flex items-center justify-center shrink-0 font-bold text-xs mt-1">
          🩺
        </div>
        <div class="max-w-[85%] bg-white border border-slate-100 text-slate-800 px-4 py-3 rounded-2xl rounded-tl-sm text-xs sm:text-sm shadow-sm leading-relaxed" id="${bubbleId}">
          <div class="message-content">${text}</div>
          ${actionHtml}
        </div>
      `;
    }

    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;

    // Si el modo voz automático está activo y habla el bot, locutar
    if (!isUser && autoVoiceEnabled && window.VoiceAssistant) {
      window.VoiceAssistant.speak(text);
    }
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Procesar consulta del usuario
  function processUserInput(rawText) {
    const text = (rawText || '').trim();
    if (!text) return;

    appendMessage('user', text);

    // Typing feedback
    const container = document.getElementById('chatMessagesContainer');
    const typingIndicator = document.createElement('div');
    typingIndicator.id = 'typingIndicator';
    typingIndicator.className = 'flex items-center gap-2 text-xs text-slate-400 py-1 px-4 italic animate-pulse';
    typingIndicator.innerHTML = `<span>El Dr. Carlos Buelvas Concierge está formulando la respuesta...</span>`;
    container.appendChild(typingIndicator);
    container.scrollTop = container.scrollHeight;

    setTimeout(() => {
      typingIndicator.remove();
      const match = findIntent(text);

      if (match) {
        appendMessage('bot', match.response, {
          label: match.ctaText,
          message: match.ctaMessage
        });
      } else {
        appendMessage('bot', DEFAULT_RESPONSE.text, {
          label: DEFAULT_RESPONSE.ctaText,
          message: `Hola Dr. Carlos Buelvas, consulté en tu asistente web sobre: "${text}". Quisiera recibir más información personalizada.`
        });
      }
    }, 450);
  }

  // Iniciar reconocimiento de voz (STT) desde el botón de micrófono
  function toggleVoiceInput() {
    if (!window.VoiceAssistant) return;

    const micBtn = document.getElementById('chatMicBtn');
    const voiceStatus = document.getElementById('chatVoiceStatus');

    if (window.VoiceAssistant.isListeningNow()) {
      window.VoiceAssistant.stopListening();
      if (micBtn) micBtn.classList.remove('mic-active');
      if (voiceStatus) voiceStatus.classList.add('hidden');
      return;
    }

    if (voiceStatus) voiceStatus.classList.remove('hidden');
    if (micBtn) micBtn.classList.add('mic-active');

    window.VoiceAssistant.startListening({
      onStart: () => {
        if (micBtn) micBtn.classList.add('mic-active');
        if (voiceStatus) {
          voiceStatus.textContent = '🎙️ Escuchando... Habla ahora';
          voiceStatus.classList.remove('hidden');
        }
      },
      onResult: (transcript, isFinal) => {
        const input = document.getElementById('chatTextInput');
        if (input) input.value = transcript;

        if (isFinal) {
          if (micBtn) micBtn.classList.remove('mic-active');
          if (voiceStatus) voiceStatus.classList.add('hidden');
          processUserInput(transcript);
          if (input) input.value = '';
        }
      },
      onError: (err) => {
        if (micBtn) micBtn.classList.remove('mic-active');
        if (voiceStatus) {
          voiceStatus.textContent = 'No se detectó audio o permiso denegado';
          setTimeout(() => voiceStatus.classList.add('hidden'), 2500);
        }
      },
      onEnd: () => {
        if (micBtn) micBtn.classList.remove('mic-active');
        if (voiceStatus) voiceStatus.classList.add('hidden');
      }
    });
  }

  // Inicializar interfaz y oyentes
  function init() {
    const toggleBtn = document.getElementById('openChatbotBtn');
    const closeBtn = document.getElementById('closeChatbotBtn');
    const form = document.getElementById('chatbotInputForm');
    const micBtn = document.getElementById('chatMicBtn');
    const voiceToggleBtn = document.getElementById('chatAutoVoiceToggle');

    if (toggleBtn) toggleBtn.addEventListener('click', toggleChat);
    if (closeBtn) closeBtn.addEventListener('click', closeChat);

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('chatTextInput');
        if (input && input.value.trim()) {
          processUserInput(input.value);
          input.value = '';
        }
      });
    }

    if (micBtn) {
      micBtn.addEventListener('click', toggleVoiceInput);
    }

    if (voiceToggleBtn) {
      voiceToggleBtn.addEventListener('click', () => {
        autoVoiceEnabled = !autoVoiceEnabled;
        voiceToggleBtn.classList.toggle('text-dorado', autoVoiceEnabled);
        voiceToggleBtn.classList.toggle('text-slate-400', !autoVoiceEnabled);
        voiceToggleBtn.title = autoVoiceEnabled ? 'Lectura en voz alta: ACTIVA' : 'Lectura en voz alta: SILENCIADA';
        if (!autoVoiceEnabled && window.VoiceAssistant) {
          window.VoiceAssistant.stopSpeaking();
        }
      });
    }

    // Chips de sugerencia rápida
    document.querySelectorAll('.chat-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const query = btn.getAttribute('data-query');
        if (query) processUserInput(query);
      });
    });
  }

  function openChat(initialQuery = null) {
    const modal = document.getElementById('chatbotDrawer');
    if (modal) {
      modal.classList.remove('translate-x-full');
      isOpen = true;
      document.body.classList.add('overflow-hidden-mobile');
      if (initialQuery) {
        setTimeout(() => processUserInput(initialQuery), 300);
      }
    }
  }

  function closeChat() {
    const modal = document.getElementById('chatbotDrawer');
    if (modal) {
      modal.classList.add('translate-x-full');
      isOpen = false;
      document.body.classList.remove('overflow-hidden-mobile');
      if (window.VoiceAssistant) {
        window.VoiceAssistant.stopSpeaking();
        window.VoiceAssistant.stopListening();
      }
    }
  }

  function toggleChat() {
    if (isOpen) closeChat();
    else openChat();
  }

  function speakText(elementId) {
    const el = document.getElementById(elementId);
    if (!el || !window.VoiceAssistant) return;
    const content = el.querySelector('.message-content') || el;
    window.VoiceAssistant.speak(content.textContent || content.innerText);
  }

  return {
    init,
    open: openChat,
    close: closeChat,
    toggle: toggleChat,
    ask: processUserInput,
    toggleVoice: toggleVoiceInput,
    speakText
  };
})();
