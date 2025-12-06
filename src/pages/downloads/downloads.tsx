import TitleHeader from '../../components/title'
import './downloads.css'
import { Link } from 'react-router-dom'

const DownloadsPage = () => {
    return (
        <div className="container">
            <div className="left"></div>

            <div className="right">
                <TitleHeader />
                <h2>Descarga la base de datos que necesites</h2>

                <label htmlFor="buscar">Opciones de bases de datos disponibles para descargar</label>
                <input type="text" id="buscar" className="search-box" placeholder="Ingresa el nombre de la base de datos que deseas descargar" />

                <div className="options">
                    <div className="option">Colaboradores en general.</div>
                    <div className="option">Colaboradores del área logística y operativos.</div>
                    <div className="option">Colaboradores del área administrativa.</div>
                    <div className="option">Colaboradores del área de mantenimiento.</div>
                    <div className="option">Colaboradores del área comercial.</div>
                </div>

                <Link to="/">
                    <button className="btn">Descargar</button>
                </Link>

                <div className="footer">
                    ¿No encuentras lo que necesitas? <strong>Comunícate ahora con soporte técnico.</strong>
                </div>
            </div>
        </div >

    )
}
export default DownloadsPage