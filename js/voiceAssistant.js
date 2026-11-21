/**
 * VoiceAssistant Module - Dr. Carlos Buelvas
 * Maneja Speech-to-Text (Reconocimiento de voz por micrófono) y Text-to-Speech (Lectura con voz humana profesional)
 * Utiliza Web Speech API nativa para compatibilidad total sin dependencias pesadas ni costes por token de audio.
 */

window.VoiceAssistant = (function() {
  // Estado interno
  let recognition = null;
  let isListening = false;
  let isSpeaking = false;
  let currentUtterance = null;
  let selectedVoice = null;

  // Inicializar Speech Recognition (STT)
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  const hasRecognitionSupport = Boolean(SpeechRecognition);
  const hasSynthesisSupport = 'speechSynthesis' in window;

  function initRecognition(callbacks = {}) {
    if (!hasRecognitionSupport) return null;

    try {
      const rec = new SpeechRecognition();
      rec.lang = 'es-CO'; // Español colombiano
      rec.continuous = false;
      rec.interimResults = true;
      rec.maxAlternatives = 1;

      rec.onstart = () => {
        isListening = true;
        if (callbacks.onStart) callbacks.onStart();
      };

      rec.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (callbacks.onResult) {
          callbacks.onResult(finalTranscript || interimTranscript, Boolean(finalTranscript));
        }
      };

      rec.onerror = (event) => {
        isListening = false;
        if (callbacks.onError) callbacks.onError(event.error);
      };

      rec.onend = () => {
        isListening = false;
        if (callbacks.onEnd) callbacks.onEnd();
      };

      return rec;
    } catch (e) {
      console.warn('SpeechRecognition initialization error:', e);
      return null;
    }
  }

  // Cargar y seleccionar la voz más cálida y profesional en español
  function selectBestSpanishVoice() {
    if (!hasSynthesisSupport) return;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;

    // Preferencia: es-CO (Colombia) -> es-US -> es-ES -> cualquier es-
    const preferred = voices.find(v => v.lang.includes('es-CO') && !v.name.includes('Google')) ||
                      voices.find(v => v.lang.includes('es-CO')) ||
                      voices.find(v => (v.lang.includes('es-US') || v.lang.includes('es-ES')) && (v.name.includes('Natural') || v.name.includes('Sabina') || v.name.includes('Helena') || v.name.includes('Pablo'))) ||
                      voices.find(v => v.lang.startsWith('es-')) ||
                      voices.find(v => v.lang.includes('es'));

    selectedVoice = preferred || voices[0];
  }

  if (hasSynthesisSupport) {
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = selectBestSpanishVoice;
    }
    selectBestSpanishVoice();
  }

  // API Pública
  return {
    isSupported: hasRecognitionSupport && hasSynthesisSupport,
    hasRecognition: hasRecognitionSupport,
    hasSynthesis: hasSynthesisSupport,

    // Iniciar escucha por micrófono
    startListening: function(callbacks) {
      if (!hasRecognitionSupport) {
        if (callbacks && callbacks.onError) callbacks.onError('not-supported');
        return false;
      }

      // Detener cualquier reproducción previa
      this.stopSpeaking();

      if (recognition) {
        try { recognition.abort(); } catch(e) {}
      }

      recognition = initRecognition(callbacks);
      if (!recognition) return false;

      try {
        recognition.start();
        return true;
      } catch (err) {
        console.warn('Recognition start error:', err);
        if (callbacks && callbacks.onError) callbacks.onError(err);
        return false;
      }
    },

    // Detener escucha
    stopListening: function() {
      if (recognition && isListening) {
        try {
          recognition.stop();
        } catch(e) {}
      }
      isListening = false;
    },

    // Reproducir respuesta por voz (TTS)
    speak: function(text, callbacks = {}) {
      if (!hasSynthesisSupport || !text) return false;

      // Cancelar audios previos
      window.speechSynthesis.cancel();

      // Limpiar texto de asteriscos o markdown para una locución fluida
      const cleanText = text
        .replace(/[*_#`~]/g, '')
        .replace(/https?:\/\/\S+/g, '')
        .replace(/\+57\s*300\s*704\s*5427/g, 'trescientos setecientos cuatro cincuenta y cuatro veintisiete')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'es-CO';
      utterance.rate = 1.0;  // Velocidad natural
      utterance.pitch = 1.0; // Tono cálido profesional

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onstart = () => {
        isSpeaking = true;
        if (callbacks.onStart) callbacks.onStart();
      };

      utterance.onend = () => {
        isSpeaking = false;
        if (callbacks.onEnd) callbacks.onEnd();
      };

      utterance.onerror = (e) => {
        isSpeaking = false;
        if (callbacks.onError) callbacks.onError(e);
      };

      currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
      return true;
    },

    // Detener lectura de voz
    stopSpeaking: function() {
      if (hasSynthesisSupport) {
        window.speechSynthesis.cancel();
      }
      isSpeaking = false;
    },

    isSpeakingNow: function() {
      return isSpeaking;
    },

    isListeningNow: function() {
      return isListening;
    }
  };
})();
