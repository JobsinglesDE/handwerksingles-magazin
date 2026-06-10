'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  q: string;
  options: string[];
}

const questions: Question[] = [
  {
    q: 'Was ist dein Handwerksberuf?',
    options: ['Elektriker / Elektroniker', 'Dachdecker / Zimmermann', 'Tischler / Schreiner', 'KFZ-Mechatroniker / Maurer'],
  },
  {
    q: 'Dein ideales erstes Date?',
    options: ['Kaffee nach der Frühschicht', 'Spaziergang im Grünen', 'Gemeinsam etwas bauen', 'Überrasch mich!'],
  },
  {
    q: 'Was ist dir bei einem Partner am wichtigsten?',
    options: ['Verständnis für Montage & Schichtarbeit', 'Humor', 'Tiefe Gespräche', 'Treue & Stabilität'],
  },
];

const results: Record<string, { title: string; emoji: string; text: string }> = {
  'Elektriker / Elektroniker': {
    title: 'Der Techniker mit Herz',
    emoji: '⚡',
    text: 'Du sorgst täglich dafür, dass die Welt läuft — jetzt ist Zeit für jemanden, der dich nach der Schicht auffängt.',
  },
  'Dachdecker / Zimmermann': {
    title: 'Der Bauer mit Weitblick',
    emoji: '🏗️',
    text: 'Höhenluft und Frühschicht kennen dich — du brauchst jemanden, der deinen Rhythmus versteht.',
  },
  'Tischler / Schreiner': {
    title: 'Der Handwerker mit Gefühl',
    emoji: '🪚',
    text: 'Du formst Holz mit Präzision — und verdienst jemanden, der diese Welt mit dir teilt.',
  },
  'default': {
    title: 'Der Allrounder',
    emoji: '⭐',
    text: 'Du weißt, was du willst. Handwerker-Singles auf Handwerksingles.de verstehen deinen Alltag.',
  },
};

export function MatchQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (answer: string) => {
    const next = [...answers, answer];
    setAnswers(next);
    setStep(step + 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
  };

  const isComplete = step >= questions.length;
  const result = isComplete
    ? results[answers[0]] || results['default']
    : null;

  return (
    <div className="max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {/* Progress */}
            <div className="flex gap-1 mb-6">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i <= step ? 'bg-brand-orange' : 'bg-foreground/10'
                  }`}
                />
              ))}
            </div>

            <h3 className="text-xl font-bold mb-6">{questions[step].q}</h3>
            <div className="grid gap-3">
              {questions[step].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className="text-left px-5 py-4 rounded-xl border border-foreground/10 hover:border-brand-orange hover:bg-brand-orange/5 transition-all duration-200 font-medium"
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        ) : result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="text-5xl mb-4">{result.emoji}</div>
            <h3 className="text-2xl font-bold mb-2">{result.title}</h3>
            <p className="text-foreground/70 mb-6">{result.text}</p>
            <div className="flex gap-3 justify-center">
              <a
                href="https://handwerksingles.de/registration/?AID=HandwerksinglesMagazin"
                className="px-6 py-3 bg-[#429A45] text-white font-bold rounded-full hover:shadow-lg transition-all"
                rel="nofollow noopener"
              >
                Jetzt Match finden
              </a>
              <button
                onClick={reset}
                className="px-6 py-3 border border-foreground/20 rounded-full hover:bg-foreground/5 transition-all"
              >
                Nochmal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
