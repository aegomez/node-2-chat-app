const $ = function(query: string, context?: Element) {
  return (context || document).querySelector(query) as Element;
};
