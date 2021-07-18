/**
 * Title Load ENV
 * Description: Load required environment(return env file path)
 */
export function loadEnv() {
    let envPath: string;
    try {
        switch (process.env.NODE_ENV) {
            case undefined:
                envPath = 'environments/.env'
                break;
            case 'development':
                envPath = 'environments/.env'
                break;
            case 'production':
                envPath = 'environments/production.env'
                break;
            default:
                Error('Unrecognized Environment');
                break;
        }
        return envPath!;
    } catch (err) {
        Error('Error trying to run file');
    }
}

/**
 * Title Read essential environments
 * Description: This function read all the essential env required to start the server. In case of any error it will throw exception.
 */
export function readEnvEssentials() {
    if(!process.env.CLUSTERUSER) {
        console.error('Fatal error: cluster user is not defined');
        process.exit(1);
    }
    if(!process.env.CLUSTERPASS) {
        console.error('Fatal error: cluster password is not defined');
        process.exit(1);
    }
    if(!process.env.PORT) {
        console.error('Fatal error: port is not defined');
        process.exit(1);
    }
    if (!process.env.JWTPRIVATEKEY) {
        console.error('Fatal error: jwt private key is not defined');
        process.exit(1);
    }
    if(!process.env.HMACSHA256SECRETKEY) {
        console.error('Fatal error: hmac secret key is not defined');
        process.exit(1);
    }
}