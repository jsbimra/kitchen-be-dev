module.exports = {
  Query: {
    // All three resolver functions assign their first positional argument (parent) to the variable _ as a convention to indicate that they don't use its value.
    // The launches and me functions assign their second positional argument (args) to __ for the same reason.
    // (The launch function does use the args argument, however, because our schema's launch field takes an id argument.)
    // All three resolver functions do use the third positional argument (context). Specifically, they destructure it to access the dataSources we defined.
    // None of the resolver functions includes the fourth positional argument (info), because they don't use it and there's no other need to include it.

    food: (_, __, { dataSources }) => {
      console.log({ food: dataSources.dsAPI.fetchData() });
      return dataSources.dsAPI.fetchData();
    },
    foodById: (_, { id }, { dataSources }) =>
      dataSources.dsAPI.getFoodById(id),
    category: (_, __, { dataSources }) => {
      console.log({ food: dataSources.dsAPI.fetchData() });
      return dataSources.dsAPI.fetchData("category");
  },
  },
  Mutation: {
    addFood: async (_, { data }, { dataSources }) =>
      dataSources.dsAPI.addFood(data),
    updateFood: async (_, { data }, { dataSources }) =>
      dataSources.dsAPI.updateFood(data),
    deleteFood: async (_, { data }, { dataSources }) =>
      dataSources.dsAPI.deleteFood(data)
  }
};
