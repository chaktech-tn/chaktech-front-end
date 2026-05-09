const fs = require('node:fs');
const path = require('node:path');

describe('next.config image remotePatterns', () => {
  it('allows localhost:5001 product upload images in development', () => {
    const configSource = fs.readFileSync(
      path.join(process.cwd(), 'next.config.js'),
      'utf8'
    );

    expect(configSource).toMatch(
      /protocol:\s*["']http["'][\s\S]*hostname:\s*["']localhost["'][\s\S]*port:\s*["']5001["'][\s\S]*pathname:\s*["']\/uploads\/products\/\*\*["']/
    );
  });
});
