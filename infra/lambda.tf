resource "aws_lambda_function" "lambda" {
  filename      = "lambda.zip" # Nome do arquivo zip contendo seu código Node.js
  function_name = var.lambda_name
  role          = aws_iam_role.lambda_role.arn
  handler       = data.archive_file.zip.output_base64sha256
  runtime       = "nodejs14.x"

  environment {
    variables = {
      foo = "bar"
    }
  }

  depends_on = [aws_iam_role.lambda_role]
}


data "archive_file" "zip" {
  excludes = [
    "infra/",
    ".github/",
    ".gitignore"
  ]
  type = "zip"
  source_file = path.module
  output_path = "${path.module}/lambda.zip"
}