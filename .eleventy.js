module.exports = function(eleventyConfig) {
  // Pass through assets
  eleventyConfig.addPassthroughCopy("src/assets");

  // Collections
  eleventyConfig.addCollection("entries", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/entries/*.md").sort((a, b) => b.date - a.date);
  });

  // Filters
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });

  // Relative path filter
  eleventyConfig.addFilter("relative", function(url, page) {
    if (!url || url.startsWith('http') || url.startsWith('//')) {
      return url;
    }
    
    // Remove leading slash if it exists
    const target = url.startsWith('/') ? url.slice(1) : url;
    
    // Get the current page's path depth
    const pagePath = page.url.startsWith('/') ? page.url.slice(1) : page.url;
    const depth = (pagePath.match(/\//g) || []).length;
    
    // Create the prefix (e.g., "../../")
    const prefix = depth > 0 ? "../".repeat(depth) : "./";
    
    return prefix + target;
  });

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes"
    }
  };
};
