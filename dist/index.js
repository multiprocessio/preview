function unsafePreviewArray(obj, nKeys, nextNKeys, prefixChar, joinChar) {
  const keys = obj.slice(0, nKeys);
  const childPreview = keys.map(
    (o) => prefixChar + unsafePreview(o, nextNKeys)
  );
  if (obj.length > nKeys) {
    childPreview.push(prefixChar + '...');
  }
  return ['[', childPreview.join(',' + joinChar), ']'].join(joinChar);
}
function unsafePreviewObject(obj, nKeys, nextNKeys, prefixChar, joinChar) {
  const keys = Object.keys(obj);
  keys.sort();
  const firstKeys = keys.slice(0, nKeys);
  const preview2 = [];
  firstKeys.forEach((k) => {
    const formattedKey = `"${k.replaceAll('"', '\\"')}"`;
    preview2.push(
      prefixChar + formattedKey + ': ' + unsafePreview(obj[k], nextNKeys)
    );
  });
  if (keys.length > nKeys) {
    preview2.push(prefixChar + '...');
  }
  return ['{', preview2.join(',' + joinChar), '}'].join(joinChar);
}
function unsafePreview(obj, nKeys, topLevel = false) {
  if (!obj) {
    return String(obj);
  }
  const nextNKeys = nKeys < 1 ? 0 : Math.floor(nKeys * 0.6);
  const joinChar = topLevel ? '\n' : ' ';
  const prefixChar = topLevel ? '  ' : '';
  if (Array.isArray(obj)) {
    return unsafePreviewArray(obj, nKeys, nextNKeys, prefixChar, joinChar);
  }
  if (typeof obj === 'object') {
    return unsafePreviewObject(obj, nKeys, nextNKeys, prefixChar, joinChar);
  }
  let stringMax = 200;
  if (typeof obj === 'string' && topLevel) {
    stringMax = 5e3;
  }
  let res = String(obj).slice(0, stringMax);
  if (String(obj).length > stringMax) {
    res += '...';
  }
  if (typeof obj === 'string' && !topLevel) {
    return `"${res.replaceAll('"', '\\"')}"`;
  }
  return res;
}
export function preview(obj, nKeys = 20) {
  try {
    return unsafePreview(obj, nKeys, true);
  } catch (e) {
    console.error(e);
    return String(obj).slice(0, 200);
  }
}
//# sourceMappingURL=index.js.map
