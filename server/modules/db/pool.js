import mysql from 'promise-mysql';
import config from '@peerdatalab/config';

async function getMysqlPool() {
  return mysql.createPool(config.db);
}

export default {
  queryParam_None: async (...args) => {
    const query = args[0];
    let result;
    const pool = await getMysqlPool();

    try {
      var connection = await pool.getConnection();
      result = (await connection.query(query)) || null;
    } catch (err) {
      console.log(err);
      connection.rollback(() => {});
    } finally {
      pool.releaseConnection(connection);
      return result;
    }
  },
  queryParam_Arr: async (...args) => {
    const query = args[0];
    const value = args[1];
    const pool = await getMysqlPool();
    let result;

    try {
      var connection = await pool.getConnection();
      result = (await connection.query(query, value)) || null;
    } catch (err) {
      connection.rollback(() => {});
      next(err);
    } finally {
      pool.releaseConnection(connection);
      return result;
    }
  },
  queryParam_Parse: async (inputquery, inputvalue) => {
    const query = inputquery;
    const value = inputvalue;
    const pool = await getMysqlPool();
    let result;
    try {
      var connection = await pool.getConnection();
      result = (await connection.query(query, value)) || null;
    } catch (err) {
      console.log(err);
      connection.rollback(() => {});
      next(err);
    } finally {
      pool.releaseConnection(connection);
      return result;
    }
  },
  Transaction: async (...args) => {
    let result = 'Success';
    const pool = await getMysqlPool();

    try {
      var connection = await pool.getConnection();
      await connection.beginTransaction();
      await args[0](connection, ...args);
      await connection.commit();
    } catch (err) {
      await connection.rollback();
      console.log('mysql error! err log =>' + err);
      result = undefined;
    } finally {
      pool.releaseConnection(connection);
      return result;
    }
  },
};
