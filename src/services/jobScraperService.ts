import axios from "axios";

const SCRAPER_BASE_URL =
  import.meta.env.VITE_SCRAPER_URL || "http://localhost:8000";

export interface JobScrapeRequest {
  search_terms: string[];
  locations: string[];
  site_names: string[];
  results_wanted: number;
  hours_old: number;
}

export interface JobScrapeResponse {
  success: boolean;
  message?: string;
  jobs?: unknown[];
}

class JobScraperService {
  /**
   * Scrape jobs from external sources
   */
  async scrapeJobs(params: JobScrapeRequest): Promise<JobScrapeResponse> {
    try {
      const response = await axios.post<JobScrapeResponse>(
        `${SCRAPER_BASE_URL}/scrape-json`,
        params,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 60000, // 60 second timeout for scraping
        }
      );
      return response.data;
    } catch (error) {
      console.error("Job scraping error:", error);
      throw error;
    }
  }
}

export const jobScraperService = new JobScraperService();
