// ========================================
// FILE: ContactModal.jsx
// DESCRIPTION: A modal component for contacting via a form with email sending functionality.
// ========================================

import React, { useState } from "react";
import {
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
  Mail,
  User,
  MessageSquare,
} from "lucide-react";

import emailjs from "@emailjs/browser"; 

import { THEME } from "../config/theme";

const ContactModal = ({ isOpen, onClose, isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  // --- THEME MAPPING ---
  const themeMode = isDarkMode ? THEME.dark : THEME.light;

  const inputClasses = `w-full p-3 rounded-lg border outline-none transition-all ${
    themeMode.input
  } ${themeMode.inputBorder} ${themeMode.inputText} ${
    isDarkMode
      ? "focus:border-red-500 placeholder-slate-500"
      : "focus:border-red-400 placeholder-stone-400"
  }`;

  const labelClasses = `block text-xs font-bold uppercase tracking-wider mb-1 ${themeMode.textSub}`;

  const modalContainerClasses = `relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border ${themeMode.card} ${themeMode.border}`;

  const headerBorderClass = `p-6 border-b ${themeMode.border}`;
  const closeButtonClass = `cursor-pointer p-2 rounded-full transition-colors ${
    isDarkMode
      ? "hover:bg-slate-700 text-slate-400"
      : "hover:bg-stone-100 text-stone-500"
  }`;

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatus("success");
        setTimeout(() => {
          onClose();
          setStatus("idle");
          setFormData({ name: "", email: "", message: "" });
        }, 3000);
      })
      .catch((error) => {
        console.error("Failed:", error);
        setStatus("error");
      });
    
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className={modalContainerClasses}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={headerBorderClass}>
          <div className="flex justify-between items-center">
            <h2 className={`text-2xl font-bold ${themeMode.text}`}>
              Get in Touch
            </h2>
            <button onClick={onClose} className={closeButtonClass}>
              <X size={20} />
            </button>
          </div>
          <p className={`mt-1 text-sm ${themeMode.textSub}`}>
            If you would like to contact me please fill out the form below.
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          {status === "success" ? (
            <div className="py-12 flex flex-col items-center text-center animate-in fade-in">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${themeMode.text}`}>
                Message Sent!
              </h3>
              <p className={themeMode.textSub}>
                I'll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className={labelClasses}>
                  <User size={12} className="inline mr-1 mb-0.5" /> Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className={inputClasses}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={status === "sending"}
                />
              </div>

              {/* Email Field */}
              <div>
                <label className={labelClasses}>
                  <Mail size={12} className="inline mr-1 mb-0.5" /> Email
                  Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  className={inputClasses}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  disabled={status === "sending"}
                />
              </div>

              {/* Message Field */}
              <div>
                <label className={labelClasses}>
                  <MessageSquare size={12} className="inline mr-1 mb-0.5" />{" "}
                  Message
                </label>
                <textarea
                  required
                  rows="4"
                  placeholder="Your message here..."
                  className={`${inputClasses} resize-none`}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  disabled={status === "sending"}
                />
              </div>

              {/* Error Message */}
              {status === "error" && (
                <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 p-3 rounded">
                  <AlertCircle size={16} />
                  <span>Something went wrong. Please try again.</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "sending"}
                className={`cursor-pointer w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 text-white transition-all transform active:scale-95 ${
                  status === "sending"
                    ? "bg-gray-400 cursor-not-allowed"
                    : `${THEME.accent.bg} ${THEME.accent.bgHover}`
                }`}
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>Send Message</>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
