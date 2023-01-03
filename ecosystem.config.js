module.exports = {
  apps: [
    {
      name: "vender-client",
      cwd: "./",
      script: "server.js",
      exec_mode: "cluster",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      instances: 0,
      instance_var: "INSTANCE_ID",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
