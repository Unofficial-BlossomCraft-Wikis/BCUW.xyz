const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

(async () => {
  // Array of URLs to screenshot
  const urls = [
    "https://v4.bcuw.xyz",
    "https://v3.bcuw.xyz",
    "http://unofficialblossomcraftwiki.wikidot.com",
    "https://v1.bcuw.xyz",
  ];

  // Define the directory where screenshots will be saved
  const saveDir = path.join(__dirname, "public", "sites");

  // Create the directory if it doesn't exist
  if (!fs.existsSync(saveDir)) {
    fs.mkdirSync(saveDir, { recursive: true });
  }

  // Launch a new browser instance
  const browser = await puppeteer.launch();

  // Dark and Light mode toggle configurations
  const modeConfig = {
    // Define selectors or cookies to toggle dark/light mode for each site
    sites: {
      "https://v4.bcuw.xyz": {
        light: {
          script: 'document.documentElement.setAttribute("data-theme", "light");document.body.setAttribute("data-theme", "light");', // Ensure light mode is on
        },
        dark: {
          script: 'document.documentElement.setAttribute("data-theme", "dark");document.body.setAttribute("data-theme", "dark");', // Enable dark mode
        },
      },
      "https://v3.bcuw.xyz": {
        light: {
          script: 'document.documentElement.setAttribute("data-theme", "light");', // Ensure light mode is on
        },
        dark: {
          script: 'document.documentElement.setAttribute("data-theme", "dark");', // Enable dark mode
        },
      },
      "http://unofficialblossomcraftwiki.wikidot.com": {
        light: {
          cookie: {
            name: "darkMode",
            value: "disabled",
            domain: "wikidot.com",
            path: "/",
          },
        },
        dark: {
          cookie: {
            name: "darkMode",
            value: "enabled",
            domain: "wikidot.com",
            path: "/",
          },
        },
      },
      "https://v1.bcuw.xyz": {
        light: {
          script: 'document.documentElement.setAttribute("data-theme", "light");', // Ensure light mode is on
        },
        dark: {
          script: 'document.documentElement.setAttribute("data-theme", "dark");', // Enable dark mode
        },
      },
    },
  };

  for (const url of urls) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    // Go to the current URL
    await page.goto(url, { waitUntil: "networkidle2" });

    // Generate a valid filename by extracting the domain
    const baseFilename = url.replace(/^https?:\/\//, "").replace(/\//g, "_");

    // Check if there's a light mode configuration for the current site
    if (modeConfig.sites[url]) {
      const lightConfig = modeConfig.sites[url].light;

      // If a cookie is provided for light mode, set it
      if (lightConfig.cookie) {
        await page.setCookie(lightConfig.cookie);
      }

      // If a script is provided for light mode, execute it
      if (lightConfig.script) {
        await page.evaluate(lightConfig.script);
      }

      // Take a screenshot in light mode
      const lightModeFilePath = path.join(saveDir, `light.${baseFilename}.png`);
      await page.screenshot({ path: lightModeFilePath });
      console.log(`Light mode screenshot saved: ${lightModeFilePath}`);

      // Now switch to dark mode
      const darkConfig = modeConfig.sites[url].dark;

      // If a cookie is provided for dark mode, set it
      if (darkConfig.cookie) {
        await page.setCookie(darkConfig.cookie);
      }

      // If a script is provided for dark mode, execute it
      if (darkConfig.script) {
        await page.evaluate(darkConfig.script);
      }

      // Take a screenshot in dark mode
      const darkModeFilePath = path.join(saveDir, `dark.${baseFilename}.png`);
      await page.screenshot({ path: darkModeFilePath });
      console.log(`Dark mode screenshot saved: ${darkModeFilePath}`);
    }

    // Close the current page
    await page.close();
  }

  // Close the browser after all screenshots are taken
  await browser.close();
})();
