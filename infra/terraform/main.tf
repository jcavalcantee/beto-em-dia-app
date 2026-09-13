module "cognito" {
  source = "./modules/cognito"

  user_pool_name  = "beto-em-dia-user-pool"
  app_client_name = "beto-em-dia-app-client"
}

module "dynamodb" {
  source     = "./modules/dynamodb"
  table_name = "beto-em-dia"
}

module "lambda_create_profile" {
  source = "./modules/lambda"

  function_name = "beto-em-dia-create-profile"

  source_path = "${path.root}/../../backend/dist/lambda/create-profile/index.js"

  dynamodb_table_arn = module.dynamodb.table_arn

  environment_variables = {
    DYNAMODB_TABLE_NAME = module.dynamodb.table_name
  }
}

module "api_gateway" {
  source = "./modules/api_gateway"

  api_name                    = "beto-em-dia-api"
  cognito_user_pool_id        = module.cognito.user_pool_id
  cognito_user_pool_client_id = module.cognito.client_id

  routes = {
    create_profile = {
      route_key            = "POST /profile"
      lambda_function_name = module.lambda_create_profile.function_name
      lambda_invoke_arn    = module.lambda_create_profile.invoke_arn
    }
  }
}