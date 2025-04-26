'use client';

import { useState, useEffect } from "react";

const TOTAL_NUMBERS = 200;

export default function ProjetoTijolinho() {
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<{ [key: number]: string }>({});
  const [name, setName] = useState("");
  const [receipt, setReceipt] = useState<File | null>(null);

  useEffect(() => {
    const mockData = {11: "pago", 10: "pago", 23: "reservado" };
    setStatus(mockData);
  }, []);

  const handleNumberClick = (number: number) => {
    if (!status[number]) setSelected(number);
  };

  const handleUpload = () => {
    if (!selected || !receipt) return;
    alert(`Comprovante enviado para o número ${selected}`);
    setStatus({ ...status, [selected]: "reservado" });
    setSelected(null);
    setReceipt(null);
    setName("");
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Projeto Tijolinho</h1>
      <p className="text-center mb-6">
        Escolha um número de 1 a 200 e contribua com o valor correspondente via Pix.
      </p>
      <div className="grid grid-cols-10 gap-2 mb-6">
        {[...Array(TOTAL_NUMBERS)].map((_, i) => {
          const number = i + 1;
          const statusColor = status[number] === "pago"
            ? "bg-red-400"
            : status[number] === "reservado"
            ? "bg-yellow-300"
            : "bg-blee-200";
          return (
            <button
              key={number}
              className={`rounded p-2 ${statusColor}`}
              onClick={() => handleNumberClick(number)}
              disabled={!!status[number]}
            >
              {number}
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-2">Você escolheu o número: {selected}</h2>
          <p className="mb-2">Valor: R$ {selected}</p>
          <p className="mb-2">Chave Pix: <strong>sua-chave-pix@email.com</strong></p>
          <input
            type="text"
            placeholder="Seu nome (opcional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="file"
            onChange={(e) => setReceipt(e.target.files?.[0] || null)}
            className="mb-2 p-2 border rounded w-full"
          />
          <button
            onClick={handleUpload}
            className="p-2 bg-blue-500 text-white rounded w-full"
          >
            Enviar Comprovante
          </button>
        </div>
      )}
    </div>
  );
}
