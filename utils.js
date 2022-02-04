const puppeteer = require('puppeteer');
const { InlineKeyboard } = require('grammy');
const inline = () =>{
    const inline_key = new InlineKeyboard()
    .url("Source Code", "https://github.com/VegetaxD/WebSSBot")
    .url("Owner", "https://t.me/VegetaxD")
    return inline_key; }
const webss = async (link, user) => {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto(link);
    await page.screenshot({path: `${user}.png`});
    await browser.close();
    return `${user}.png`;
  }

module.exports = { webss, inline };