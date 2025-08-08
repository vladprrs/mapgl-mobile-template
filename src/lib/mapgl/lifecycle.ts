/**
 * MapGL lifecycle utilities
 * Centralized helpers for safely cleaning up MapGL resources
 */

type Destroyable = { destroy: () => void };

/**
 * Safely destroy a MapGL instance (or any destroyable object).
 * - No-ops if instance is null/undefined or doesn't expose a destroy function
 * - Catches and warns on errors to avoid unmount crashes
 *
 * @param instance - Map instance or any object with a destroy() method
 * @param warningContext - Optional context to include in warning message
 */
export function safeDestroyMap(
  instance: Destroyable | null | undefined,
  warningContext?: string
): void {
  if (!instance || typeof instance.destroy !== 'function') return;
  try {
    instance.destroy();
  } catch (error) {
    const prefix = warningContext ? `${warningContext}:` : 'Failed to destroy map instance:';
    console.warn(prefix, error);
  }
}


