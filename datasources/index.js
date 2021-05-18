const { RESTDataSource } = require("apollo-datasource-rest");

class DataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.REST_API_ENDPOINT;
  }

  async fetchData(type = "food") {
    console.log("fetchData  invoked!");
    const response = await this.get(type);
    // console.log(response, Array.isArray(response));
    return Array.isArray(response)
      ? response.map((data) => {
          let results = [];
          switch (type) {
            case "category":
              results = this.categoryReducer(data);
              break;
            default:
              results = this.foodReducer(data);
              break;
          }
          return results;
        })
      : [];
  }

  async getEmployeeById({ foodId }) {
    const response = await this.get("food", {
      foodId: foodId
    });
    return this.foodReducer(response[0]);
  }

  categoryReducer(data) {
    // console.log("data reducer datasource ", { data });
    return {
      categoryId: data.categoryId || 0,
      name: data.name,
      parentId: data.parentId
    };
  }

  foodReducer(data) {
    // console.log("data reducer datasource ", { data });
    return {
      foodId: data.foodId || 0,
      name: data.name,
      discount: data.discount,
      price: data.price,
      foodType: data.foodType,
      categoryId: data.categoryId,
      parentId: data.parentId
    };
  }

  foodAddReducer(data) {
    // console.log("data add reducer datasource ", { data });

    return {
      foodId: data.foodId || 0,
      name: data.name,
      message: data.message
    };
  }

  async addFood({ name, price, discount, foodType }) {
    console.clear();
    console.log({ name, price, discount, foodType });
    const response = await this.post("food/add", {
      name,
      price,
      discount,
      foodType
    });
    console.log("response =>>> ", response);
    return this.foodAddReducer(response);
  }

  foodUpdateReducer(data) {
    // console.log("data update reducer datasource ", { data });
    return {
      foodId: data.foodId || 0,
      name: data.name,
      message: data.message
    };
  }

  async updateFood({ foodId, name, discount, price, foodType }) {
    console.log({ foodId, name });
    const response = await this.post("food/update", {
      foodId,
      name,
      discount,
      price,
      foodType
    });
    // console.log('response =>>> ', response)
    return this.foodUpdateReducer(response);
  }

  async deleteEmployee({ foodId }) {
    console.log({ foodId });
    const response = await this.post("food/delete", { foodId });
    // console.log("response =>>> ", response);
    return response;
  }
}

module.exports = DataSource;
