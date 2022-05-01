const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/api/Sections",
      "/api/Ingredients",
      "/api/RecipeIngredients",
      "/api/RecipeSteps",
      "/api/Recipes"
    ],
    target: "https://localhost:7049",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
