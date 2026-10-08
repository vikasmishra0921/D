import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
const output = path.resolve('qa-artifacts');
fs.mkdirSync(output, { recursive: true });
const executablePath = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(p => fs.existsSync(p));
const browser = await chromium.launch({ executablePath, headless: true });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
const base = process.env.DEMO_URL || 'http://127.0.0.1:3000';
const report = { viewports: [], errors };
function assert(condition, message) { if (!condition) throw new Error(message); }
try {
  for (const width of [1440, 1280, 1024, 768, 430, 390]) {
    await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 650) { window.scrollTo(0,y); await new Promise(r => setTimeout(r,80)); } });
    await page.waitForTimeout(750);
    const result = await page.evaluate(() => ({
      width: innerWidth, documentWidth: document.documentElement.scrollWidth,
      sections: document.querySelectorAll('main section').length,
      brokenImages: [...document.images].filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src),
      missingAnchors: [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href')).filter(href => href.length > 1 && !document.getElementById(href.slice(1))),
    }));
    assert(result.documentWidth <= width, `Horizontal overflow at ${width}: ${result.documentWidth}`);
    assert(result.sections === 10, `Expected 10 sections, got ${result.sections}`);
    assert(result.brokenImages.length === 0, 'Broken images');
    assert(result.missingAnchors.length === 0, 'Missing section anchors');
    report.viewports.push(result);
    await page.evaluate(() => window.scrollTo({ top:0, behavior:'instant' }));
    await page.waitForTimeout(500);
    if (width === 1440 || width === 390) {
      await page.screenshot({ path:path.join(output,`${width}-full.png`), fullPage:true });
      await page.screenshot({ path:path.join(output,`${width}-hero.png`) });
    }
    if (width < 1200) {
      const toggle = page.getByRole('button', { name:'Open navigation', exact:true });
      await toggle.click();
      assert(await page.getByRole('button', { name:'Close navigation' }).getAttribute('aria-expanded') === 'true', 'Menu did not open');
      await page.keyboard.press('Escape');
      assert(await toggle.getAttribute('aria-expanded') === 'false', 'Escape did not close menu');
      await toggle.click();
      await page.getByRole('navigation', { name:'Mobile navigation', exact:true }).getByRole('link', { name:/Events/ }).click();
      assert(await toggle.getAttribute('aria-expanded') === 'false', 'Menu link did not close menu');
    }
  }
  assert(await page.locator('dialog,[role="dialog"]').count() === 0, 'Unexpected modal dialog');
  await page.getByRole('link', { name:'Join Our Community', exact:true }).click();
  await page.waitForTimeout(900);
  assert(new URL(page.url()).hash === '#contact', 'Join link must reach inline contact information');
  assert(await page.locator('#contact').isVisible(), 'Inline contact information missing');
  assert(await page.locator('.language').getAttribute('aria-disabled') === 'true', 'Unavailable language must be explicit');
  assert(await page.locator('.event-action[aria-disabled="true"]').count() === 3, 'Unconfirmed events must not claim working destinations');
  await page.getByRole('link', { name:'Explore Resources', exact:true }).click();
  assert(new URL(page.url()).hash === '#resource-list', 'Resource navigation is broken');
  report.backgrounds = await page.evaluate(() => Object.fromEntries(['.philosophy-strip','.legacy','.community','.events','.values','.gallery','.resources'].map(selector => [selector,getComputedStyle(document.querySelector(selector)).backgroundColor])));
  await page.emulateMedia({ reducedMotion:'reduce' });
  report.reducedMotion = await page.locator('.visual-hero').evaluate(el => getComputedStyle(el).animationName);
  assert(report.reducedMotion === 'none', 'Reduced motion not respected');
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  report.status = 'passed';
  fs.writeFileSync(path.join(output,'report.json'), JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
} finally { await browser.close(); }
