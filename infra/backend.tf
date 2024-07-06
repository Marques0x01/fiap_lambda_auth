terraform {
  backend "s3" {
    bucket         = "backend-fiap"
    key            = "lambda-auth/terraform.tfstate"
    region         = "us-east-2"
    
  }
}
