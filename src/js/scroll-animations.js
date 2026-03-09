const setupScrollAnimations = () => {
  const nodes = Array.from(document.querySelectorAll("[data-aos]"));
  if (nodes.length === 0) return;
  const speedFactor = 0.55;

  const easingMap = {
    linear: "cubic-bezier(0.25, 0.25, 0.75, 0.75)",
    ease: "ease",
    "ease-in": "ease-in",
    "ease-out": "ease-out",
    "ease-in-out": "ease-in-out",
    "ease-in-back": "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
    "ease-out-back": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    "ease-in-out-back": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    "ease-in-sine": "cubic-bezier(0.47, 0, 0.745, 0.715)",
    "ease-out-sine": "cubic-bezier(0.39, 0.575, 0.565, 1)",
    "ease-in-out-sine": "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
    "ease-in-quad": "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
    "ease-out-quad": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    "ease-in-out-quad": "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
    "ease-in-cubic": "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
    "ease-out-cubic": "cubic-bezier(0.215, 0.61, 0.355, 1)",
    "ease-in-out-cubic": "cubic-bezier(0.645, 0.045, 0.355, 1)",
    "ease-in-quart": "cubic-bezier(0.895, 0.03, 0.685, 0.22)",
    "ease-out-quart": "cubic-bezier(0.165, 0.84, 0.44, 1)",
    "ease-in-out-quart": "cubic-bezier(0.77, 0, 0.175, 1)",
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    nodes.forEach((node) => {
      node.classList.add("aos-animate");
    });
    return;
  }

  const bodyDuration = Number.parseInt(document.body.getAttribute("data-aos-duration") || "", 10);
  const bodyDelay = Number.parseInt(document.body.getAttribute("data-aos-delay") || "", 10);
  const bodyEasing = document.body.getAttribute("data-aos-easing") || "";
  const bodyOnce = document.body.getAttribute("data-aos-once") === "true";

  nodes.forEach((node) => {
    const durationAttr = Number.parseInt(node.getAttribute("data-aos-duration") || "", 10);
    const delayAttr = Number.parseInt(node.getAttribute("data-aos-delay") || "", 10);
    const easingAttr = node.getAttribute("data-aos-easing") || "";
    const onceAttr = node.getAttribute("data-aos-once");

    const rawDuration = Number.isFinite(durationAttr) ? durationAttr : (Number.isFinite(bodyDuration) ? bodyDuration : 700);
    const rawDelay = Number.isFinite(delayAttr) ? delayAttr : (Number.isFinite(bodyDelay) ? bodyDelay : 0);
    const duration = Math.max(120, Math.round(rawDuration * speedFactor));
    const delay = Math.max(0, Math.round(rawDelay * speedFactor));
    const easingKey = easingAttr || bodyEasing || "linear";
    const easing = easingMap[easingKey] || easingKey || "cubic-bezier(0.25, 0.25, 0.75, 0.75)";
    const once = onceAttr === null ? bodyOnce : onceAttr === "true";

    node.style.setProperty("--aos-duration", `${duration}ms`);
    node.style.setProperty("--aos-delay", `${delay}ms`);
    node.style.setProperty("--aos-easing", easing);
    node.dataset.aosOnceResolved = once ? "true" : "false";
    node.dataset.aosInView = "false";
    node.classList.add("aos-init");
  });

  let lastScrollY = window.scrollY;
  let isScrollingDown = true;

  window.addEventListener(
    "scroll",
    () => {
      const currentY = window.scrollY;
      isScrollingDown = currentY >= lastScrollY;
      lastScrollY = currentY;
    },
    { passive: true }
  );

  const replayAnimation = (node) => {
    node.classList.remove("aos-no-motion");
    node.classList.remove("aos-animate");
    // Force reflow so CSS transition restarts on every re-entry.
    void node.offsetWidth;
    node.classList.add("aos-animate");
  };

  const showWithoutAnimation = (node) => {
    node.classList.add("aos-no-motion");
    node.classList.remove("aos-animate");
    void node.offsetWidth;
    node.classList.add("aos-animate");

    requestAnimationFrame(() => {
      node.classList.remove("aos-no-motion");
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const node = entry.target;
        const once = node.dataset.aosOnceResolved === "true";
        const wasInView = node.dataset.aosInView === "true";

        if (!entry.isIntersecting) {
          // Element is fully outside viewport: reset so next entry can replay.
          node.classList.remove("aos-no-motion");
          if (!once) {
            node.classList.remove("aos-animate");
          }
          node.dataset.aosInView = "false";
          return;
        }

        node.dataset.aosInView = "true";

        if (wasInView) {
          return;
        }

        if (isScrollingDown) {
          replayAnimation(node);

          if (once) {
            observer.unobserve(node);
          }
          return;
        }

        // If user reaches this element while scrolling up, show it without animation.
        showWithoutAnimation(node);
        if (once) {
          observer.unobserve(node);
        }
      });
    },
    {
      threshold: 0,
      rootMargin: "0px",
    }
  );

  nodes.forEach((node) => observer.observe(node));
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupScrollAnimations);
} else {
  setupScrollAnimations();
}
