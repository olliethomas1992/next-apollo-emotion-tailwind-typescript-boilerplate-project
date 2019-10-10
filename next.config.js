const withFonts = require('next-fonts'); // eslint-disable-line @typescript-eslint/no-var-requires
const withImages = require('next-images'); // eslint-disable-line @typescript-eslint/no-var-requires

/* Load in correct config.
---------------------------------------------------- */
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: './config/.env.development' });
} else {
    require('dotenv').config({ path: './config/.env.production' });
}

/* Config
---------------------------------------------------- */
module.exports = withFonts(
    withImages({
        /* WEBPACK CONFIGURATION
	---------------------------------------------------- */
        webpack(config, { buildId, dev, isServer, defaultLoaders }) {
            // Fixes npm packages that depend on `fs` module
            config.node = {
                fs: 'empty'
            };

            // Plugins
            // config.plugins.push(
            // );
            return config;
        },

        /* BUILD CONFIGURATION
	---------------------------------------------------- */
        env: {
            staticFolder: '/public',
            appUrl: process.env.APP_URL,
            graphQlUrl: process.env.GRAPHQL_URL,
            isProduction: process.env.NODE_ENV === 'production'
        },
        target: 'server'
    })
);
