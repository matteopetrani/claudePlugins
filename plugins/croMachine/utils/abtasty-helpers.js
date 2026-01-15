/**
 * ABTasty Utilities Library
 * Robust helper functions for ABTasty variant implementations
 *
 * These utilities handle common patterns needed for reliable A/B test variants:
 * - Waiting for elements to appear (mutation observers)
 * - Safe DOM manipulation with error handling
 * - Page ready detection
 * - Debug logging
 * - Rollback function generation
 */

// ============================================================================
// ELEMENT WAITING (Mutation Observer-based)
// ============================================================================

/**
 * Wait for an element to appear in the DOM using MutationObserver
 * @param {string} selector - CSS selector for the target element
 * @param {number} timeout - Maximum wait time in milliseconds (default: 10000)
 * @param {Element} context - Root element to observe (default: document.body)
 * @returns {Promise<Element>} - Resolves with the element when found, rejects on timeout
 *
 * @example
 * waitForElement('.product-price', 5000)
 *   .then(element => {
 *     element.style.color = 'red';
 *   })
 *   .catch(error => {
 *     console.error('Element not found:', error);
 *   });
 */
function waitForElement(selector, timeout = 10000, context = document.body) {
  return new Promise((resolve, reject) => {
    // Check if element already exists
    const existingElement = context.querySelector(selector);
    if (existingElement) {
      logDebug('Element found immediately', { selector });
      resolve(existingElement);
      return;
    }

    let timeoutId;
    const observer = new MutationObserver((mutations, obs) => {
      const element = context.querySelector(selector);
      if (element) {
        clearTimeout(timeoutId);
        obs.disconnect();
        logDebug('Element found via observer', { selector });
        resolve(element);
      }
    });

    // Start observing
    observer.observe(context, {
      childList: true,
      subtree: true
    });

    // Set timeout
    timeoutId = setTimeout(() => {
      observer.disconnect();
      const error = `Element not found within ${timeout}ms: ${selector}`;
      logDebug(error, { selector, timeout });
      reject(new Error(error));
    }, timeout);
  });
}

/**
 * Wait for multiple elements to appear
 * @param {string[]} selectors - Array of CSS selectors
 * @param {number} timeout - Maximum wait time in milliseconds
 * @returns {Promise<Element[]>} - Resolves with array of elements
 */
function waitForElements(selectors, timeout = 10000) {
  return Promise.all(
    selectors.map(selector => waitForElement(selector, timeout))
  );
}

// ============================================================================
// PAGE READY DETECTION
// ============================================================================

/**
 * Execute callback when page is fully ready
 * Handles multiple ready states: loading, interactive, complete
 * @param {Function} callback - Function to execute when ready
 * @param {number} additionalDelay - Optional delay after ready (default: 0ms)
 *
 * @example
 * onPageReady(() => {
 *   console.log('Page is ready!');
 *   // Your variant code here
 * }, 500); // Wait extra 500ms after page ready
 */
function onPageReady(callback, additionalDelay = 0) {
  const execute = () => {
    if (additionalDelay > 0) {
      setTimeout(callback, additionalDelay);
    } else {
      callback();
    }
  };

  if (document.readyState === 'complete') {
    execute();
  } else if (document.readyState === 'interactive') {
    // DOM ready but resources still loading
    window.addEventListener('load', execute);
  } else {
    // Still loading
    document.addEventListener('DOMContentLoaded', () => {
      window.addEventListener('load', execute);
    });
  }
}

// ============================================================================
// SAFE DOM MANIPULATION
// ============================================================================

/**
 * Safely modify DOM element with error handling
 * @param {string} selector - CSS selector for target element
 * @param {Function} modifyFn - Function that receives element and modifies it
 * @param {Object} options - Configuration options
 * @returns {Object} - Result object with success status and element
 *
 * @example
 * safeModifyDOM('.checkout-button', (button) => {
 *   button.textContent = 'Complete Purchase';
 *   button.style.backgroundColor = '#ff0000';
 * }, { waitForElement: true, timeout: 5000 });
 */
async function safeModifyDOM(selector, modifyFn, options = {}) {
  const defaults = {
    waitForElement: false,
    timeout: 10000,
    logErrors: true,
    context: document.body
  };
  const config = { ...defaults, ...options };

  try {
    let element;

    if (config.waitForElement) {
      element = await waitForElement(selector, config.timeout, config.context);
    } else {
      element = config.context.querySelector(selector);
    }

    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }

    // Execute modification
    const result = modifyFn(element);

    logDebug('DOM modification successful', { selector });
    return { success: true, element, result };

  } catch (error) {
    if (config.logErrors) {
      console.error(`[ABTasty] DOM modification failed for ${selector}:`, error);
    }
    return { success: false, error: error.message };
  }
}

/**
 * Safely modify multiple DOM elements
 * @param {Array} modifications - Array of {selector, modifyFn, options}
 * @returns {Array} - Array of result objects
 */
async function safeModifyMultiple(modifications) {
  return Promise.all(
    modifications.map(mod =>
      safeModifyDOM(mod.selector, mod.modifyFn, mod.options || {})
    )
  );
}

// ============================================================================
// ROLLBACK FUNCTIONALITY
// ============================================================================

