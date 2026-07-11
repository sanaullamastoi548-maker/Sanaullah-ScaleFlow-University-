/*==========================================
  Sanaullah ScaleFlow University
  Module : Main Gateway
  Version : 1.0
==========================================*/

"use strict";

/* ==========================================
   GLOBAL DOM ELEMENTS
========================================== */

const body = document.body;

const appContainer = document.querySelector(".app-container");

const sidebar = document.querySelector(".sidebar");

const mainContent = document.querySelector(".main-content");

const rightPanel = document.querySelector(".right-panel");

const hero = document.querySelector(".learning-home-hero");
const searchInput = document.querySelector(".smart-search input");

const gatewayCards = document.querySelectorAll(".gateway-card");

const heroButtons = document.querySelectorAll(".hero-buttons button");

const sidebarLinks = document.querySelectorAll(".sidebar-menu a");

const quickButtons = document.querySelectorAll(".quick-actions button");

/* ==========================================
   GLOBAL VARIABLES
========================================== */

let currentGateway = null;

let searchKeyword = "";

let animationSpeed = 350;

/* ==========================================
   INITIALIZE APPLICATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeApp();

});

/* ==========================================
   MAIN INITIALIZER
========================================== */

function initializeApp() {

    initializeParticles();

    console.log("✅ Sanaullah ScaleFlow University Loaded");

}

/* ==========================================
   PARTICLES INITIALIZER
========================================== */

function initializeParticles() {

    if (typeof particlesJS === "undefined") return;

    particlesJS("particles-js", {

        particles: {

            number: {
                value: 60
            },

            color: {
                value: "#FFC107"
            },

            shape: {
                type: "circle"
            },

            opacity: {
                value: 0.3
            },

            size: {
                value: 3
            },

            move: {
                enable: true,
                speed: 2
            }

        }

    });

}

/* ==========================================
   SMART SEARCH
========================================== */

if (searchInput) {

    searchInput.addEventListener("input", function () {

        searchKeyword = this.value.toLowerCase().trim();

        gatewayCards.forEach(card => {

            const title = card.querySelector("h3").textContent.toLowerCase();

            const text = card.querySelector("p").textContent.toLowerCase();

            if (title.includes(searchKeyword) || text.includes(searchKeyword)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}


/* ==========================================
   GATEWAY CARD CLICK
========================================== */

gatewayCards.forEach(card => {

    card.addEventListener("click", function () {

        currentGateway = this.querySelector("h3").textContent;

        console.log("Gateway:", currentGateway);

        this.style.transform = "scale(0.98)";

        setTimeout(() => {

            this.style.transform = "";

        }, 150);

    });

});


/* ==========================================
   HERO BUTTON EVENTS
========================================== */

heroButtons.forEach(button => {

    button.addEventListener("click", function () {

        console.log("Button Clicked:", this.textContent);

    });

});


/* ==========================================
   SIDEBAR MENU
========================================== */

sidebarLinks.forEach(link => {

    link.addEventListener("click", function () {

        sidebarLinks.forEach(item => {

            item.classList.remove("active");

        });

        this.classList.add("active");

    });

});

/* ==========================================
   QUICK ACTION BUTTONS
========================================== */

quickButtons.forEach(button => {

    button.addEventListener("click", function () {

        const action = this.textContent.trim();

        showToast(action + " clicked.");

        console.log("Quick Action:", action);

    });

});


/* ==========================================
   TOAST NOTIFICATION
========================================== */

function showToast(message) {

    const toast = document.createElement("div");

    toast.className = "toast-notification";

    toast.textContent = message;

    toast.style.position = "fixed";
    toast.style.bottom = "25px";
    toast.style.right = "25px";
    toast.style.padding = "14px 20px";
    toast.style.background = "#FFC107";
    toast.style.color = "#111827";
    toast.style.borderRadius = "12px";
    toast.style.boxShadow = "0 10px 25px rgba(0,0,0,.15)";
    toast.style.zIndex = "9999";

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 3000);

}


/* ==========================================
   KEYBOARD SHORTCUTS
========================================== */

document.addEventListener("keydown", function(event){

    if(event.ctrlKey && event.key.toLowerCase()==="k"){

        event.preventDefault();

        if(searchInput){

            searchInput.focus();

        }

    }

    if(event.key==="Escape"){

        if(searchInput){

            searchInput.value="";

            searchInput.dispatchEvent(new Event("input"));

        }

    }

});


/* ==========================================
   PAGE LOADED
========================================== */

window.addEventListener("load", function(){

    showToast("Welcome to Sanaullah ScaleFlow University");

});

/* ==========================================
   Sanaullah ScaleFlow University
   script.js — Part 4 (Final)
========================================== */

/* ==========================================
   COUNTER ANIMATION
========================================== */

function animateCounter(element, target, duration = 1500) {

    let start = 0;
    const increment = target / (duration / 16);

    function update() {

        start += increment;

        if (start >= target) {
            element.textContent = target;
            return;
        }

        element.textContent = Math.floor(start);

        requestAnimationFrame(update);
    }

    update();
}

document.querySelectorAll("[data-counter]").forEach(counter => {

    const target = Number(counter.dataset.counter);

    animateCounter(counter, target);

});


/* ==========================================
   SCROLL TO TOP BUTTON
========================================== */

const scrollBtn = document.getElementById("scrollTopBtn");

if (scrollBtn) {

    window.addEventListener("scroll", () => {

        scrollBtn.style.display =
            window.scrollY > 300 ? "block" : "none";

    });

    scrollBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}


/* ==========================================
   CURRENT YEAR
========================================== */

const year = document.getElementById("currentYear");

if (year) {

    year.textContent = new Date().getFullYear();

}


/* ==========================================
   PAGE LOADER
========================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 500);

    }

});


/* ==========================================
   CONSOLE MESSAGE
========================================== */

console.log("🚀 Sanaullah ScaleFlow University Loaded Successfully");
