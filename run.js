const chrome = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

(async () => {
  const browser = await puppeteer.launch(
    process.env.AWS_EXECUTION_ENV
      ? {
          args: chrome.args,
          executablePath: await chrome.executablePath,
          headless: chrome.headless,
        }
      : {
          args: [],
          executablePath:
            "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        }
  );

  const page = await browser.newPage({
    viewport: {
      width: 1200,
      height: 720,
    },
  });
  const url = "https://loco.gg";
  await page.goto(url);
  let data = await page.screenshot({
    type: "png",
  });
  await browser.close();
  res.setHeader(
    "Cache-Control",
    "s-maxage=31536000, max-age=31536000, stale-while-revalidate"
  );
  res.setHeader("Content-Type", "image/png");
  res.end(data);
})();
