const dbConnection = require("../../config/dbConnection");
const Mesa = require("../models/Mesa");

class MesaController {
  // Função para obter todas as mesas disponíveis
  static getAvailableTables = async (req, res) => {
    const selectAllQuery = "SELECT * FROM mesas";

    // Executa a consulta SQL para obter todas as mesas
    dbConnection.query(selectAllQuery, (error, results) => {
      if (error) {
        console.error("Erro ao obter todas as mesas: " + error.message);
        return res.status(500).json({ error: "Erro ao obter todas as mesas" });
      }

      return res.status(200).json(results);
    });
  };

  // Função para buscar mesas disponíveis no banco de dados
  static fetchAvailableTablesFromDB = async () => {
    const selectAvailableTablesQuery =
      "SELECT * FROM mesas WHERE disponibilidade = 1";

    // Executa a consulta SQL para obter mesas disponíveis no banco de dados
    const [rows] = await dbConnection.execute(selectAvailableTablesQuery);

    return MesaController.mapRowsToMesas(rows);
  };

  // Função auxiliar para mapear resultados do banco de dados em objetos Mesa
  static mapRowsToMesas = (rows) => {
    return rows.map(
      (row) =>
        new Mesa(row.id, row.mesaNumber, row.capacidade, row.disponibilidade)
    );
  };
}

module.exports = MesaController;
