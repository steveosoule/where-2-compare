module.exports = {
    devServer: {
        proxy: {
            '^/api/*': {
                target: 'http://localhost:8080/'
                /* bypass: function() {
                    let inLocalEnv = process.env.NODE_ENV !== 'local'
                    return !inLocalEnv;
                } */
            }
        }
    }
}