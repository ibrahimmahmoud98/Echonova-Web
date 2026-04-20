const puppeteer = require('puppeteer');

(async () => {
    let initialPayload = 0;
    let initialVideosRequests = 0;
    let scrolledVideosRequests = 0;

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    let isScrolled = false;

    // Monitor Network
    page.on('response', async (response) => {
        try {
            const url = response.url();
            const headers = response.headers();
            const contentLength = parseInt(headers['content-length'] || '0', 10);
            const resourceType = response.request().resourceType();
            const contentType = headers['content-type'] || '';

            if (url.startsWith('data:')) return;

            if (!isScrolled) {
                initialPayload += contentLength;
                if (resourceType === 'media' || contentType.includes('video') || url.endsWith('.mp4')) {
                    initialVideosRequests++;
                }
            } else {
                 if (resourceType === 'media' || contentType.includes('video') || url.endsWith('.mp4')) {
                    scrolledVideosRequests++;
                }
            }
        } catch (e) {}
    });

    // Monitor CLS
    await page.evaluateOnNewDocument(() => {
        window.clsValue = 0;
        try {
            let clsObserver = new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    if (!entry.hadRecentInput) {
                        window.clsValue += entry.value;
                    }
                }
            });
            clsObserver.observe({ type: 'layout-shift', buffered: true });
        } catch (e) {}
    });

    console.log("Navigating to page...");
    await page.goto('http://localhost:3005', { waitUntil: 'networkidle0', timeout: 60000 });
    
    // Wait a bit for initial idle
    await new Promise(r => setTimeout(r, 3000));
    
    // Get CLS before scroll
    let clsBefore = await page.evaluate(() => window.clsValue);

    console.log(`Initial Payload: ${(initialPayload / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`Initial Video Requests: ${initialVideosRequests}`);
    console.log(`Initial CLS: ${clsBefore}`);

    // Scroll
    console.log("Scrolling down...");
    isScrolled = true;
    
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            let distance = 100;
            let timer = setInterval(() => {
                let scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                // Stop scrolling randomly near bottom or if max height
                if (totalHeight >= scrollHeight - window.innerHeight || totalHeight > 10000) {
                    clearInterval(timer);
                    resolve();
                }
            }, 50);
        });
    });

    // Wait for videos to load
    await new Promise(r => setTimeout(r, 5000));

    // Get final CLS
    let clsAfter = await page.evaluate(() => window.clsValue);

    console.log(`Scrolled Video Requests: ${scrolledVideosRequests}`);
    console.log(`Final CLS: ${clsAfter}`);

    console.log("--- JSON_REPORT_START ---");
    console.log(JSON.stringify({
        initialPayloadMB: parseFloat((initialPayload / (1024 * 1024)).toFixed(2)),
        initialVideosRequests,
        scrolledVideosRequests,
        cls: clsAfter
    }));
    console.log("--- JSON_REPORT_END ---");

    await browser.close();
})();
