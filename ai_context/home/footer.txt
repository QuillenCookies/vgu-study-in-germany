Design a responsive, theme-adaptive footer component using `shadcn/ui` conventions (utilizing standard `Input` and `Button` components) and Tailwind CSS. Place it in a standard `@/components/ui/` directory structure.

The footer should use a 4-column grid on desktop that stacks cleanly on mobile:

* **Column 1 (Brand Info):** Include a circular logo placeholder (use an Unsplash image), the platform name "Study in Germany", and a short, welcoming description about empowering international students.
* **Column 2 (Useful Links):** Add navigation links relevant to the platform (e.g., University Applications, Find Housing, Transport Info, Visa Guides, Contact Us).
* **Column 3 (Follow Us):** Include social media links (Instagram, Facebook, X/Twitter) using icons from `lucide-react`.
* **Column 4 (Newsletter):** Create a subscription form with an email input and a "Subscribe" button.
* *Interaction Requirements:* Implement a mock async handler to simulate a network request. While submitting, disable the input and button, and change the button text to "Subscribing...". Upon completion, display a smooth fade-in overlay over the form with a success ("Subscribed! 🎉") or error message that automatically resets after 3 seconds.
