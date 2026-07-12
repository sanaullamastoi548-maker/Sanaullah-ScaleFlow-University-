/* ==========================================
   Sanaullah ScaleFlow University
   Module: app.js (Master Controller)
   Part: 1/4 (Application Bootstrap)
   Version: Enterprise 1.0
   Status: ⏳ Pending Review & Lock
========================================== */

(function(global) {
    "use strict";

    // ----------------------------------------
    // 0. DEVELOPER MODE (Toggle for testing)
    // ----------------------------------------
    const DEVELOPER_MODE = true; // 🔴 Set to 'false' in production

    // ----------------------------------------
    // 1. APP STATE (With Pre-structured Modules)
    // ----------------------------------------
    const APP_STATE = {
        isInitialized: false,
        isConfigLoaded: false,
        isDomReady: false,
        modules: {
            dashboard: false,
            learning: false,
            quiz: false,
            notification: false,
            certificate: false,
            ai: false,
            profile: false,
            settings: false,
            analytics: false,
            admin: false
        }
    };

    // ----------------------------------------
    // 2. CORE FUNCTIONS
    // ----------------------------------------

    // 2.1 Check if Config is loaded
    function loadConfiguration() {
        if (typeof global.__CONFIG !== 'undefined') {
            APP_STATE.isConfigLoaded = true;
            if (DEVELOPER_MODE) {
                console.log('✅ [app.js] Config Loaded Successfully');
            }
            return true;
        } else {
            console.error('❌ [app.js] Config NOT found! Please load config.js first.');
            return false;
        }
    }

    // 2.2 Check Browser Support (Enterprise Standard - No alert)
    function checkBrowserSupport() {
        const isModern = 'fetch' in global && 'Promise' in global && 'addEventListener' in global;
        if (!isModern) {
            showAppStatus('⚠️ Your browser is outdated. Please use a modern browser.', 'warning');
        }
        return isModern;
    }

    // 2.3 Register Global Events
    function registerGlobalEvents() {
        global.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                const searchInput = document.querySelector('.smart-search input');
                if (searchInput) searchInput.focus();
            }
        });

        global.addEventListener('resize', function() {
            // Placeholder for future responsive logic
        });

        if (DEVELOPER_MODE) {
            console.log('✅ [app.js] Global Events Registered');
        }
    }

    // 2.4 Show App Status (Using CSS Class instead of Inline Styles)
    function showAppStatus(message, type = 'success') {
        // Remove existing status box
        const oldBox = document.getElementById('app-status-box');
        if (oldBox) oldBox.remove();

        const box = document.createElement('div');
        box.id = 'app-status-box';
        
        // Use CSS class instead of inline styles
        box.className = `app-status-box ${type}`;
        box.textContent = message;
        
        document.body.appendChild(box);

        // Auto remove after 6 seconds in production, but keep for testing
        if (!DEVELOPER_MODE) {
            setTimeout(() => {
                if (box.parentNode) box.remove();
            }, 6000);
        }
    }

    // 2.5 Initialize Application
    function initializeApplication() {
        if (DEVELOPER_MODE) {
            console.log('🚀 [app.js] Initializing Application...');
        }

        if (!loadConfiguration()) {
            console.error('❌ [app.js] Bootstrap failed: Config missing.');
            return false;
        }

        checkBrowserSupport();
        registerGlobalEvents();

        APP_STATE.isInitialized = true;

        // ✅ FIX 1: Safe access with optional chaining and fallback
        const universityName = global.__CONFIG?.UNIVERSITY?.name || 'Sanaullah ScaleFlow University';
        
        if (DEVELOPER_MODE) {
            console.log(`✅ [app.js] Application Bootstrap Complete.`);
            console.log(`🏛️  Welcome to ${universityName}`);
        }

        showAppStatus('✅ App Started & Config Loaded', 'success');
        return true;
    }

    // 2.6 Test Function for Part 1 (Only runs in Developer Mode)
    function testAppPart1() {
        if (!DEVELOPER_MODE) {
            console.log('ℹ️ [app.js] Developer Mode is OFF. Skipping tests.');
            return;
        }

        console.log('🧪 [app.js] Running Part 1 Test...');
        const status = {
            'APP STARTED': APP_STATE.isInitialized,
            'CONFIG LOADED': APP_STATE.isConfigLoaded,
            'READY': APP_STATE.isInitialized && APP_STATE.isConfigLoaded
        };
        console.table(status);
        
        if (status.READY) {
            showAppStatus('✅ APP STARTED | CONFIG LOADED | READY', 'success');
        } else {
            showAppStatus('⚠️ Test Failed. Check Console.', 'warning');
        }
        return status;
    }

    // ----------------------------------------
    // 3. EXPOSE TO GLOBAL
    // ----------------------------------------
    global.__APP = {
        state: APP_STATE,
        init: initializeApplication,
        test: testAppPart1,
        loadConfig: loadConfiguration,
        registerEvents: registerGlobalEvents,
        showStatus: showAppStatus,
        setDeveloperMode: function(mode) {
            global.DEVELOPER_MODE = mode;
        }
    };

    // ----------------------------------------
    // 4. AUTO-START ON DOM READY (Conditional Test)
    // ----------------------------------------
    function bootApp() {
        APP_STATE.isDomReady = true;
        global.__APP.init();

        // ✅ FIX 5: Auto-test only in Developer Mode
        if (DEVELOPER_MODE) {
            setTimeout(function() {
                global.__APP.test();
            }, 500);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootApp);
    } else {
        bootApp();
    }

    // Expose mode externally
    global.__DEV_MODE = DEVELOPER_MODE;

    if (DEVELOPER_MODE) {
        console.log('📄 [app.js] Part 1/4 Loaded. Developer Mode: ON');
    }

})(window);
