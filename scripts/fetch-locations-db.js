const { execSync } = require('child_process');

// Get arguments
const args = process.argv.slice(2);
const stateArg = args.find(arg => arg.startsWith('--state='));
const limitArg = args.find(arg => arg.startsWith('--limit='));

const state = stateArg ? stateArg.split('=')[1] : null;
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : 50;

if (!state) {
    console.error('Error: --state parameter is required (e.g., --state=TX)');
    process.exit(1);
}

// SQL Query
// We prioritize population and density to find the most relevant cities
const query = `
  SELECT 
    city, 
    state_id, 
    state_name,
    county_name,
    lat, 
    lng, 
    population, 
    density,
    zips,
    income_household_median,
    home_value
  FROM uscities 
  WHERE state_id = '${state.toUpperCase()}' 
  AND population IS NOT NULL
  ORDER BY population DESC NULLS LAST
  LIMIT ${limit}
`;

try {
    // Execute psql inside docker container and output as JSON
    // We use json_agg to get a proper JSON array output from postgres
    const psqlCommand = `docker exec uscities_db psql -U postgres -d cities_db -A -t -c "SELECT json_agg(t) FROM (${query}) t"`;

    const output = execSync(psqlCommand, { encoding: 'utf8' });

    // Clean up output (sometimes psql adds extra whitespace)
    const cleanOutput = output.trim();

    if (!cleanOutput) {
        console.log('[]');
        return;
    }

    console.log(cleanOutput);

} catch (error) {
    console.error('Failed to fetch data from Docker DB:', error.message);
    process.exit(1);
}
