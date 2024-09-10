import './Spinner.css'   //// Lo importo como un Spinner y que no sea module porque no funciona

/*

    <div className="spinner">  Agrego la clase de spinner
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
    </div>

*/

export default function Spinner() {
  return (
    <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
    </div>
  )
}
