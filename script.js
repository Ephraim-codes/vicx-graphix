document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link");
    const indicator = document.getElementById("nav-indicator");
    const navContainer = document.getElementById("main-nav");

    // 🚀 Function to instantly morph and move the glass highlight bubble
    function moveIndicator(activeLink) {
      if (!activeLink || !indicator) return;
      
      const linkRect = activeLink.getBoundingClientRect();
      const navRect = navContainer.getBoundingClientRect();

      // Calculate relative bounding coordinates within the menu dock layout
      const leftOffset = linkRect.left - navRect.left;
      
      indicator.style.width = `${linkRect.width}px`;
      indicator.style.left = `${leftOffset}px`;

      // Dim non-active navigation anchors while brightening the active choice
      navLinks.forEach(link => {
        if (link === activeLink) {
          link.classList.remove("text-gray-400");
          link.classList.add("text-white");
        } else {
          link.classList.remove("text-white");
          link.classList.add("text-gray-400");
        }
      });
    }

    // 🎯 Set up the viewport tracking camera sensor (Intersection Observer)
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Triggers right when section enters center screen workspace
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const matchingLink = document.querySelector(`.nav-link[data-target="${sectionId}"]`);
          if (matchingLink) {
            moveIndicator(matchingLink);
          }
        }
      });
    }, observerOptions);

    // Track our page targets
    ["home", "about", "projects"].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // 🖱️ Smooth navigation click handler (Works for Navbar links AND "See my works" button)
    function handleSmoothScroll(e, targetId) {
      e.preventDefault();
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        // Scroll the viewport perfectly to the section container header
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
        
        // Instantly force the navbar glass slider to move over the correct tab
        const matchingNavLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
        if (matchingNavLink) {
          moveIndicator(matchingNavLink);
        }
      }
    }

    // Bind scroll actions to navbar standard items
    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        const id = link.getAttribute("data-target");
        handleSmoothScroll(e, id);
      });
    });

    // Bind scroll actions to any internal call-to-action buttons (Like "See my works")
    const internalTriggers = document.querySelectorAll(".nav-trigger");
    internalTriggers.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = btn.getAttribute("data-target");
        handleSmoothScroll(e, id);
      });
    });

    // Initial position fix setup step
    setTimeout(() => {
      const initialActive = document.querySelector(".nav-link[data-target='home']");
      moveIndicator(initialActive);
    }, 100);
  });

 document.addEventListener("DOMContentLoaded", () => {
    // Collect all elements using our directional motion target flags
    const elementsToReveal = document.querySelectorAll(".reveal-from-left, .reveal-from-right");

    const directionObserverOptions = {
      root: null,
      rootMargin: "0px 0px -10% 0px", // Triggers dynamically as content enters the lower 10% workspace line
      threshold: 0.05
    };

    const directionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add the visible target class to smoothly trigger the CSS slide transition
          entry.target.classList.add("reveal-visible");
          
          // Unobserve the element so it remains resting in place permanently
          observer.unobserve(entry.target);
        }
      });
    }, directionObserverOptions);

    elementsToReveal.forEach(el => {
      directionObserver.observe(el);
    });
  });

  