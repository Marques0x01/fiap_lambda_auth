terraform {
  backend "s3" {
    bucket         = "tfstates-fiap-lanches"
    key            = "lambda-auth/terraform.tfstate"
    region         = "us-east-2"
    
  }
}
