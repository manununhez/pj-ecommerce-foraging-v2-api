module.exports = {
  apps : [{
  	name: 'pj-ecomm-v2',
        script: 'server-pj-ecomm.js',
        watch: true,
        env_production: {
            "NODE_ENV": "production",
        }
  }],
};
