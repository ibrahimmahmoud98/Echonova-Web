import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const APOLLO_API_KEY = process.env.APOLLO_API_KEY;
const HUNTER_API_KEY = process.env.HUNTER_API_KEY;

rl.on('line', async (line) => {
  if (!line.trim()) return;
  try {
    const request = JSON.parse(line);
    const response = await handleRequest(request);
    if (response) {
      console.log(JSON.stringify(response));
    }
  } catch (err) {
    console.error('Error processing line:', err);
  }
});

async function handleRequest(request) {
  const { method, id, params } = request;
  
  if (method === 'initialize') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: '2024-11-05',
        capabilities: {
          tools: {}
        },
        serverInfo: {
          name: 'apollo-hunter-mcp',
          version: '1.0.0'
        }
      }
    };
  }
  
  if (method === 'notifications/initialized') {
    return null;
  }
  
  if (method === 'tools/list') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        tools: [
          {
            name: 'apollo_search_companies',
            description: 'Search for organizations in Apollo.io by location, domain, or industry employee count.',
            inputSchema: {
              type: 'object',
              properties: {
                domains: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'List of company domains to search (e.g. ["lattafa.com"])'
                },
                locations: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'List of countries or cities (e.g. ["United Arab Emirates", "Saudi Arabia"])'
                },
                employee_ranges: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'List of employee count ranges (e.g. ["1,10", "11,50", "51,200"])'
                }
              }
            }
          },
          {
            name: 'apollo_search_people',
            description: 'Search for target people/contacts (e.g., Marketing Managers, Creative Directors) within companies.',
            inputSchema: {
              type: 'object',
              properties: {
                domains: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Company domains to search contacts in (e.g. ["lattafa.com"])'
                },
                titles: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Job titles to filter by (e.g. ["marketing director", "creative director", "marketing manager"])'
                },
                locations: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Target locations'
                }
              },
              required: ['domains']
            }
          },
          {
            name: 'apollo_enrich_contact',
            description: 'Enrich contact info for a specific person using their name and company domain to find their email and LinkedIn profile.',
            inputSchema: {
              type: 'object',
              properties: {
                first_name: { type: 'string', description: 'First name of the person' },
                last_name: { type: 'string', description: 'Last name of the person' },
                domain: { type: 'string', description: 'Company domain (e.g. "lattafa.com")' },
                organization_name: { type: 'string', description: 'Company name' }
              },
              required: ['first_name', 'last_name', 'domain']
            }
          },
          {
            name: 'hunter_verify_email',
            description: 'Verify if an email address is valid and deliverable using Hunter.io.',
            inputSchema: {
              type: 'object',
              properties: {
                email: { type: 'string', description: 'Email address to verify' }
              },
              required: ['email']
            }
          },
          {
            name: 'hunter_find_email',
            description: 'Find a professional email address using a person\'s name and company domain name.',
            inputSchema: {
              type: 'object',
              properties: {
                first_name: { type: 'string', description: 'First name of the person' },
                last_name: { type: 'string', description: 'Last name of the person' },
                domain: { type: 'string', description: 'Company domain name (e.g. "lattafa.com")' }
              },
              required: ['first_name', 'last_name', 'domain']
            }
          }
        ]
      }
    };
  }
  
  if (method === 'tools/call') {
    const { name, arguments: args } = params;
    try {
      let data;
      if (name === 'apollo_search_companies') {
        data = await apolloSearchCompanies(args);
      } else if (name === 'apollo_search_people') {
        data = await apolloSearchPeople(args);
      } else if (name === 'apollo_enrich_contact') {
        data = await apolloEnrichContact(args);
      } else if (name === 'hunter_verify_email') {
        data = await hunterVerifyEmail(args);
      } else if (name === 'hunter_find_email') {
        data = await hunterFindEmail(args);
      } else {
        throw new Error(`Tool not found: ${name}`);
      }
      
      return {
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data, null, 2)
            }
          ]
        }
      };
    } catch (err) {
      console.error(`Error in tool ${name}:`, err);
      return {
        jsonrpc: '2.0',
        id,
        error: {
          code: -32603,
          message: err.message
        }
      };
    }
  }
  
  return null;
}

// API helper functions
async function apolloRequest(endpoint, body = {}) {
  if (!APOLLO_API_KEY) {
    throw new Error('APOLLO_API_KEY is not defined in the environment.');
  }
  const url = `https://api.apollo.io/v1/${endpoint}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    },
    body: JSON.stringify({
      api_key: APOLLO_API_KEY,
      ...body
    })
  });
  
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Apollo API error (${response.status}): ${text}`);
  }
  return await response.json();
}

async function apolloSearchCompanies(args) {
  const body = {};
  if (args.domains) body.q_organization_domains = args.domains.join('\n');
  if (args.locations) body.organization_locations = args.locations;
  if (args.employee_ranges) body.organization_num_employees_ranges = args.employee_ranges;
  return await apolloRequest('organizations/search', body);
}

async function apolloSearchPeople(args) {
  const body = {
    q_organization_domains: args.domains.join('\n')
  };
  if (args.titles) body.person_titles = args.titles;
  if (args.locations) body.person_locations = args.locations;
  return await apolloRequest('mixed_people/search', body);
}

async function apolloEnrichContact(args) {
  const body = {
    first_name: args.first_name,
    last_name: args.last_name,
    domain: args.domain
  };
  if (args.organization_name) body.organization_name = args.organization_name;
  return await apolloRequest('people/match', body);
}

async function hunterRequest(endpoint, params = {}) {
  if (!HUNTER_API_KEY) {
    throw new Error('HUNTER_API_KEY is not defined in the environment.');
  }
  const query = new URLSearchParams({
    api_key: HUNTER_API_KEY,
    ...params
  }).toString();
  const url = `https://api.hunter.io/v2/${endpoint}?${query}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Hunter API error (${response.status}): ${text}`);
  }
  return await response.json();
}

async function hunterVerifyEmail(args) {
  return await hunterRequest('email-verifier', { email: args.email });
}

async function hunterFindEmail(args) {
  return await hunterRequest('email-finder', {
    domain: args.domain,
    first_name: args.first_name,
    last_name: args.last_name
  });
}
