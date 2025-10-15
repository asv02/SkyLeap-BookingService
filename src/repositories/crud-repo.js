const { where } = require("sequelize");
const { logger } = require("sequelize/lib/utils/logger");
const { ApiError } = require("../utils");
const { StatusCodes } = require("http-status-codes");

class CrudRepo {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const response = await this.model?.create(data);
      return response;
    } catch (error) {
      console.log("Error in repo->", error);
      // logger.error("Error in creating CrudRepo Model");
      throw error;
    }
  }

  async delete(data) {
    try {
      const response = await this.model.destroy({ where: { id: data } });
      return response;
    } catch (error) {
      logger.error("Error in deleting CrudRepo Model");
      throw error;
    }
  }

  async get(data) {
    try {
      const res = await this.model.findByPk(data);
      console.log("res in get->", res);
      return res;
    } catch (error) {
      // console.log('Error in REPO',error)
      logger.error("Error in getting by Primary key in CrudRepo Model");
    }
  }

  async getAll() {
    try {
      const res = await this.model.findAll();
      return res;
    } catch (error) {
      logger.error("Error in getting All in CrudRepo Model");
    }
  }
  async update(id, data) {
    try {
      const row = await this.model.findByPk(id);
      if (!row) {
        throw new ApiError(
          "Not found the data with given ID",
          StatusCodes.NOT_FOUND
        );
      }
      row.set(data);
      const response = await row.save();
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
    }
  }
}

module.exports = { CrudRepo };
