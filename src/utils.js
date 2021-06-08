// helper that extracts fields from object using dot path
// example:
// get(path, object)
//  path -> "contacts.0.name"
const get = (p, o) => {
  const parsedPath = p.match(/[^.[\]]+/gm);
  return parsedPath.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);
};

export { get };
