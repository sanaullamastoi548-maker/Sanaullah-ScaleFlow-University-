/* ==========================================
   Sanaullah ScaleFlow University
   Module: dashboard.js
   Version: Enterprise 1.0
   Purpose: ONLY update Dashboard UI
   Status: ✅ Visual Test Ready
========================================== */

(function() {
    "use strict";

    // ----------------------------------------
    // 1. DEMO DATA (Dashboard Only)
    // ----------------------------------------
    const DASHBOARD_DATA = {
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

    // ----------------------------------------
    // 2. UPDATE DASHBOARD ONLY
    // ----------------------------------------
    function updateDashboard() {
        console.log('📊 [dashboard.js] Updating Dashboard...');

        // --- 2.1 Hero Section (Welcome Card) ---
        const studentName = document.getElementById('studentName');
        const brainXP = document.getElementById('brainXP');
        const currentLevel = document.getElementById('currentLevel');
        const learningStreak = document.getElementById('learningStreak');
        const overallProgress = document.getElementById('overallProgress');

        if (studentName) studentName.textContent = DASHBOARD_DATA.name;
        if (brainXP) brainXP.textContent = DASHBOARD_DATA.xp;
        if (currentLevel) currentLevel.textContent = DASHBOARD_DATA.level;
        if (learningStreak) learningStreak.textContent = DASHBOARD_DATA.streak;
        if (overallProgress) overallProgress.textContent = DASHBOARD_DATA.progress;

        // --- 2.2 Sidebar User Card ---
        const sidebarName = document.getElementById('sidebarUserName');
        const sidebarLevel = document.getElementById('sidebarUserLevel');
        const sidebarXP = document.getElementById('sidebarXP');

        if (sidebarName) sidebarName.textContent = DASHBOARD_DATA.name;
        if (sidebarLevel) sidebarLevel.textContent = DASHBOARD_DATA.level + ' • Advanced';
        if (sidebarXP) sidebarXP.textContent = DASHBOARD_DATA.xp;

        // --- 2.3 Right Panel Progress ---
        const todayLearning = document.getElementById('todayLearning');
        const streakDays = document.getElementById('streakDays');
        const xpTotal = document.getElementById('xpTotal');
        const levelCurrent = document.getElementById('levelCurrent');

        if (todayLearning) todayLearning.textContent = DASHBOARD_DATA.todayLearning;
        if (streakDays) streakDays.textContent = DASHBOARD_DATA.streak;
        if (xpTotal) xpTotal.textContent = DASHBOARD_DATA.xp;
        if (levelCurrent) levelCurrent.textContent = DASHBOARD_DATA.level;

        // --- 2.4 Quick Stats ---
        const courseCount = document.getElementById('courseCount');
        const certificateCount = document.getElementById('certificateCount');
        const projectCount = document.getElementById('projectCount');

        if (courseCount) courseCount.textContent = DASHBOARD_DATA.courses;
        if (certificateCount) certificateCount.textContent = DASHBOARD_DATA.certificates;
        if (projectCount) projectCount.textContent = DASHBOARD_DATA.projects;

        console.log('✅ [dashboard.js] Dashboard Updated Successfully!');
        console.log('   👤 Name:', DASHBOARD_DATA.name);
        console.log('   ⭐ XP:', DASHBOARD_DATA.xp);
        console.log('   🏆 Level:', DASHBOARD_DATA.level);
    }

    // ----------------------------------------
    // 3. RUN ON PAGE LOAD
    // ----------------------------------------
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateDashboard);
    } else {
        updateDashboard();
    }

    // ----------------------------------------
    // 4. EXPOSE FOR FUTURE USE
    // ----------------------------------------
    window.__DASHBOARD = {
        update: updateDashboard,
        data: DASHBOARD_DATA
    };

    console.log('📄 [dashboard.js] Loaded. Waiting for visual update...');

})();
