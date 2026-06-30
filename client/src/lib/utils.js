// Utility to merge Tailwind CSS class names
// Uses `clsx` for conditional joining and `tailwind-merge` to resolve conflicts.
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine class names safely.
 *
 * @param {...any} inputs - Class values (strings, objects, arrays) accepted by `clsx`.
 * @returns {string} - Merged class string with Tailwind conflicts resolved.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
