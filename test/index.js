const test = require('tape');
const m = require('../');

test('It is a function', t => {
  t.plan(1);
  t.equal(typeof m, 'function');
});

test('Can render text', t => {
  t.plan(1);
  var target = document.createElement('div');
  document.body.appendChild(target);

  m.render(target, 'Hello World');
  t.equal(document.body.textContent, 'Hello World');
  document.body.innerHTML = '';
});

test('Can render numbers', t => {
  t.plan(1);
  var target = document.createElement('div');
  document.body.appendChild(target);
  m.render(target, 10000000);
  t.equal(document.body.textContent, '10000000');
  document.body.innerHTML = '';
});

test('Can render an array of strings', t => {
  t.plan(1);
  var target = document.createElement('div');
  document.body.appendChild(target);
  m.render(target, ['String One ', 'String Two ', 'String Three']);
  t.equal(document.body.textContent, 'String One String Two String Three');
  document.body.innerHTML = '';
});

test('Can render a nested array of strings', t => {
  t.plan(1);
  var target = document.createElement('div');
  document.body.appendChild(target);
  m.render(target, ['String One ', ['String Two ', 'String Three']]);
  t.equal(document.body.textContent, 'String One String Two String Three');
  document.body.innerHTML = '';
});

test('Can render a div', t => {
  t.plan(1);
  var target = document.createElement('div');
  document.body.appendChild(target);
  m.render(target, m('div'));
  t.equal(document.body.innerHTML, '<div><div></div></div>');
  document.body.innerHTML = '';
});

test('Can render multiple elements', t => {
  t.plan(1);
  var target = document.createElement('div');
  document.body.appendChild(target);
  m.render(target, [m('div'), m('span'), m('p')]);
  t.equal(document.body.innerHTML, '<div><div></div><span></span><p></p></div>');
  document.body.innerHTML = '';
});

test('Can render elements with attributes and no children', t => {
  t.plan(1);
  m.render(document.body, m('div', { class: 'foo' }));
  t.equal(document.body.innerHTML, '<div class="foo"></div>');
  document.body.innerHTML = '';
});

test('Can render elements with children and no attributes', t => {
  t.plan(1);
  m.render(document.body, m('div', m('section')));
  t.equal(document.body.innerHTML, '<div><section></section></div>');
  document.body.innerHTML = '';
});

test('Can render elements with children that have attributes', t => {
  t.plan(1);
  m.render(document.body, m('div', {class: 'foo'}, m('button', {title: 'bar'})));
  t.equal(document.body.innerHTML, '<div class="foo"><button title="bar"></button></div>');
  document.body.innerHTML = '';
});

test.skip('Can update text', t => {
  t.plan(2);
  var target = document.createElement('div');
  document.body.appendChild(target);
  m.render(target, 'Hello World');
  t.equal(document.body.textContent, 'Hello World');
  m.render(target, 'Hello Everybody');
  t.equal(document.body.textContent, 'Hello Everybody');
  document.body.innerHTML = '';
});

test('Can render components', t => {
  t.plan(1);

  function myComponent () {
    return {
      view: () => {
        return 'Hello world'
      }
    }
  }

  m.render(document.body, m(myComponent));
  t.equal(document.body.innerHTML, 'Hello world');
  document.body.innerHTML = '';
});

test('Can render a component with attributes', t => {
  t.plan(1);

  function myComponent () {
    return {
      view: (vnode) => {
        const attrs = vnode.attrs
        return m('h1', attrs.heading)
      }
    }
  }

  m.render(document.body, m(myComponent, { heading: 'Hello world' }));
  t.equal(document.body.innerHTML, '<h1>Hello world</h1>');
  document.body.innerHTML = '';
});

test('Can render a component with children', t => {
  t.plan(1);

  function myComponent () {
    return {
      view: (vnode) => {
        const children = vnode.children
        return m('h1', children)
      }
    }
  }

  m.render(document.body, m(myComponent, 'Hello world'));
  t.equal(document.body.innerHTML, '<h1>Hello world</h1>');
  document.body.innerHTML = '';
});

test('Can handle events', t => {
  t.plan(1);
  let clicked = false;

  m.render(document.body, m('button', {
    onclick: () => clicked = true
  }))

  document.body.querySelector('button').click()
  t.ok(clicked)
});

