namespace sap.cap.airline;

// -------------------- Companhia --------------------
entity Companhia @readonly {
  key ICAO: String(3) @unique;
  razaoSocial: String(100) @unique;
  CNPJ: String(14) @unique;
  telefone: String(15) @unique;
  email: String(100);
}

// -------------------- Aeroporto --------------------
entity Aeroporto {
  key id: UUID;
  nome: String(100);
  cidade: String(100);
  estado: String(50);
  pais: String(50);
}

// -------------------- Aeronave --------------------
entity Aeronave @readonly {
  key marca: String(50);
  key modelo: String(50);
  key numeroSerie: String(50);
  capacidade: Integer;
  tipoMotor: String(50);
  companhia: Association to Companhia;
}

// -------------------- HorarioVoo --------------------
entity HorarioVoo {
  key id: UUID;
  voo: String(10);
  origem: Association to Aeroporto;
  destino: Association to Aeroporto;
  horarioPartida: DateTime;
  horarioChegada: DateTime;
}

// -------------------- PropriedadeAeronave --------------------
entity PropriedadeAeronave @readonly {
  key aeronave_id: Association to Aeronave;
  key companhia_id: Association to Companhia;
  matricula: String(20);
  validadeCertificado: DateTime;
}

