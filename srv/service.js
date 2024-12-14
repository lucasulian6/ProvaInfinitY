const cds = require('@sap/cds');
const { SELECT, INSERT, UPDATE, DELETE } = cds.ql;

module.exports = cds.service.impl(async function () {
  const { Passageiro, Aeronave, PropriedadeAeronave, Aeroporto, Conexao } = this.entities;

  // ---------------------------- Passengers ---------------------------- //

  // Validação para garantir que o CPF, nome, telefone, e-mail e idade mínima são válidos antes de criar um passageiro
  this.before('CREATE', 'Passageiro', async (req) => {
    const { cpf, nome, telefone, email, dataNascimento } = req.data;
  
    const cpfRegex = /^\d{11}$/;  // Regex para validar CPF com 11 dígitos
    const telefoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/; // Regex para telefone no formato (XX) XXXXX-XXXX
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Regex para validar e-mail
  
    if (!cpf || !cpfRegex.test(cpf)) throw req.error(400, 'CPF inválido');
    if (!nome) throw req.error(400, 'Nome é obrigatório');
    if (!telefone || !telefoneRegex.test(telefone)) throw req.error(400, 'Telefone inválido');
    if (!email || !emailRegex.test(email)) throw req.error(400, 'E-mail inválido');
    
    const nascimento = new Date(dataNascimento);
    const idade = new Date().getFullYear() - nascimento.getFullYear();
    const mes = new Date().getMonth() - nascimento.getMonth();
    const dia = new Date().getDate() - nascimento.getDate();
    
    if (idade < 3 || (idade === 3 && (mes < 0 || (mes === 0 && dia < 0)))) {
      throw req.error(400, 'Idade mínima de 3 anos para cadastro');
    }
  });

  // Serviço de leitura de Passageiro (GET)
  this.on('READ', Passageiro, async (req) => {
    return await SELECT.from(Passageiro);
  });

  // Serviço de criação de Passageiro (POST)
  this.on('CREATE', Passageiro, async (req) => {
    return await INSERT.into(Passageiro).entries(req.data);
  });

  // Serviço de atualização de Passageiro (PUT)
  this.on('UPDATE', Passageiro, async (req) => {
    return await UPDATE(Passageiro).set(req.data).where({ id: req.data.id });
  });

  // Serviço de deletação de Passageiro (DELETE)
  this.on('DELETE', Passageiro, async (req) => {
    return await DELETE.from(Passageiro).where(req.data);
  });

  // ---------------------------- Aircraft ---------------------------- //

  // Serviço de leitura de Aeronave (somente leitura)
  this.on('READ', Aeronave, async (req) => {
    return await SELECT.from(Aeronave);
  });

  // ---------------------------- PropriedadeAeronave ---------------------------- //

  // Serviço de leitura de PropriedadeAeronave (somente leitura)
  this.on('READ', PropriedadeAeronave, async (req) => {
    return await SELECT.from(PropriedadeAeronave);
  });

  // Serviço de criação de PropriedadeAeronave (POST)
  this.on('CREATE', PropriedadeAeronave, async (req) => {
    return await INSERT.into(PropriedadeAeronave).entries(req.data);
  });

  // Serviço de atualização de PropriedadeAeronave (PUT)
  this.on('UPDATE', PropriedadeAeronave, async (req) => {
    return await UPDATE(PropriedadeAeronave).set(req.data).where({
      aeronave_id: req.data.aeronave_id,
      companhia_id: req.data.companhia_id
    });
  });

  // Serviço de deletação de PropriedadeAeronave (DELETE)
  this.on('DELETE', PropriedadeAeronave, async (req) => {
    return await DELETE.from(PropriedadeAeronave).where(req.data);
  });

  // ---------------------------- Aeroporto ---------------------------- //

  // Serviço de leitura de Aeroporto (somente leitura)
  this.on('READ', Aeroporto, async (req) => {
    return await SELECT.from(Aeroporto);
  });

  // ---------------------------- Conexao ---------------------------- //

  // Serviço de leitura de Conexao (somente leitura)
  this.on('READ', Conexao, async (req) => {
    return await SELECT.from(Conexao);
  });

  // Serviço de criação de Conexao (POST)
  this.on('CREATE', Conexao, async (req) => {
    return await INSERT.into(Conexao).entries(req.data);
  });

  // Serviço de atualização de Conexao (PUT)
  this.on('UPDATE', Conexao, async (req) => {
    return await UPDATE(Conexao).set(req.data).where({
      origem_id: req.data.origem_id,
      destino_id: req.data.destino_id
    });
  });

  // Serviço de deletação de Conexao (DELETE)
  this.on('DELETE', Conexao, async (req) => {
    return await DELETE.from(Conexao).where(req.data);
  });
});