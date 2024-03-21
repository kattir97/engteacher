export const scrollScript = () => {
  document.querySelectorAll(".nav-link").forEach((anchor) => {
    anchor.addEventListener("click", function (this: HTMLElement, e: Event) {
      e.preventDefault();

      const targetId = "section-" + this.id; // Construct the ID of the target section
      const targetSection = document.getElementById(targetId);

      if (this.id === "blog") {
        // Navigate to the blog page
        window.location.href = "/blog"; // Update the URL to the actual blog page
      } else if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" }); // Scroll smoothly to the target section
      }
    });
  });
}