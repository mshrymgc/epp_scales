/**
 * HEXACO-60: ESM Entry Point
 * 
 * This module imports all dependencies and triggers the initialization
 * of the HEXACO-60 questionnaire when imported.
 */

// Ensure dependencies are loaded
import 'jspsych';
import '@jspsych/plugin-html-button-response';
import '@jspsych/plugin-survey';
import '@jspsych/plugin-survey-likert';
import 'chart.js';
import './shared/styles.css';
import { saveToPipe, getSaveMessage } from './shared/datapipe.js';

// Make saveToPipe available globally for use in HTML
window.saveToPipe = saveToPipe;
window.getSaveMessage = getSaveMessage;

console.log('[HEXACO-60] Module loaded. Ready to initialize survey.');
