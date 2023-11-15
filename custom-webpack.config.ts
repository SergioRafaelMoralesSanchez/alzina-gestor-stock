import { EnvironmentPlugin } from 'webpack';

module.exports = {
    plugins: [
        new EnvironmentPlugin(["apiKeyAlzina"])
    ]
};