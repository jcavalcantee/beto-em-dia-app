resource "aws_cognito_user_pool" "this" {
    name = var.user_pool_name

    username_attributes = ["email"]

    auto_verified_attributes = ["email"]

    password_policy {
        minimum_length    = 8
        require_lowercase = true
        require_uppercase = true
        require_numbers   = true
        require_symbols   = false
    }

    account_recovery_setting {
        recovery_mechanism {
            name     = "verified_email"
            priority = 1
        }
    }
}

resource "aws_cognito_user_pool_client" "this" {
    name         = var.app_client_name
    user_pool_id = aws_cognito_user_pool.this.id

    generate_secret = false
}
