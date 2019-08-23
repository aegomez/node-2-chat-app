const $ = function(query: string, context?: Element) {
  if (/^#\S+$/.test(query)) {
    return document.getElementById(query.replace('#', '')) as Element;
  }
  return (context || document).querySelector(query) as Element;
};
