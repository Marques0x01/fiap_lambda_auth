const AWS = require('aws-sdk');

const cognito = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
  switch (event.path) {
    case "/fiap-lanches/create-account":
      return await signUp(JSON.parse(event.body)).then(resp => resp).catch(err => err);
    case "/fiap-lanches/login":
      return await login(JSON.parse(event.body)).then(resp => resp);;
    case "/fiap-lanches/user-confirmation":
      return await confirmUser(JSON.parse(event.body)).then(resp => resp);;
    default:
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: (`Resource not found: ${event.path}`),
          statusCode: 404
        })
      }
  }

};

async function login(body) {
  if (!body.cpf || !body.password) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "cpf and password can not be empty",
        statusCode: 400
      })
    }
  }

  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.cognito_client_id || "1covo9snudlq458a55svp239hu",
    AuthParameters: {
      USERNAME: body.cpf,
      PASSWORD: body.password
    }
  };

  try {
    const data = await cognito.initiateAuth(params).promise();
    console.log('User authenticate', data);
    return {
      statusCode: 200,
      body: JSON.stringify({
        statusCode: 200,
        message: "User authenticate",
        data: data
      })
    }
  } catch (err) {
    console.error('Error on authenticate user', err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        statusCode: 500,
        message: "Error on authenticate user",
        error: err
      })
    }
  }
}

async function signUp(body) {
  if (!body.cpf || !body.email || !body.password) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "cpf, password and email can not be empty",
        statusCode: 400
      })
    }
  }

  const params = {
    ClientId: process.env.cognito_client_id || "1covo9snudlq458a55svp239hu",
    Username: body.cpf,
    Password: body.password,
    UserAttributes: [
      {
        Name: 'email',
        Value: body.email
      }
    ]
  };

  try {
    const data = await cognito.signUp(params).promise();
    console.log('User registrate with success: ', data);

    return {
      statusCode: 200,
      body: JSON.stringify({
        statusCode: 200,
        message: "User registrate with success",
        data: data
      })
    }
  } catch (err) {
    console.error('Error on creating user:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        statusCode: 500,
        message: "Error on creating user",
        error: err
      })
    }
  }
}

async function confirmUser(body) {
  if (!body.cpf || !body.code) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "username and code can not be empty",
        statusCode: 400
      })
    }
  }

  const params = {
    ClientId: process.env.cognito_client_id || "1covo9snudlq458a55svp239hu",
    Username: body.cpf,
    ConfirmationCode: body.code
  };

  try {
    const data = await cognito.confirmSignUp(params).promise();
    console.log('Usuário confirmado com sucesso:', data);
    return {
      statusCode: 200,
      body: JSON.stringify({
        statusCode: 200,
        message: "User confirmated with success",
        data: data
      })
    }
  } catch (err) {
    console.error('Error on confirmating user', err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        statusCode: 500,
        message: "Error on confirmating user",
        error: err
      })
    }
  }
}
