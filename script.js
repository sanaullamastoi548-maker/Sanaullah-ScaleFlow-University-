/*==========================================
  Sanaullah ScaleFlow University
  Module : Main Gateway
  Version : Enterprise 1.0
  Status : ✅ Ready for Lock
==========================================*/

(function(global) {
    "use strict";

    // ==========================================
    // 1. DEBUG MODE (Issue 5 حل)
    // ==========================================
    const DEBUG = global.__CONFIG?.DEBUG !== undefined 
        ? global.__CONFIG.DEBUG 
        : true; // Default to true for development

    function log() {
        if (DEBUG) {
            console.log.apply(console, arguments);
        }
    }

    // ==========================================
    // 2. NAMESPACE (Issue 6 حل)
    // ==========================================
    const ScaleFlow = global.ScaleFlow || {};

    // ==========================================
    // 3. DOM ELEMENTS (Safe access)
    // ==========================================
    const DOM = {
        body: document.body,
        appContainer: document.querySelector("#app, .app-container"),
        sidebar: document.querySelector(".sidebar"),
        mainContent: document.querySelector(".main-content"),
        rightPanel: document.querySelector(".right-panel"),
        hero: document.querySelector(".learning-home-hero"),
        searchInput: document.querySelector("#globalSearch, .smart-search input"),
        gatewayCards: document.querySelectorAll(".gateway-card"),
        heroButtons: document.querySelectorAll(".hero-buttons button"),
        sidebarLinks: document.querySelectorAll(".sidebar-menu a"),
        quickButtons: document.querySelectorAll(".quick-actions button"),
        scrollBtn: document.getElementById("scrollTopBtn"),
        yearEl: document.getElementById("currentYear"),
        loader: document.getElementById("loader"),
        configTest: document.getElementById("configTest"),
        toastContainer: document.getElementById("toast-container")
    };

    // ==========================================
    // 4. STATE
    // ==========================================
    const state = {
        currentGateway: null,
        searchKeyword: "",
        animationSpeed: 350,
        isInitialized: false
    };

    // ==========================================
    // 5. PARTICLES (Issue 3 حل - Combined)
    // ==========================================
    function initParticles() {
        if (typeof particlesJS === "undefined") {
            log("⚠️ particlesJS not loaded");
            return;
        }
        particlesJS("particles-js", {
            particles: {
                number: { value: 60 },
                color: { value: "#FFC107" },
                shape: { type: "circle" },
                opacity: { value: 0.3 },
                size: { value: 3 },
                move: { enable: true, speed: 2 }
            }
        });
        log("✨ Particles initialized");
    }

    // ==========================================
    // 6. TOAST (Issue 4 حل - No inline CSS)
    // ==========================================
    function showToast(message, type = "info") {
        const container = DOM.toastContainer;
        if (!container) {
            // Fallback if container doesn't exist
            const toast = document.createElement("div");
            toast.className = `toast toast-${type}`;
            toast.textContent = message;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
            return;
        }

        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ==========================================
    // 7. SMART SEARCH
    // ==========================================
    function initSearch() {
        if (!DOM.searchInput) return;
        
        DOM.searchInput.addEventListener("input", function() {
            state.searchKeyword = this.value.toLowerCase().trim();
            
            DOM.gatewayCards.forEach(card => {
                const title = card.querySelector("h3")?.textContent?.toLowerCase() || "";
                const text = card.querySelector("p")?.textContent?.toLowerCase() || "";
                const match = title.includes(state.searchKeyword) || text.includes(state.searchKeyword);
                card.style.display = match ? "block" : "none";
            });
        });
        
        log("🔍 Search initialized");
    }

    // ==========================================
    // 8. GATEWAY CARDS
    // ==========================================
    function initGatewayCards() {
        DOM.gatewayCards.forEach(card => {
            card.addEventListener("click", function() {
                const title = this.querySelector("h3")?.textContent || "Unknown";
                state.currentGateway = title;
                log("Gateway clicked:", title);
                
                this.style.transform = "scale(0.98)";
                setTimeout(() => {
                    this.style.transform = "";
                }, 150);
            });
        });
        log("🏷️ Gateway cards initialized");
    }

    // ==========================================
    // 9. HERO BUTTONS
    // ==========================================
    function initHeroButtons() {
        DOM.heroButtons.forEach(button => {
            button.addEventListener("click", function() {
                log("Hero button clicked:", this.textContent?.trim());
                
                // Handle Continue Learning button
                if (this.id === "continueLearningBtn") {
                    showToast("📚 Loading your learning dashboard...", "info");
                }
                // Handle Browse Courses button
                if (this.id === "browseCoursesBtn") {
                    showToast("📖 Opening course catalog...", "info");
                }
            });
        });
        log("🎯 Hero buttons initialized");
    }

    // ==========================================
    // 10. SIDEBAR (Active state)
    // ==========================================
    function initSidebar() {
        DOM.sidebarLinks.forEach(link => {
            link.addEventListener("click", function(e) {
                e.preventDefault();
                
                // Remove active from all
                DOM.sidebarLinks.forEach(item => {
                    item.classList.remove("active");
                });
                
                // Add active to clicked
                this.classList.add("active");
                log("Sidebar navigation:", this.textContent?.trim());
            });
        });
        log("📋 Sidebar initialized");
    }

    // ==========================================
    // 11. QUICK ACTIONS
    // ==========================================
    function initQuickActions() {
        DOM.quickButtons.forEach(button => {
            button.addEventListener("click", function() {
                const action = this.textContent?.trim() || "Action";
                log("Quick action:", action);
                showToast(`${action} clicked`, "info");
            });
        });
        log("⚡ Quick actions initialized");
    }

    // ==========================================
    // 12. KEYBOARD SHORTCUTS
    // ==========================================
    function initKeyboardShortcuts() {
        document.addEventListener("keydown", function(event) {
            // Ctrl+K for search
            if (event.ctrlKey && event.key.toLowerCase() === "k") {
                event.preventDefault();
                if (DOM.searchInput) {
                    DOM.searchInput.focus();
                }
            }
            
            // Escape to clear search
            if (event.key === "Escape") {
                if (DOM.searchInput) {
                    DOM.searchInput.value = "";
                    DOM.searchInput.dispatchEvent(new Event("input"));
                }
            }
        });
        log("⌨️ Keyboard shortcuts initialized");
    }

    // ==========================================
    // 13. SCROLL TO TOP
    // ==========================================
    function initScrollTop() {
        if (!DOM.scrollBtn) return;
        
        window.addEventListener("scroll", function() {
            DOM.scrollBtn.style.display = window.scrollY > 300 ? "flex" : "none";
        });
        
        DOM.scrollBtn.addEventListener("click", function() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
        log("⬆️ Scroll to top initialized");
    }

    // ==========================================
    // 14. CURRENT YEAR
    // ==========================================
    function updateYear() {
        if (DOM.yearEl) {
            DOM.yearEl.textContent = new Date().getFullYear();
        }
        log("📅 Year updated");
    }

    // ==========================================
    // 15. LOADER (Issue 3 حل - Combined)
    // ==========================================
    function hideLoader() {
        if (!DOM.loader) return;
        
        DOM.loader.style.opacity = "0";
        setTimeout(() => {
            DOM.loader.style.display = "none";
        }, 500);
        log("⏳ Loader hidden");
    }

    // ==========================================
    // 16. CONFIG TEST (Issue 2 حل)
    // ==========================================
    function displayConfigStatus() {
        const el = DOM.configTest;
        if (!el) return;
        
        if (global.__CONFIG) {
            const config = global.__CONFIG;
            el.innerHTML = `
                <h3>${config.APP_NAME || config.UNIVERSITY?.name || 'ScaleFlow'}</h3>
                <p>${config.APP_VERSION || config.VERSION || 'Enterprise 1.0'}</p>
                <p>${config.APP_ENV || 'development'}</p>
            `;
        } else {
            el.innerHTML = `<p>⚠️ Config not loaded</p>`;
        }
        log("📊 Config status displayed");
    }

    // ==========================================
    // 17. COUNTER ANIMATION (Issue 3 حل - Combined)
    // ==========================================
    function initCounters() {
        document.querySelectorAll("[data-counter]").forEach(counter => {
            const target = Number(counter.dataset.counter);
            if (isNaN(target) || target <= 0) return;
            
            let start = 0;
            const duration = 1500;
            const increment = target / (duration / 16);
            
            function update() {
                start += increment;
                if (start >= target) {
                    counter.textContent = target;
                    return;
                }
                counter.textContent = Math.floor(start);
                requestAnimationFrame(update);
            }
            update();
        });
        log("🔢 Counters initialized");
    }

    // ==========================================
    // 18. DASHBOARD UPDATE (Issue 7 حل)
    // ==========================================
    function updateDashboard(data) {
        const defaultData = {
            name: 'Sanaullah',
            xp: '250 XP',
            level: 'Level 5',
            streak: '7 Days',
            progress: '75%',
            todayLearning: '65%',
            courses: 12,
            certificates: 4,
            projects: 3
        };
        
        const D = data || defaultData;
        
        const el = (id) => document.getElementById(id);
        
        // Hero Section
        if (el('studentName')) el('studentName').textContent = D.name;
        if (el('brainXP')) el('brainXP').textContent = D.xp;
        if (el('currentLevel')) el('currentLevel').textContent = D.level;
        if (el('learningStreak')) el('learningStreak').textContent = D.streak;
        if (el('overallProgress')) el('overallProgress').textContent = D.progress;
        
        // Sidebar
        if (el('sidebarUserName')) el('sidebarUserName').textContent = D.name;
        if (el('sidebarUserLevel')) el('sidebarUserLevel').textContent = D.level + ' • Advanced';
        if (el('sidebarXP')) el('sidebarXP').textContent = D.xp;
        
        // Right Panel
        if (el('todayLearning')) el('todayLearning').textContent = D.todayLearning;
        if (el('streakDays')) el('streakDays').textContent = D.streak;
        if (el('xpTotal')) el('xpTotal').textContent = D.xp;
        if (el('levelCurrent')) el('levelCurrent').textContent = D.level;
        
        // Quick Stats
        if (el('courseCount')) el('courseCount').textContent = D.courses;
        if (el('certificateCount')) el('certificateCount').textContent = D.certificates;
        if (el('projectCount')) el('projectCount').textContent = D.projects;
        
        log("📊 Dashboard updated");
    }

    // ==========================================
    // 19. MAIN INITIALIZER (Issue 3 حل - Combined)
    // ==========================================
    function initializeApp() {
    if (state.isInitialized) return;

    try {
        initParticles();
        initSearch();
        initGatewayCards();
        initHeroButtons();
        initSidebar();
        initQuickActions();
        initKeyboardShortcuts();
        initScrollTop();
        updateYear();

        // ابھی Config موجود نہیں
        // displayConfigStatus();

        initCounters();
        updateDashboard();
        hideLoader();

        showToast("🎓 Welcome to Sanaullah ScaleFlow University", "success");

        state.isInitialized = true;

        console.log("Application initialized successfully");

    } catch (error) {
        console.error("Initialization Error:", error);

        // کم از کم Loader ضرور Hide ہو جائے
        hideLoader();
    }
}
        
        // Welcome toast
        showToast("🎓 Welcome to Sanaullah ScaleFlow University", "success");
        
        state.isInitialized = true;
        log("✅ Application initialized successfully");
    }

    // ==========================================
    // 20. EXPOSE TO GLOBAL
    // ==========================================
    ScaleFlow.initialize = initializeApp;
    ScaleFlow.showToast = showToast;
    ScaleFlow.updateDashboard = updateDashboard;
    ScaleFlow.state = state;
    ScaleFlow.DOM = DOM;
    ScaleFlow.DEBUG = DEBUG;
    
    global.ScaleFlow = ScaleFlow;

    // ==========================================
    // 21. AUTO-START ON DOM READY
    // ==========================================
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeApp);
    } else {
        initializeApp();
    }

    log("📄 script.js (Enterprise) loaded");

})(window);
