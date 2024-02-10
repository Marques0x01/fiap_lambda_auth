terraform {
  backend "s3" {
    bucket         = "fmlab-teste"
    key            = "terraform.tfstate"
    region         = "us-east-1"
  }
}
