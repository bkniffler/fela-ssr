import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-fela'
import fs from 'fs'
import { renderToMarkup } from 'fela-dom'
import App from './app'
import createRenderer from './renderer'

const build = async () => {
  const renderer = createRenderer()

  const indexHTML = fs.readFileSync(`${__dirname}/_index.html`).toString()
  const appHtml = renderToString(
    <Provider renderer={renderer}>
      <App />
    </Provider>
  )
  const appCSS = renderToMarkup(renderer)
  
  fs.writeFile('index.html', indexHTML.replace('<!-- {{app}} -->', appHtml).replace('<!-- {{css}} -->', appCSS), (err) => process.exit())
}

build();