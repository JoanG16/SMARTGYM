
import { getConnection } from '../db.js';

export const ping = async (req, res)=> {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT 1+1 AS result')
    res.json(result)
}