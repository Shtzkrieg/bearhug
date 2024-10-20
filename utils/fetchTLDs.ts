export async function fetchTLDs(): Promise<string[]> {
    const response = await fetch('https://data.iana.org/TLD/tlds-alpha-by-domain.txt');
    const text = await response.text();
    const lines = text.split('\n');
    const tlds = lines
      .filter(line => line && !line.startsWith('#')) // Filter out comments and empty lines
      .map(line => line.toLowerCase()); // Convert to lowercase for consistency
    return tlds;
  }