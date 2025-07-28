import axios from 'axios';

interface BreachData {
  Name: string;
  Title: string;
  Domain: string;
  BreachDate: string;
  AddedDate: string;
  ModifiedDate: string;
  PwnCount: number;
  Description: string;
  DataClasses: string[];
  IsVerified: boolean;
  IsFabricated: boolean;
  IsSensitive: boolean;
  IsRetired: boolean;
  IsSpamList: boolean;
  LogoPath: string;
}

class HibpService {
  private readonly baseUrl = 'https://haveibeenpwned.com/api/v3';
  private readonly apiKey: string;

  constructor() {
    this.apiKey = process.env.HIBP_API_KEY || '';
    if (!this.apiKey) {
      console.warn('HIBP_API_KEY not found in env');
    }
  }

  //Check if email in any data breaches
  async checkBreaches(email: string): Promise<BreachData[] | null> {
    try {
      if (!this.apiKey) {
        throw new Error('HIBP API key not configured');
      }

      const response = await axios.get(
        `${this.baseUrl}/breachedaccount/${encodeURIComponent(email)}`,
        {
          headers: {
            'hibp-api-key': this.apiKey,
            'User-Agent': 'Breach-Radar-VK',
          },
          params: {
            truncateResponse: false,
            includeUnverified: true,
          },
          timeout: 10000, // 10 second timeout
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          // No breaches found, all good
          return [];
        }
        if (error.response?.status === 429) {
          throw new Error('Rate limit exceeded, try again later.');
        }
        if (error.response?.status === 401) {
          throw new Error('Invalid API key');
        }
      }
      
      throw new Error('Failed to check breaches');
    }
  }

  // Get all breaches from HIBP (public data)
  async getAllBreaches(): Promise<BreachData[] | null> {
    try {
      const response = await axios.get(`${this.baseUrl}/breaches`, {
        headers: {
          'User-Agent': 'Breach-Radar-VK',
        },
        timeout: 15000, // 15 second timeout
      });

      return response.data;
    } catch (error) {
      console.error('HIBP get all breaches error:', error);
      throw new Error('Failed to get breach data');
    }
  }

  // Get details of a specific breach
  async getBreachDetails(breachName: string): Promise<BreachData | null> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/breach/${encodeURIComponent(breachName)}`,
        {
          headers: {
            'User-Agent': 'Breach-Radar-VK',
          },
          timeout: 10000,
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      
      console.error('HIBP get breach details error:', error);
      throw new Error('Failed to get breach details');
    }
  }

  // Check if email appears in pastes (requires API key)
  async checkPastes(email: string): Promise<any[] | null> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/pasteaccount/${encodeURIComponent(email)}`,
        {
          headers: {
            'hibp-api-key': this.apiKey,
            'User-Agent': 'Breach-Radar-VK',
          },
          timeout: 10000,
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return [];
        }
        if (error.response?.status === 429) {
          throw new Error('Rate limit exceeded, try again later.');
        }
      }
      
      console.error('HIBP paste check error:', error);
      throw new Error('Failed to check pastes');
    }
  }

  // Health check for HIBP API
  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseUrl}/breaches`, {
        headers: {
          'User-Agent': 'Breach-Radar-VK',
        },
        timeout: 5000,
      });
      
      return response.status === 200;
    } catch (error) {
      console.error('HIBP health check failed:', error);
      return false;
    }
  }
}

export const hibpService = new HibpService(); 