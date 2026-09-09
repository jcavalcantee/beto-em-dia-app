module "cognito" {
  source = "./modules/cognito"

  user_pool_name  = "beto-em-dia-user-pool"
  app_client_name = "beto-em-dia-app-client"
}