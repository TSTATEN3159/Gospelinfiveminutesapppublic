// Quick manual test of trivia widget functionality
const fs = require('fs');
const html = fs.readFileSync('ueni-trivia-widget.html', 'utf8');

// Check all required elements exist
const checks = [
    { name: 'Setup screen', pattern: /id="setup"/ },
    { name: 'Playing screen', pattern: /id="play"/ },
    { name: 'Results screen', pattern: /id="results"/ },
    { name: 'Easy questions (5)', pattern: /e:\[[\s\S]*?{[\s\S]*?}[\s\S]*?{[\s\S]*?}[\s\S]*?{[\s\S]*?}[\s\S]*?{[\s\S]*?}[\s\S]*?{[\s\S]*?}\]/ },
    { name: 'Medium questions (5)', pattern: /m:\[[\s\S]*?{[\s\S]*?}[\s\S]*?{[\s\S]*?}[\s\S]*?{[\s\S]*?}[\s\S]*?{[\s\S]*?}[\s\S]*?{[\s\S]*?}\]/ },
    { name: 'Difficult questions (5)', pattern: /d:\[[\s\S]*?{[\s\S]*?}[\s\S]*?{[\s\S]*?}[\s\S]*?{[\s\S]*?}[\s\S]*?{[\s\S]*?}[\s\S]*?{[\s\S]*?}\]/ },
    { name: 'Timer function', pattern: /function startT\(\)/ },
    { name: 'Score calculation', pattern: /function calcScore\(\)/ },
    { name: 'LocalStorage save', pattern: /localStorage\.setItem/ },
    { name: 'Difficulty selection', pattern: /function setDiff/ },
    { name: 'Start function', pattern: /function start\(\)/ }
];

console.log('Bible Trivia Widget Tests:\n');
let passed = 0;
checks.forEach(check => {
    const result = check.pattern.test(html);
    console.log(`${result ? '✓' : '✗'} ${check.name}`);
    if (result) passed++;
});

console.log(`\n${passed}/${checks.length} tests passed`);
console.log(`File size: ${html.length} characters (${html.length <= 10000 ? 'UNDER' : 'OVER'} 10,000 limit)`);
