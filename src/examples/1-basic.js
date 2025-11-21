const {
  LinkedinScraper,
  events,
  ETimeFilterOptions,
  EExperienceLevelOptions,
} = require("../../build/index");

(async () => {
  const scraper = new LinkedinScraper({
    headless: true,
    slowMo: 20,
    args: [
      "--remote-debugging-address=0.0.0.0",
      "--remote-debugging-port=9222",
    ],
  });

  scraper.on(events.scraper.data, (data) => {
    console.log(data.description.length, data.title, data.industries);
  });

  scraper.on(events.scraper.error, (error) => {
    console.error(error);
  });

  await Promise.all([
    scraper.run(
      [
        {
          query: "Associate Product Manager",
          options: {
            locations: ["USA"],
            optimize: false,
            limit: 300,
          },
        },
      ],
      {
        optimize: false,
        limit: 300,
      }
    ),

    scraper.run({
      query: "Business Analyst",
      options: {
        locations: ["USA"],
        filters: {
          experience: EExperienceLevelOptions.DIRECTOR,
        },
        optimize: false,
        limit: 300,
      },
    }),
  ]);

  await scraper.close();
})();
