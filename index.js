/**
 * Riverbraid-Temporal-Gold: index.js
 * Sequence Integrity and Order Validation (v1.3.0)
 */

export const RB_PETAL_ID = 'Riverbraid-Temporal-Gold';

export function validateSequence(steps) {
  if (!Array.isArray(steps) || steps.length === 0) {
    return { valid: false, reason: 'SEQUENCE_ERROR: steps must be a non-empty array' };
  }
  for (let i = 0; i < steps.length; i++) {
    if (typeof steps[i].index !== 'number') {
      return { valid: false, reason: `SEQUENCE_ERROR: step at position ${i} has no numeric index` };
    }
    if (i > 0 && steps[i].index <= steps[i - 1].index) {
      return {
        valid: false,
        reason: `SEQUENCE_ERROR: '${steps[i].name}' (${steps[i].index}) is out of order after '${steps[i - 1].name}' (${steps[i - 1].index})`
      };
    }
  }
  return { valid: true };
}

export function assertPrecedes(requiredName, dependentName, steps) {
  const required = steps.find(s => s.name === requiredName);
  const dependent = steps.find(s => s.name === dependentName);
  if (!required) throw new Error(`PRECEDES_ERROR: '${requiredName}' not found`);
  if (!dependent) throw new Error(`PRECEDES_ERROR: '${dependentName}' not found`);
  return required.index < dependent.index;
}

export function getStatus() {
  return { status: 'STATIONARY', petal: RB_PETAL_ID };
}
