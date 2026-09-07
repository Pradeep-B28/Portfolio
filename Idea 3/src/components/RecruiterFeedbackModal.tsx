import React, { useState } from 'react';
import { X, MessageSquare, Send, CheckCircle2, Star } from 'lucide-react';

interface RecruiterFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecruiterFeedbackModal: React.FC<RecruiterFeedbackModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [companyName, setCompanyName] = useState('');
  const [rating, setRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md dirt-glass-gold rounded-2xl p-6 shadow-2xl border border-[#E8C468]/40 space-y-4">
        <div className="flex items-center justify-between border-b border-[#D9A86C]/20 pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#E8C468]" />
            <h3 className="text-lg font-editorial font-bold text-[#F2E8D5]">
              RECRUITER FEEDBACK LOOP
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#241408] text-[#A88A66] hover:text-[#F2E8D5]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#E8C468] mx-auto animate-bounce" />
            <h4 className="text-lg font-editorial font-bold text-[#F2E8D5]">
              FEEDBACK RECEIVED!
            </h4>
            <p className="text-xs text-[#A88A66] font-mono">
              Thank you for sharing your thoughts. Pradeep values continuous feedback!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-[#A88A66] font-sans">
              Are you reviewing Pradeep for a role at Google, Microsoft, Amazon, TCS, Zoho, or similar? Share your quick feedback or impressions!
            </p>

            <div className="space-y-1">
              <label className="text-xs font-mono text-[#F2E8D5]">Your Company / Organization</label>
              <input
                type="text"
                placeholder="e.g. Google, Microsoft, Amazon, TCS..."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-[#140A05] border border-[#D9A86C]/30 rounded-lg px-3 py-2 text-xs text-[#F2E8D5] placeholder-[#A88A66] focus:outline-none focus:border-[#E8C468]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-[#F2E8D5]">Overall Portfolio Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= rating
                          ? 'text-[#E8C468] fill-[#E8C468]'
                          : 'text-[#A88A66] border-none'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-[#F2E8D5]">Feedback & Candidate Impression</label>
              <textarea
                rows={3}
                placeholder="What impressed you? Any specific requirements you're looking for?"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="w-full bg-[#140A05] border border-[#D9A86C]/30 rounded-lg px-3 py-2 text-xs text-[#F2E8D5] placeholder-[#A88A66] focus:outline-none focus:border-[#E8C468]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#E8C468] text-[#140A05] font-mono text-xs font-bold hover:bg-[#F2E8D5] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span>SUBMIT FEEDBACK</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
