module.exports = {
  apps : [{
  	name: 'pj-ecomm',
        script: './server-pj-ecomm.js',
        watch: true,
        env_production: {
            "PORT": 5002,
            "NODE_ENV": "production",
        }
  }],
};
