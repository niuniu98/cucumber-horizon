// import {Connection, ConnectionOptions, Query} from 'mysql2';
import {Connection, ConnectionConfig,Query} from "mysql";
const mysql = require('mysql2/promise');
import {browser} from "protractor";
import {getFileName} from "./util";
import {logConsole, logInfo} from "./logger";
const DBUsername: string = 'bolt';
const DBPassword: string = 'bolt';
const connectionConfig: ConnectionConfig = { host:browser.params.vm, user:DBUsername, password:DBPassword, port: 3306 };

const FILE_IDENTIFIER = getFileName(__filename);

/**
 * this is a db test function
 */
export async function dbTest(): Promise<void> {
    for(let i = 0; i < 4; i++){
        // await queryInTable('bolt_shard_'+i, 'user',{email:'email68091548047396620@domain.com'});
        // await updateTable('user',[{username:'testname'},{email: userEmail}]);
        // await deleteFromTable('bolt_shard_'+i,'user',[{email:'email880191557823108600@domain.com'}]);
        // if (i === 1) await addIntoTable('bolt_shard_'+i,'user','');
        await queryByFilter(undefined,'bolt_shard_'+i,'user',['email="email68091548047396620@domain.com"']);
    }
}

/**
 * get mysql connection
 * @param host
 * @param database
 */
export async function getConnection(host = browser.params.vm, database?: string): Promise<Connection>{
    connectionConfig.host = host;
    if(database){
        connectionConfig.database = database;
    }
    return mysql.createConnection(connectionConfig);
}

// async function addIntoTable(database: string, table: string, values: any): Promise<number>{
//     return add(undefined, database, table, values);
// }
//
// async function add(vm = browser.params.vm, database: string, table: string, values: any): Promise<number> {
//     const connection: Connection = await getConnection(vm,database);
//     // values = [{id:90, email:'testtesttesttest@domain.com', username:'testtesttesttest', status:"ACTIVE",state_detail:"ACTIVE__USER__ACTIVATED",
//     //     registered:1,creation_date:'2008-7-04',modification_date:'2008-7-04',daas_entity_id:"",daas_primary_key:1,daas_shard_key:1,
//     //     daas_shard_hash:1, daas_uuid:"",daas_content_type:"",daas_content_encoding:"",daas_content_compression:"", daas_content_checksum:1
//     //     ,daas_content_md5_hex:"", daas_content:"",daas_creation_date:'2008-7-04',daas_modification_date:'2008-7-04',daas_version:1}];
//     const sql: string = 'INSERT INTO '+ table + ' SET ?';
//     const query: Query = await connection.query(sql,values);
//     logInfo(FILE_IDENTIFIER,query);
//     // @ts-ignore
//     return query[0].affectRows;
// }
//
// async function deleteFromTable(database: string, table: string, values: any): Promise<number>{
//     return del(undefined, database, table, values);
// }
//
// async function del(vm = browser.params.vm, database: string, table: string, values: any): Promise<number> {
//     // values = [{email:'email880191557823108600@domain.com'}];
//     const connection: Connection = await getConnection(vm, database);
//     const sql = 'DELETE FROM '+ table +' WHERE ?';
//     const query: Query = await connection.execute(sql, values);
//     logInfo(FILE_IDENTIFIER,query);
//     // @ts-ignore
//     return query[0].affectedRows;
// }

/**
 * update data on preset vm
 * @param database
 * @param table
 * @param values
 */
export async function updateTable(database: string, table: string, values: any): Promise<number>{
    return update(undefined, database, table, values);
}

/**
 * basic update database method
 * @param vm
 * @param database
 * @param table
 * @param values
 */
export async function update(vm = browser.params.vm, database: string, table: string, values: any): Promise<number> {
    const connection: Connection = await getConnection(vm, database);
    const sql = 'UPDATE '+ table +' SET ? WHERE ?';
    const query: Query = await connection.query(sql, values);
    logConsole(FILE_IDENTIFIER,'update in ' + database + ', sql: ' + sql);
    // @ts-ignore
    return query[0].affectedRows;
}

/**
 * query on preset vm
 * @param database
 * @param table
 * @param values
 */
export async function queryInTable(database: string, table: string, values: any): Promise<any[]>{
    return query(undefined, database, table, values);
}

/**
 * basic query method
 * @param vm
 * @param database
 * @param table
 * @param values
 */
export async function query(vm = browser.params.vm, database: string, table: string, values: any): Promise<any[]> {
    const connection: Connection = await getConnection(vm, database);
    // values = {email:"email68091548047396620@domain.com"};
    const sqlStr = 'SELECT * FROM ' + table + ' WHERE ?';
    const query: Query = await connection.query(sqlStr,values);
    logConsole(FILE_IDENTIFIER,'query in ' + database + ', sql is ' + sqlStr);
    // @ts-ignore
    return query[0];
}

/**
 * query by filter
 * @param vm
 * @param database
 * @param table
 * @param filters
 */
export async function queryByFilter(vm = browser.params.vm, database: string, table: string, filters: string[]): Promise<any[]>{
    const connection: Connection = await getConnection(vm, database);
    const filterLength = filters.length;
    // assemble sql string
    let sqlStr = 'SELECT *';
    sqlStr = sqlStr + ' FROM ' + table + ' WHERE ';
    for(let filter = 0; filter < filterLength; filter++){
        sqlStr = sqlStr + filters[0];
        if(filter < filterLength - 1) sqlStr = sqlStr + ' AND ';
    }
    logConsole(FILE_IDENTIFIER,'query by filter in ' + database + ', sql is '+sqlStr);
    const query: Query = await connection.query(sqlStr);
    // @ts-ignore
    return query[0];
}
