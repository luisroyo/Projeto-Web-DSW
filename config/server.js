const startServer = (app) => {
  const PORT = process.env.PORT || 3000;

  const server = app.listen(PORT, () => {
    console.log(`Servidor Express está ouvindo na porta ${PORT}`);
  });

  // Tratamento de erros
  server.on('error', (error) => {
    console.error('Erro no servidor:', error.message);
    process.exit(1); // Encerra o processo em caso de erro grave
  });

  // Manipulação de sinal de encerramento
  process.on('SIGINT', () => {
    console.log('Servidor está sendo encerrado...');
    server.close(() => {
      console.log('Servidor encerrado. Adeus!');
      process.exit(0); // Encerra o processo com sucesso
    });
  });
};

module.exports = {
  startServer,
};
