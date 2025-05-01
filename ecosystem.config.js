module.exports = {
    apps : [{
      name: "next-app",
      script: "npm",
      args: "start",
      cwd: "/www/app",
      watch: true,
      env: {
        NODE_ENV: "production",
      }
    }]
  };