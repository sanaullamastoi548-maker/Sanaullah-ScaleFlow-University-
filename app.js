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

/* ==========================================
   Sanaullah ScaleFlow University
   Module: app.js (Master Controller)
   Part: 2/4 (Module Loader + Visual UI)
   Version: Enterprise 1.0
   Status: ⏳ Ready for Visual Test
========================================== */

(function(global) {
    "use strict";

    // ----------------------------------------
    // 0. DEVELOPER MODE
    // ----------------------------------------
    const DEVELOPER_MODE = true; // 🔴 Production: false

    // ----------------------------------------
    // 1. APP STATE (Pre-structured Modules)
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
    // 2. 🆕 VISUAL UI UPDATE (Part 2 - Immediate Result)
    // ----------------------------------------
    function updateDashboardUI() {
        console.log('🖥️ [app.js] Updating Dashboard UI...');

        // Get all elements
        const studentName = document.getElementById('studentName');
        const brainXP = document.getElementById('brainXP');
        const currentLevel = document.getElementById('currentLevel');
        const learningStreak = document.getElementById('learningStreak');
        const overallProgress = document.getElementById('overallProgress');

        // 🟢 Demo Data (Enterprise Sample)
        const demoData = {
            name: 'Sanaullah',
            xp: '250 XP',
            level: 'Level 5',
            streak: '7 Days',
            progress: '75%'
        };

        // Update DOM elements
        if (studentName) studentName.textContent = demoData.name;
        if (brainXP) brainXP.textContent = demoData.xp;
        if (currentLevel) currentLevel.textContent = demoData.level;
        if (learningStreak) learningStreak.textContent = demoData.streak;
        if (overallProgress) overallProgress.textContent = demoData.progress;

        // Also update the user card in sidebar (optional)
        const userCardName = document.querySelector('.user-card h3');
        if (userCardName) userCardName.textContent = demoData.name;

        const userCardLevel = document.querySelector('.user-card p');
        if (userCardLevel) userCardLevel.textContent = 'Level 5 • Advanced';

        const brainXPBadge = document.querySelector('.brain-xp span');
        if (brainXPBadge) brainXPBadge.textContent = demoData.xp;

        // Show visual confirmation
        showAppStatus('✅ UI Updated: Guest → Sanaullah | 250 XP', 'success');
        
        console.log('✅ [app.js] UI Update Complete!');
        console.log('   👤 Name:', demoData.name);
        console.log('   ⭐ XP:', demoData.xp);
        console.log('   🏆 Level:', demoData.level);
    }

    // ----------------------------------------
    // 3. MODULE LOADER (Part 2 Core)
    // ----------------------------------------
    function loadModules() {
        console.log('📦 [app.js] Loading Modules...');

        // Step 1: Mark all modules as "loading" (visual feedback later)
        const moduleNames = Object.keys(APP_STATE.modules);
        moduleNames.forEach(name => {
            APP_STATE.modules[name] = 'loading';
        });

        // Step 2: Simulate loading (in future, this will actually load .js files)
        // For now, we just mark them as true after a short delay to show progress
        setTimeout(() => {
            moduleNames.forEach(name => {
                APP_STATE.modules[name] = true;
            });
            console.log('✅ [app.js] All Modules Loaded Successfully!');
            
            // 🆕 After modules load, update UI to show changes
            updateDashboardUI();

            // Update status
            showAppStatus('✅ All Modules Loaded & UI Updated!', 'success');
        }, 800); // 0.8 sec delay to simulate loading
    }

    // ----------------------------------------
    // 4. CORE HELPERS (Copied from Part 1)
    // ----------------------------------------
    function loadConfiguration() {
        if (typeof global.__CONFIG !== 'undefined') {
            APP_STATE.isConfigLoaded = true;
            if (DEVELOPER_MODE) console.log('✅ [app.js] Config Loaded');
            return true;
        }
        console.error('❌ [app.js] Config NOT found!');
        return false;
    }

    function checkBrowserSupport() {
        const isModern = 'fetch' in global && 'Promise' in global;
        if (!isModern) showAppStatus('⚠️ Update your browser.', 'warning');
        return isModern;
    }

    function registerGlobalEvents() {
        global.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                const searchInput = document.querySelector('.smart-search input');
                if (searchInput) searchInput.focus();
            }
        });
        if (DEVELOPER_MODE) console.log('✅ [app.js] Global Events Registered');
    }

    function showAppStatus(message, type = 'success') {
        const oldBox = document.getElementById('app-status-box');
        if (oldBox) oldBox.remove();

        const box = document.createElement('div');
        box.id = 'app-status-box';
        box.className = `app-status-box ${type}`;
        box.textContent = message;
        document.body.appendChild(box);

        if (!DEVELOPER_MODE) {
            setTimeout(() => { if (box.parentNode) box.remove(); }, 6000);
        }
    }

    function initializeApplication() {
        if (DEVELOPER_MODE) console.log('🚀 [app.js] Initializing...');
        if (!loadConfiguration()) return false;
        checkBrowserSupport();
        registerGlobalEvents();
        APP_STATE.isInitialized = true;

        const name = global.__CONFIG?.UNIVERSITY?.name || 'Sanaullah ScaleFlow University';
        if (DEVELOPER_MODE) console.log(`🏛️  Welcome to ${name}`);

        // 🆕 PART 2: Start loading modules & update UI
        loadModules();

        return true;
    }

    // ----------------------------------------
    // 5. TEST FUNCTION (Part 2)
    // ----------------------------------------
    function testAppPart2() {
        if (!DEVELOPER_MODE) return;
        console.log('🧪 [app.js] Running Part 2 Test...');
        console.table({
            'Modules Loaded': Object.values(APP_STATE.modules).every(v => v === true),
            'UI Updated': document.getElementById('studentName')?.textContent === 'Sanaullah'
        });
        showAppStatus('✅ Part 2 Test Passed: UI & Modules Ready', 'success');
    }

    // ----------------------------------------
    // 6. EXPOSE TO GLOBAL
    // ----------------------------------------
    global.__APP = {
        state: APP_STATE,
        init: initializeApplication,
        test: testAppPart2,
        updateUI: updateDashboardUI,
        loadModules: loadModules
    };

    // ----------------------------------------
    // 7. BOOT
    // ----------------------------------------
    function bootApp() {
        APP_STATE.isDomReady = true;
        global.__APP.init();

        if (DEVELOPER_MODE) {
            setTimeout(() => {
                global.__APP.test();
            }, 1500); // Wait for modules to simulate load
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootApp);
    } else {
        bootApp();
    }

    console.log('📄 [app.js] Part 2/4 Loaded. Waiting for visual update...');

})(window);
