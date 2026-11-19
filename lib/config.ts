/**
 * Site-wide settings. BOOKING_URL: the «Book a 30-min call» / «Book a call» target — a booking page
 * (e.g. Cal.com) once there is one; until then the Home contact form.
 */
export const config = {
  BOOKING_URL: "/#contact",
  /** «Start a project» → the Home contact form */
  CONTACT_URL: "/#contact",
} as const;
