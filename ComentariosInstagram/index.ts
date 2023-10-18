import * as puppeteer from "puppeteer";

async function iniciar(url: string) {
  function delay(time: number) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }
  async function carregarMaisComentarios(
    page: puppeteer.Page,
    selector: string
  ) {
    const buttonMore = await page.$(selector);
    if (buttonMore) {
      console.log("more");
      await buttonMore.click();
      await page.waitForSelector(selector, { timeout: 3000 });
      await carregarMaisComentarios(page, selector);
    }
  }

  async function getComentarios(page: puppeteer.Page, selector: string) {
    console.log("entrou");
    const comentarios = await page.$$eval(selector, (spans) =>
      spans.map((span) => span.innerHTML)
    );
    return comentarios;
  }

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  await delay(4000);

//   await carregarMaisComentarios(page, "._a9z6 ._abl-");
  console.log(await getComentarios(page, "._a9zs span"));
  console.log("acabou");
}

iniciar("https://www.instagram.com/p/CoGJyiOO1Qe/");
