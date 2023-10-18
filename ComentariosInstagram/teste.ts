import * as puppeteer from "puppeteer";
async function iniciar(url: string) {
  function delay(time: number) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
  await delay(4000);
  //   await carregarMaisComentarios(page, "._ae5q ._abl-");
  await page.screenshot({ path: "teste.png" });

  await page.evaluate(() => {
    const nodeList = document.querySelectorAll("._a9zs span");

    console.log(nodeList);
  });
}
iniciar("https://www.instagram.com/p/CoGJyiOO1Qe/");
