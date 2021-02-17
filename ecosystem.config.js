module.exports = {
  apps : [{
  	name: 'pj-ecomm',
        script: 'server-pj-ecomm.js',
        watch: true,
        env_production: {
            "NODE_ENV": "production",
        }
  }],
};
