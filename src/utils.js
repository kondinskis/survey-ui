// helper that extracts fields from object using dot path
// example:
// get(path, object)
//  path -> "contacts.0.name"
const get = (p, o) => {
  const parsedPath = p.match(/[^.[\]]+/gm);
  return parsedPath.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);
};

const get_random = (items) => {
  return items[Math.floor(Math.random() * items.length)];
}

const colors = ["primary", "danger", "info", "success"];

export { get, get_random, colors };