/**
 * Create a rollback function that can undo DOM modifications
 * @param {Array} modifications - Array of modification records
 * @returns {Function} - Rollback function
 *
 * @example
 * const rollback = createRollback([
 *   { selector: '.button', property: 'textContent', originalValue: 'Buy Now' },
 *   { selector: '.price', property: 'innerHTML', originalValue: '$99' }
 * ]);
 * // Later, to undo changes:
 * rollback();
 */
function createRollback(modifications) {
  const rollbackData = modifications.map(mod => {
    const element = document.querySelector(mod.selector);
    if (!element) return null;

    return {
      element,
      changes: mod.changes || []
    };
  }).filter(Boolean);

  return function rollback() {
    rollbackData.forEach(({ element, changes }) => {
      changes.forEach(change => {
        if (change.type === 'style') {
          element.style[change.property] = change.originalValue;
        } else if (change.type === 'attribute') {
          if (change.originalValue === null) {
            element.removeAttribute(change.property);
          } else {
            element.setAttribute(change.property, change.originalValue);
          }
        } else if (change.type === 'content') {
          element[change.property] = change.originalValue;
        } else if (change.type === 'class') {
          if (change.action === 'add') {
            element.classList.remove(change.className);
          } else if (change.action === 'remove') {
            element.classList.add(change.className);
          }
        }
      });
    });
    logDebug('Rollback executed successfully');
  };
}

/**
 * Capture current state of element before modification
 * @param {string} selector - CSS selector
 * @param {Array} properties - Properties to capture (e.g., ['textContent', 'style.color'])
 * @returns {Object} - State snapshot
 */
function captureState(selector, properties = []) {
  const element = document.querySelector(selector);
  if (!element) return null;

  const state = { selector, properties: {} };

  properties.forEach(prop => {
    if (prop.includes('.')) {
      // Handle nested properties like 'style.color'
      const parts = prop.split('.');
      let value = element;
      parts.forEach(part => {
        value = value?.[part];
      });
      state.properties[prop] = value;
    } else {
      state.properties[prop] = element[prop];
    }
  });

  return state;
}

// ============================================================================
// DEBUG LOGGING
// ============================================================================

/**
 * Log debug messages with consistent formatting
 * @param {string} message - Log message
 * @param {Object} data - Additional data to log
 */
function logDebug(message, data = {}) {
  const timestamp = new Date().toISOString();
  console.log(`[ABTasty Debug ${timestamp}]`, message, data);
}

/**
 * Log error messages
 * @param {string} message - Error message
 * @param {Error} error - Error object
 */
function logError(message, error) {
  console.error(`[ABTasty Error]`, message, error);
}

// ============================================================================
// JQUERY COMPATIBILITY
// ============================================================================

/**
 * Check if jQuery is available (ABTasty provides it)
 * @returns {boolean}
 */
function isjQueryAvailable() {
  return typeof jQuery !== 'undefined' && typeof $ !== 'undefined';
}

/**
 * Get jQuery or throw error if not available
 * @returns {jQuery}
 */
function getjQuery() {
  if (!isjQueryAvailable()) {
    throw new Error('jQuery is not available in ABTasty context');
  }
  return jQuery;
}

// ============================================================================
// SELECTOR VALIDATION
// ============================================================================

/**
 * Validate that a CSS selector is not fragile
 * Warns about selectors using nth-child, complex chains, etc.
 * @param {string} selector - CSS selector to validate
 * @returns {Object} - Validation result with warnings
 */
function validateSelector(selector) {
  const warnings = [];

  if (selector.includes(':nth-child')) {
    warnings.push('Selector uses :nth-child which can be fragile if DOM structure changes');
  }

  if (selector.split(' ').length > 4) {
    warnings.push('Selector is deeply nested which may be fragile');
  }

  if (!selector.includes('[') && !selector.includes('.') && !selector.includes('#')) {
    warnings.push('Selector uses only tag names which may match too broadly');
  }

  const isValid = warnings.length === 0;

  if (!isValid) {
    logDebug('Selector validation warnings', { selector, warnings });
  }

  return { isValid, warnings };
}

// ============================================================================
// TIMING UTILITIES
// ============================================================================

/**
 * Retry a function multiple times with exponential backoff
 * @param {Function} fn - Async function to retry
 * @param {number} maxRetries - Maximum number of retry attempts
 * @param {number} initialDelay - Initial delay in ms (default: 100)
 * @returns {Promise} - Resolves with function result or rejects after max retries
 */
async function retryWithBackoff(fn, maxRetries = 3, initialDelay = 100) {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, i);
        logDebug(`Retry attempt ${i + 1}/${maxRetries} after ${delay}ms`, { error: error.message });
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

// ============================================================================
// EXPORTS (if using modules) or Global Assignment
// ============================================================================

// If using as a module:
// export {
//   waitForElement,
//   waitForElements,
//   onPageReady,
//   safeModifyDOM,
//   safeModifyMultiple,
//   createRollback,
//   captureState,
//   logDebug,
//   logError,
//   isjQueryAvailable,
//   getjQuery,
//   validateSelector,
//   retryWithBackoff
// };

// For ABTasty (global scope):
window.ABTastyHelpers = {
  waitForElement,
  waitForElements,
  onPageReady,
  safeModifyDOM,
  safeModifyMultiple,
  createRollback,
  captureState,
  logDebug,
  logError,
  isjQueryAvailable,
  getjQuery,
  validateSelector,
  retryWithBackoff
};
