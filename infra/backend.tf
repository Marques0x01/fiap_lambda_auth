terraform {
  backend "s3" {
    bucket         = "tfstate-fiap"
    key            = "lambda-auth/terraform.tfstate"
    region         = "us-east-1"
    
  }
}
