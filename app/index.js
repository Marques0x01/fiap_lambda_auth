const AWS = require('aws-sdk');

const cognito = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
  switch (event.resource) {
    case "/fiap-lanches/create-account":
      return await signUp(JSON.parse(event.body)).then(resp => resp).catch(err => err);
    case "/fiap-lanches/login":
      return await login(JSON.parse(event.body)).then(resp => resp);;
    case "/fiap-lanches/user-confirmation":
      return await confirmUser(JSON.parse(event.body)).then(resp => resp);;
    default:
      return {
        statusCode: 404,
        message: "Resource not found"
      }
  }


  // await signUp('12345678901', 'fabiomlima07@gmail.com', 'Password123@')
  //   .then((resp) => {
  //     console.log('Cadastro concluído com sucesso!');
  //   })
  //   .catch(err => {
  //     console.error('Erro ao cadastrar usuário:', err);
  //   });

  // await fazerLogin('12345678901', 'Password123@')
  //   .then(() => {
  //     console.log('Usuário autenticado com sucesso!');
  //   })
  //   .catch(err => {
  //     console.error('Erro ao autenticar usuário:', err);
  //   });



  // await confirmarCadastroPorEmail("12345678901", "665668")
  //   .then((resp) => {
  //     console.log('Usuário confirmado com sucesso!');
  //   })
  //   .catch(err => {
  //     console.error('Erro ao confirmar usuário:', err);
  //   });

};

async function login(body) {
  if (!body.username || !body.password) {
    return {
      statusCode: 400,
      message: "username and password can not be empty"
    }
  }

  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.MY_VARIABLE || "515sa7alcskl84ec9htqetmnd2",
    AuthParameters: {
      USERNAME: body.username,
      PASSWORD: body.password
    }
  };

  try {
    const data = await cognito.initiateAuth(params).promise();
    console.log('User authenticate', data);
    return {
      statusCode: 200,
      message: "User authenticate",
      data: data
    }
  } catch (err) {
    console.error('Error on authenticate user', err);
    return {
      statusCode: 500,
      message: "Error on authenticate user",
      error: err
    }
  }
}

async function signUp(body) {
  if (!body.cpf || !body.email || !body.password) {
    return {
      statusCode: 400,
      message: "username, password and email can not be empty"
    }
  }

  const params = {
    ClientId: process.env.MY_VARIABLE || "515sa7alcskl84ec9htqetmnd2",
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
      message: "User registrate with success",
      data: data
    }
  } catch (err) {
    console.error('Error on creating user:', err);
    return {
      statusCode: 500,
      message: "Error on creating user",
      error: err
    }
  }
}

async function confirmUser(body) {
  if (!body.username || !body.code) {
    return {
      statusCode: 400,
      message: "username and code can not be empty"
    }
  }

  const params = {
    ClientId: process.env.MY_VARIABLE || "515sa7alcskl84ec9htqetmnd2",
    Username: body.username,
    ConfirmationCode: body.code
  };

  try {
    const data = await cognito.confirmSignUp(params).promise();
    console.log('Usuário confirmado com sucesso:', data);
    return {
      statusCode: 200,
      message: "User confirmated with success",
      data: data
    }
  } catch (err) {
    console.error('Error on confirmating user', err);
    return {
      statusCode: 500,
      message: "Error on confirmating user",
      error: err
    }
  }
}