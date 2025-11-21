import { LinkedinScraper, events, timeFilter, experienceLevelFilter } from "..";
import * as fs from "fs";
import * as path from "path";

(async () => {
  // Configure the scraper
  const scraper = new LinkedinScraper({
    headless: false,
    slowMo: 2000, // Reduced delay
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--lang=en-GB",
      "--start-maximized",
      "--disable-blink-features=AutomationControlled", // Avoid detection
      "--disable-features=IsolateOrigins,site-per-process",
      "--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36", // Add real user agent
    ],
    timeout: 90000, // Increased timeout
  });

  // Create CSV header
  const csvHeader = "Title,Company,Location,Date,Link,Apply Link,Description\n";
  const outputPath = path.join(__dirname, "linkedin-jobs.csv");

  // Initialize CSV file with header
  fs.writeFileSync(outputPath, csvHeader);

  // Add debug logging
  scraper.on(events.scraper.data, (data) => {
    try {
      console.log("Found job:", {
        title: data.title,
        company: data.company,
        location: data.place,
      });

      const csvLine =
        [
          data.title,
          data.company || "N/A",
          data.place || "N/A",
          data.date || "N/A",
          data.link || "N/A",
          data.applyLink || "N/A",
          (data.description || "N/A").replace(/,/g, ";").replace(/\n/g, " "),
        ]
          .map((field) => `"${field}"`)
          .join(",") + "\n";

      // Write to CSV file
      fs.appendFileSync(outputPath, csvLine);
      console.log(`✅ Saved to CSV: ${data.title}`);
    } catch (error) {
      console.error("❌ Error saving to CSV:", error);
    }
  });

  // Add error handling
  scraper.on(events.scraper.error, (err) => {
    console.error("❌ Scraper error:", err);
  });

  // Add completion handler
  scraper.on(events.scraper.end, () => {
    console.log(`\n✨ Scraping completed!`);
    console.log(`📁 Results saved to: ${outputPath}`);

    // Display file stats
    try {
      const stats = fs.statSync(outputPath);
      console.log(`📊 File size: ${stats.size} bytes`);
      console.log(`⏱️  Last modified: ${stats.mtime}`);
    } catch (error) {
      console.error("❌ Error reading file stats:", error);
    }
  });

  try {
    await scraper.run({
      query: "Software Engineer",
      options: {
        locations: ["San Francisco Bay Area"], // More specific location
        optimize: false,
        limit: 5, // Reduced limit for testing
        filters: {
          time: timeFilter.DAY, // Last 24 hours
          experience: [experienceLevelFilter.ENTRY_LEVEL],
        },
        skipPromotedJobs: true,
      },
    });
  } catch (error) {
    console.error("❌ Scraping failed:", error);
  } finally {
    await scraper.close();
  }
})();
