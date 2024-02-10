resource "aws_lambda_function" "lambda" {
  filename      = "example.zip" # Nome do arquivo zip contendo seu código Node.js
  function_name = "fiap_auth"
  role          = aws_iam_role.lambda_role.arn
  handler       = "app/index.handler"
  runtime       = "nodejs14.x"

  environment {
    variables = {
      foo = "bar"
    }
  }

  depends_on = [aws_iam_role.lambda_role]
}
