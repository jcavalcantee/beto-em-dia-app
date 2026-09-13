variable "api_name" {
  description = "Nome da HTTP API"
  type        = string
}

variable "cognito_user_pool_id" {
  description = "ID do Cognito User Pool usado para autenticar as requisições"
  type        = string
}

variable "cognito_user_pool_client_id" {
  description = "ID do App Client do Cognito User Pool"
  type        = string
}

variable "routes" {
  description = "Rotas expostas pela API, cada uma associada a uma Lambda"
  type = map(object({
    route_key            = string
    lambda_function_name = string
    lambda_invoke_arn    = string
  }))
}
