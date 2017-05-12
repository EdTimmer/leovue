import escape from 'escape-html'
import axios from 'axios'

function loadDoc (filename) {
  var p = new Promise((resolve, reject) => {
    axios.get(filename)
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        console.log(error)
        reject()
      })
  })
  return p
}
function cleanText(data, startId){
  data.name = data.name.replace(/<</g, '\u00AB')
  data.name = data.name.replace(/>>/g, '\u00BB')
  data.name = escape(data.name)
  data.id = data.id + ''; // probably unneeded now
  let children = data.children;
  if (!children) { return }
  for (let i = 0; i < children.length; i++){
    cleanText(children[i], startId)
  }
  data.t = data.t.replace(/^.*?_/,'')
  if (startId) {
    data.t = startId + '-' + data.t + ''
  }
}
function getLeoJSON (filename, id) {
  if (filename.indexOf('#') > 0) {
    filename = filename.substring(0, filename.indexOf('#'))
  }
  var p = new Promise((resolve, reject) => {
    if (!filename.match(/static/)) {
      filename = '/static/' + filename
    }
    if (!filename.match(/\.leo$/)) {
      filename = filename + '.leo'
    }
    loadDoc(filename, 'Text')
      .then(xmlString => {
        resolve(transformLeoXML(xmlString, id))
      })
  })
  return p
}
function transformLeoXML (xmlString, startId) {
    const oParser = new DOMParser()
    const xml = oParser.parseFromString(xmlString, 'text/xml')
    const tnodes = xml.getElementsByTagName('t')
    let textItems = {}
    for (let i = 0; i < tnodes.length; i++){
      let el = tnodes[i]
      let elText = el.textContent
      let a = el.getAttribute('tx')
      a = a.replace(/\./g,'_')
      a = a.replace(/^.*?_/,'')
      if (startId) {
        a = startId + '-' + a
      }
      if (
         (/^@language /.test(elText)) &&
         (!/^@language html/.test(elText)) &&
         (!/^@language md/.test(elText))
      ){
        // elText = escape(elText)
      }
      textItems[a] = elText
      // h
    }
    const vnodes = xml.getElementsByTagName('v')
    let pid
    for (let i = 0; i < vnodes.length; i++) {
      pid = i + 1
      if (startId) {
        pid = startId + '-' + pid
      }
      vnodes[i].setAttribute('id', '"' +pid + '"')
    }
    var scripts = document.getElementsByTagName('script'),
        str     = '',
        i       = 0,
        il      = scripts.length;
    for (; i<il; i++) {
      if (scripts[i].type === 'leo/xsl-template') str += scripts[i].innerHTML;
    }
    const xsl = oParser.parseFromString(str, 'text/xml')
    const xsltProcessor = new XSLTProcessor()
    xsltProcessor.importStylesheet(xsl)
    const resultDocument = xsltProcessor.transformToFragment(xml, document)
    let data = resultDocument.textContent
    data = data.replace(/,\s?$/, '') // kludge to get rid of trailing comma
    data = JSON.parse(data)
    cleanText(data, startId)
    const xdata = {}
    xdata.data = data
    xdata.textItems = textItems
    return xdata
}

export {getLeoJSON, transformLeoXML}
