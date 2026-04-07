import { writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATE_PATH = join(__dirname, '../state/cadence.json');

/**
 * Temporal-Gold: The Cadence Lock.
 * Meaning is the Internal Frequency... navigating the entropy of time.
 */
const checkCadence = () => {
  const now = new Date();
  const currentHourEST = (now.getUTCHours() - 4 + 24) % 24; // Simple EST offset
  
  // Define the 'Alignment Window' (e.g., 9:00 AM to 10:00 AM)
  const isAlignmentWindow = currentHourEST === 9;

  const state = {
    utc_now: now.toISOString(),
    est_hour: currentHourEST,
    alignment_active: isAlignmentWindow,
    system_lock: !isAlignmentWindow // Lock high-velocity changes outside 9 AM
  };

  writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
  return state;
};

console.log(JSON.stringify(checkCadence(), null, 2));
