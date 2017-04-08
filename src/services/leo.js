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
function cleanText(data){
  data.name = data.name.replace(/<</g, '\u00AB');
  data.name = data.name.replace(/>>/g, '\u00BB');
  data.name = escape(data.name)
  let children = data.children;
  if (!children) { return }
  for (let i = 0; i < children.length; i++){
    cleanText(children[i])
  }
  data.t = data.t.replace(/^.*?_/,'')
}
// set all parent els to @sel = 1
function setSel(el){
  let parent = el.parentElement;
  if (parent){
    parent.setAttribute('sel', 1)
    setSel(parent)
  }
}
function getLeoJSON (filename, id) {
  var p = new Promise((resolve, reject) => {
    loadDoc('./static/' + filename + '.leo', 'Text')
      .then((xmlString) => {
        resolve(transformLeoXML(xmlString, id))
      })
  })
  return p
}
function transformLeoXML (xmlString, id) {
    if (! id){ id = 0}
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
      if (
         (/^@language /.test(elText)) &&
         (!/^@language html/.test(elText)) &&
         (!/^@language md/.test(elText))
      ){
        elText = escape(elText)
      }
      textItems[a] = elText
    }
    const vnodes = xml.getElementsByTagName('v')
    for (let i = 0; i < vnodes.length; i++) {
      vnodes[i].setAttribute('id', i)
      vnodes[i].setAttribute('sel', 0)
    }
    // see if there is a selected element (bookmarked node)
    // if so, mark it and its parent nodes
    let el = xml.getElementById(id)
    if (el) {
      el.setAttribute('sel', 2)
      setSel(el)
    }
    // const xsl = loadXMLDoc('./static/leo.xsl', 'XML')
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
    cleanText(data)
    const xdata = {}
    xdata.data = data
    xdata.textItems = textItems
    return xdata
}

export {getLeoJSON}
