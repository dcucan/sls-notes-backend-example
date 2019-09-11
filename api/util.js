const getUserId = (headers) => {
    return headers.app_user_id;
}

const getUserName = (headers) => {
    return headers.app_user_name;
}

const getResponseHeaders = () => {
    return{
        'Acces-Control-Allow-Origin' : '*'
    }
}

module.exports = {
    getUserId,
    getUserName,
    getResponseHeaders
}