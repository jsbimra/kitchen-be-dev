const { gql } = require("apollo-server");

const typeDefs = gql`
  # Your schema will go here
  type Food {
    foodId: ID!
    name: String!
    price: String!
    discount: String!
    foodType: String
    categoryId: ID
    parentId: ID
  }

  type Category {
    categoryId: ID!
    name: String!
    parentId: ID
  }

  type AddFoodReturn {
    foodId: ID!
    name: String
  }

  # Input type for add new employee
  input AddFood {
    name: String!
    price: String!
    discount: String!
    foodType: String
  }

  input UpdateFood {
    foodId: ID!
    name: String!
    discount: String!
    price: String!
    foodType: String
  }

  # Input type for delete employee
  input DeleteFood {
    foodId: ID!
  }

  type DeleteFoodReturn {
    message: String
  }

  type Query {
    food: [Food]!
    foodById(foodId: ID!): Food
    category: [Category]!
  }

  type Mutation {
    updateFood(employee: UpdateFood!): AddFoodReturn
    addFood(employee: AddFood!): AddFoodReturn!
    deleteFood(employee: DeleteFood!): DeleteFoodReturn!
  }
`;

module.exports = typeDefs;
