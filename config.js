/* ==========================================
   Sanaullah ScaleFlow University
   Module: config.js
   Part: 1/4 (Global Configuration)
   Version: Enterprise 1.0
   Status: ⏳ Pending Review
========================================== */

(function(global) {
    "use strict";

    // ----------------------------------------
    // 1. UNIVERSITY & BRAND META
    // ----------------------------------------
    const UNIVERSITY = {
        name: "Sanaullah ScaleFlow University",
        shortName: "SSU",
        developer: "Sanaullah",
        supportEmail: "support@sanaullah-university.com",
        supportWhatsApp: "+92-XXX-XXXXXXX",
        timezone: "Asia/Karachi",
        country: "Pakistan",
        currency: "PKR",
        dateFormat: "DD/MM/YYYY",
        version: "Enterprise 1.0",
        release: "Q3 2026",
        engineStatus: "Active Development"
    };

    // ----------------------------------------
    // 2. APP ENVIRONMENT
    // ----------------------------------------
    // Options: development | testing | staging | production
    const APP_ENV = "development"; 

    // ----------------------------------------
    // 3. API CONFIGURATION (Google Apps Script)
    // ----------------------------------------
    // 🔴 IMPORTANT: Replace with actual Apps Script Web App URL after deployment
    const API_WEBAPP_URL = ""; // e.g., "https://script.google.com/macros/s/.../exec"
    
    const API_ENDPOINTS = {
        auth: {
            login: "/auth/login",
            register: "/auth/register",
            logout: "/auth/logout",
            verify: "/auth/verify"
        },
        user: {
            profile: "/user/profile",
            update: "/user/update",
            progress: "/user/progress"
        },
        courses: {
            list: "/courses",
            detail: "/courses/:id",
            enroll: "/courses/:id/enroll"
        },
        learning: {
            lessons: "/lessons",
            complete: "/lessons/:id/complete"
        },
        achievements: "/achievements",
        certificates: "/certificates",
        notifications: "/notifications"
    };

    // ----------------------------------------
    // 4. STORAGE KEYS
    // ----------------------------------------
    const STORAGE_KEYS = {
        theme: "sf_theme",
        user: "sf_user",
        token: "sf_token",
        language: "sf_lang",
        session: "sf_session"
    };

    // ----------------------------------------
    // 5. DEFAULTS (with Extended Language Support)
    // ----------------------------------------
    const DEFAULTS = {
        theme: "light",           // light | dark
        language: "en",           // en | ur | ar | hi
        perPage: 20,
        maxRetryAttempts: 3,
        toastDuration: 3000
    };

    // Supported Languages (Extended)
    const SUPPORTED_LANGUAGES = {
        en: "English",
        ur: "Urdu (اردو)",
        ar: "Arabic (العربية)",
        hi: "Hindi (हिन्दी)"
    };

    // ----------------------------------------
    // 6. EXPOSE TO GLOBAL (Enterprise Ready)
    // ----------------------------------------
    global.__CONFIG = {
        // Meta
        UNIVERSITY,
        
        // Core
        APP_ENV,
        API_WEBAPP_URL,
        API_ENDPOINTS,
        STORAGE_KEYS,
        DEFAULTS,
        SUPPORTED_LANGUAGES,

        // ---- Helper Methods ----
        
        // Returns the full API URL (Apps Script)
        getApiUrl: function(endpoint) {
            if (!this.API_WEBAPP_URL) {
                console.warn("⚠️ [config.js] API_WEBAPP_URL is not set. Please add your Apps Script URL.");
                return endpoint;
            }
            return this.API_WEBAPP_URL + endpoint;
        },

        // Check if environment matches
        isEnv: function(env) {
            return this.APP_ENV === env;
        },

        // Check if running in production
        isProduction: function() {
            return this.APP_ENV === "production";
        },

        // Get storage key safely
        getStorageKey: function(keyName) {
            return this.STORAGE_KEYS[keyName] || null;
        },

        // Get supported language name by code
        getLanguageName: function(code) {
            return this.SUPPORTED_LANGUAGES[code] || code;
        },

        // Log config status (useful for debugging)
        logStatus: function() {
            console.log(`🏛️  ${this.UNIVERSITY.name} v${this.UNIVERSITY.version}`);
            console.log(`   📍 Environment: ${this.APP_ENV}`);
            console.log(`   🌐 API Base: ${this.API_WEBAPP_URL || "Not Set (Waiting for Deployment)"}`);
            console.log(`   🗣️  Languages: ${Object.keys(this.SUPPORTED_LANGUAGES).join(", ")}`);
            console.log(`   📅 Release: ${this.UNIVERSITY.release}`);
        }
    };

    // Auto-log status on load (only in dev/test)
    if (APP_ENV !== "production") {
        global.__CONFIG.logStatus();
    }

    console.log(`✅ [config.js Part 1] Loaded Successfully (Enterprise Ready)`);

})(window);
