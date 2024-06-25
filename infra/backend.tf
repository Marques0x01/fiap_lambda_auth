terraform {
  backend "s3" {
    bucket         = "tfstates-fiap"
    key            = "lambda-auth/terraform.tfstate"
    region         = "us-east-1"
    
  }
}
