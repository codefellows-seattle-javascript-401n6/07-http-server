// npm install --save-dev superagent, cheerio
const superagent = require('superagent');
const cheerio = require('cheerio');

describe('GET /', () => {
    it('can fetch instructions', async () => {
        const response = await superagent.get('http://localhost:3000/');
        const $expected = cheerio.load(getRootContent());
        const $actual = cheerio.load(response.text);
        expect($expected.toString()).toEqual($actual.toString());
    });
});

describe('GET /cowsay?text=message', () => {
    it('can fetch with no query string', async () => {
        const response = await superagent.get('http://localhost:3000/cowsay');
        const $expected = cheerio.load(getCowsayNoMessage());
        const $actual = cheerio.load(response.text);
        expect($expected.toString()).toEqual($actual.toString());
    });

    it('should update the pre', async () => {
        const response = await superagent.get('http://localhost:3000/cowsay?text=hola');
        const expected = `< hola >`;
        const $actual = cheerio.load(response.text);
        const actual = parseContent($actual('pre').text());
        expect(expected).toEqual(actual);
    });
});

describe('PUT /cowsay', () => {
    it('should update pre with POST', async () => {
        const response = await superagent.post('http://localhost:3000/api/cowsay', {text:'adios'});
        const expected = `< adios >`;
        const actual = parseContent(JSON.parse(response.text).content);
        expect(actual).toEqual(expected);
    });
});



// helper functions

function parseContent(cowContent) {
    return cowContent.split(/-{3,}/)[0].split(/_{3,}/)[1].trim();
}

function getRootContent() {
    return `
  <head>
    <title>Cowsay</title>
  </head>
  <body>
    <header>
      <nav>
        <ul>
          <li><a href="/cowsay">Cowsay</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <section>
        <h1>Project Description</h1>
        <p>This project is an exercise in building a Vanilla JavaScript server and RESTful API's with the fun NPM Cowsay package.</p>
      <section>
    </mail>
  </body>
    `;
}

function getCowsayNoMessage() {
    return `
    <head>
    <title>Cowsay</title>
  </head>
  <body>
    <header>
      <nav>
        <ul>
          <li><a href="/cowsay">Cowsay</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <section>
        <p>Cowsay:</p>
        <pre> _______________________________
< I need something good to say! >
-------------------------------
      \   ^__^
       \  (oo)\_______
          (__)\       )\/\
              ||----w |
              ||     ||</pre>
      </section>
      <section>
        <h1>Project Description</h1>
        <p>This project is an exercise in building a Vanilla JavaScript server and RESTful API's with the fun NPM Cowsay package.</p>
      <section>
    </mail>
  </body>
  
    `;
}