import { useState } from 'react';
import axios from 'axios';

const ConnectionTest = () => {
  const [status, setStatus] = useState<string>('Pendiente');
  const [error, setError] = useState<string>('');
  const [response, setResponse] = useState<any>(null);

  const testConnection = async () => {
    setStatus('Probando...');
    setError('');
    setResponse(null);

    try {
      const result = await axios.get('http://localhost:3000/users', {
        timeout: 5000,
      });
      setStatus('✅ Conectado');
      setResponse(result.data);
    } catch (err: any) {
      setStatus('❌ Error de conexión');
      if (err.code === 'ECONNREFUSED') {
        setError('No se puede conectar al servidor en localhost:3000. ¿Está ejecutándose?');
      } else if (err.message === 'timeout of 5000ms exceeded') {
        setError('Timeout: El servidor tardó demasiado en responder');
      } else {
        setError(err.message || 'Error desconocido');
      }
    }
  };

  return (
    <div style={{ padding: '20px', margin: '20px', border: '2px solid #ccc', borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
      <h3>🔧 Test de Conexión a Base de Datos</h3>
      <button onClick={testConnection} style={{ padding: '10px 20px', marginBottom: '10px', cursor: 'pointer' }}>
        Probar Conexión
      </button>
      
      <div style={{ marginTop: '10px' }}>
        <strong>Estado: </strong> <span style={{ fontSize: '16px' }}>{status}</span>
      </div>

      {error && (
        <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#ffcccc', borderRadius: '4px', color: '#cc0000' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {response && (
        <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#ccffcc', borderRadius: '4px' }}>
          <strong>Respuesta:</strong>
          <pre style={{ marginTop: '10px', backgroundColor: '#fff', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ConnectionTest;
