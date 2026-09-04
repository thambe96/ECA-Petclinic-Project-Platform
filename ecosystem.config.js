module.exports = {
  apps: [
    {
      name   : "config-server",
      script : "java -jar ./config-server/target/config-server-1.0.0.jar",
      log_file: "./logs/config-server.log"
    },
    {
      name: "service-registry",
      script: "java -jar ./service-registry/target/service-registry-1.0.0.jar",
      log_file: "./logs/service-registry.log"
    },
    {
      name: "api-gateway",
      script: "java -jar ./api-gateway/target/api-gateway-1.0.0.jar",
      log_file: "./logs/api-gateway.log"
    }

  ]
}
