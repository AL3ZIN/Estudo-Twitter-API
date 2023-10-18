import * as puppeteer from "puppeteer";
import { Feedback } from "./models/feedback";

const nomeUsuario =
  'div[class="x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh xsag5q8 xz9dl7a x1uhb9sk x1plvlek xryxfnj x1c4vz4f x2lah0s x1q0g3np xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"] span[class="_aacl _aaco _aacw _aacx _aad7 _aade"]';
const comentarios =
  'div[class="x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh x1uhb9sk x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1cy8zhl x1oa3qoh x1nhvcw1"] span';
const buttonAvançar = 'button[class="_abl-"] svg[aria-label="Avançar"]';
const buttonVoltar = 'button[class="_abl-"] svg[aria-label="Voltar"]';
let listaFeedback: Array<Feedback> = []; // Inicialize a listaFeedback como um array vazio.

async function iniciar(url: string) {
  function delay(time: number) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  async function getComentarios(page: puppeteer.Page, selector: string) {
    console.log("entrou");
    const comentarios = await page.$$eval(selector, (spans) =>
      spans.map((span) => span.innerHTML)
    );
    return comentarios;
  }

  async function proximo(page: puppeteer.Page, selector: string) {
    const buttonNextSelector = await page.$(selector);
    if(buttonNextSelector) {
      console.log("proximo");
      await page.click(buttonAvançar);
      proximo(page, selector)
    }

  }

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  await page.waitForSelector("[name=username]");

  await page.screenshot({ path: "teste.png" });
  await page.type("[name=username]", "alezin_martins");
  await page.type("[name=password]", "aa161103");
  await page.click("[type=submit]");

  await page.waitForNavigation();

  await page.goto("https://www.instagram.com/alezin_martins/");
  await page.waitForSelector('div[class="_ac7v  _al3n"] a');
  await page.click('div[class="_ac7v  _al3n"] a');
  await page.waitForSelector(buttonAvançar);

  proximo(page, buttonAvançar);

  //   await page.waitForSelector("._a9z6 ._abl-")

  //   await carregarMaisComentarios(page, "._a9z6 ._abl-");
  //   await page.waitForSelector(nomeUsuario);

    let listaComentarios: string[] = await getComentarios(page, comentarios);
    let listaUsuarios: string[] = await getComentarios(page, nomeUsuario);

    page.click(buttonVoltar);


    for (let i = 0; i < listaComentarios.length; i++) {
      const feedback = {
        usuario: listaUsuarios[i],
        comentario: listaComentarios[i],
      };
      listaFeedback.push(feedback);
    }

    console.log(listaFeedback);
}

iniciar("https://www.instagram.com/");
