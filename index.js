export const RB_PETAL_ID = 'Riverbraid-Temporal-Gold';

export function validateSequence(steps) {
  if (!Array.isArray(steps)) return { valid: false, reason: 'NOT_AN_ARRAY' };
  for (let i = 1; i < steps.length; i++) {
    if (steps[i].index <= steps[i-1].index) {
      return { valid: false, reason: `OUT_OF_ORDER: ${steps[i].name}` };
    }
  }
  return { valid: true };
}

export function getStatus() { 
  return { status: 'STATIONARY', petal: RB_PETAL_ID }; 
}
