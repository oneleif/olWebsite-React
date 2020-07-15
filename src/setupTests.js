/**
 * Run once before every jest test file.
 *
 * Suppresses warnings related to ReactGA.
 */
import ReactGA from 'react-ga';

ReactGA.initialize('dummy', { testMode: true });
