'use strict';
const fs = require('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
    let data = JSON.parse(fs.readFileSync('./data/employees.json')).map((el)=>{
      el.createdAt = new Date();
      el.updatedAt = new Date()
      return el
    })
    return queryInterface.bulkInsert('Employees',data)
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

   down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Employees', null, {});
  }
};
