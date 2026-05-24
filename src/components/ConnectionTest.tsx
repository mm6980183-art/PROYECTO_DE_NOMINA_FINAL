import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

const ConnectionTest = ({ onStatusChange }) => {
  const [status, setStatus] = useState('Pendiente');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);

  const testConnection = async () => {
    setStatus('Probando...');
    setError('');
    setResponse(null);

    try {
      const result = await api.get('/', {
        timeout: 5000,
      });
      setStatus('✅ Conectado');
      setResponse(result.data);
    } catch (err) {
      const message = err?.code === 'ECONNREFUSED'
        ? 'No se puede conectar al backend. Asegúrate de ejecutar el servidor con `cd backend && npm run dev`.'
        : err?.message === 'timeout of 5000ms exceeded'
        ? 'Timeout: el backend tardó demasiado en responder.'
        : err?.response?.status === 404
        ? 'La API está en línea pero la ruta raíz no existe. Revisa el backend.'
        : err?.message || 'Error desconocido al conectar con el backend.';
      setStatus('❌ Error de conexión');
      setError(message);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  useEffect(() => {
    if (onStatusChange) {
      onStatusChange(status);
    }
  }, [status, onStatusChange]);

  useEffect(() => {
    if (status === '✅ Conectado') return undefined;

    const intervalId = setInterval(testConnection, 5000);
    return () => clearInterval(intervalId);
  }, [status]);

  return (
    <div style={{ padding: '20px', margin: '20px', border: '2px solid #ccc', borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
      <h3>🔧 Test de Conexión a API</h3>
      <button onClick={testConnection} style={{ padding: '10px 20px', marginBottom: '10px', cursor: 'pointer' }}>
        Volver a intentar
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
