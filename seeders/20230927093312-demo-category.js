'use strict';
const fs = require('fs')
// let categories = require('../data/categories.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // console.log(categories, ">>>>");
    let data = JSON.parse(fs.readFileSync('./data/categories.json')).map((el)=>{
      el.createdAt = new Date();
      el.updatedAt = new Date()
      return el
    })
    return queryInterface.bulkInsert('Categories',data);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
