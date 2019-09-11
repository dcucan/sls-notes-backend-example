/**
 * Route: DELETE /note/t/{note_id}
 */

const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });

const _ = require('underscore');
const util = require('./util.js');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.NOTES_TABLE;

exports.handler = async (event) => {
    try {
        let note_id = decodeURIComponent(event.pathParameters.note_id);

        let params = {
            TableName: tableName,
            IndexName: "note_id-index",
            KeyConditionExpression: "note_id = :note_id",
            ExpressionAttributeValue: {
                ":note_id": note_id
            },
            Limit: 1
        };

        let data = await dynamoDB.query(params).promise();
        if (!_.isEmpty(data.Items)) {
            return {
                statusCode: 200,
                headers: util.getResponseHeaders(),
                body: JSON.stringify(data.Items)
            };
        } else {
            return {
                statusCode: 404,
                headers: util.getResponseHeaders()
            }
        }

        return {
            statusCode: 200,
            headers: util.getResponseHeaders(),
            body: JSON.stringify('')
        }
    } catch (err) {
        console.log("Error", err);
        return {
            statusCode: err.statusCode ? err.statusCode : 500,
            headers: util.getResponseHeaders(),
            body: JSON.stringify({
                error: err.name ? err.name : "Exception",
                message: err.message ? err.message : "Unknown error"
            })
        }
    }
}