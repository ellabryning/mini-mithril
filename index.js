function mithril (tagName, ...children) {
  let attrs;
  if (children.length && 
    typeof children[0] === 'object' && 
    !Array.isArray(children[0]) &&
    !('tagName' in children[0])) {
    attrs = children.shift()
  }
  return {tagName, attrs, children}
};

mithril.render = (target, view) => {
  let element;
  if (typeof view === 'string') {
    element = document.createTextNode(view)
  }
  if (typeof view === 'number') {
    element = document.createTextNode(String(view))
  }
  if (Array.isArray(view)) {
    element = document.createDocumentFragment()
    view.forEach((subView) => {
      mithril.render(element, subView)
    })
  } else if (typeof view === 'object') {
    if (typeof view.tagName === 'function') {
      const vnode = { attrs: view.attrs, children: view.children };
      mithril.render(target, view.tagName().view(vnode))
      return
    } 
    element = document.createElement(view.tagName)
    mithril.render(element, view.children)
    if (view.attrs) {
      Object.keys(view.attrs).forEach((key) => {
        if (key in element) {
          element[key] = view.attrs[key]
        } else {
          element.setAttribute(key, view.attrs[key])
        }
      })
    }
  }
  target.appendChild(element)
}

module.exports = mithril