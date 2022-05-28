import Nano from 'nano-jsx'
import { Helmet } from 'nano-jsx'
import { setup } from 'twind'
import { virtualSheet, getStyleTag, shim } from 'twind/shim/server'
import typography from '@twind/typography'

const sheet = virtualSheet()

setup({ 
  // preflight: false, // do not include base style reset (default: use tailwind preflight)
  // mode: strict, // throw errors for invalid rules (default: warn)
  // hash: true, // hash all generated class names (default: false)
  // theme: {}, // define custom theme values (default: tailwind theme)
  // darkMode: 'class', // use a different dark mode strategy (default: 'media')
  plugins: { ...typography() },
  sheet 
})

export const render = (component: any) => {
  sheet.reset()
  const app =  shim(Nano.renderSSR(component))
  const { body, head, footer, attributes } = Helmet.SSR(app)
  const styleTag = getStyleTag(sheet)
  const html = `
<!DOCTYPE html>
<html ${attributes.html.toString()}>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${head.join('\n')}
    ${styleTag}
  </head>
  <body ${attributes.body.toString()}>
    ${body}
    ${footer.join('\n')}
  </body>
</html>`
  return html
}
