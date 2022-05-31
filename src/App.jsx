import React, {useState} from 'react'
import {nanoid} from 'nanoid'

function App() {

  //States que guardan información en forma de cache, algunos son Arrays, otros vacios/null según sea el caso
  const [tarea, setTarea] = useState('')
  const [tareas, setTareas] = useState([])
  const [modoEdicion, setModoEdicion] = useState(false)
  const [id, setId] = useState('')
  const [error, setError] = useState(null)

  //Función agregarTarea, que recibe un parametro "e" para utilizar el preventDefault de vanila JS
  //Aquí se evalua si el state "tarea" se encuentra vacio haciendo uso de trim() en modo de negacion
  //además agrega la funcionalidad para menejar errores mediante texto al State error, cambiando su valor bajo su atributo set
  //también esta función se encarga de agregar cada tarea al state Tareas bajo su setTareas, de esta forma se puede recorrer el array en el HTML
  //Por último al final de la ejecución limpia el formulario a través de setTarea y devuelve el error a su estado de null, para hacerlo desaparecer
  const agregarTarea = (e) => {
    e.preventDefault()
    if(!tarea.trim()) {
      console.log("Elemento vacío")
      setError('Escriba algo porfavor....')
      return
    }
    console.log(tarea)

    setTareas([
      ...tareas,
      {id: nanoid(), nombreTarea: tarea}
    ])
    setTarea("")
    setError(null)
  }


  //Función para eliminar las tareas que utiliza una ID generada con nanoid (npm i nanoid)
  //que modifica el setTareas con el nuevo array obtenido del filtro donde lo que se busca es sacar del array el id seleccionado
  const eliminarTarea = (id) => {
    const arrayFiltrado = tareas.filter(item => item.id !== id)
    setTareas(arrayFiltrado)
  }

  //La función modifica setModoedicion para cambiar su estado a true
  // toma además los datos de item para establecer en el formulario los datos a editar
  const editar = item => {
    setModoEdicion(true)
    setTarea(item.nombreTarea)
    setId(item.id)
  }

  //Funcion que edita la tarea seleccionada y que verifica que no existan espacios vacios con trim()
  //Además edita el contenido de la tarea a través de un map, que tiene un operador ternario para su condicional
  // y finalmente limpia y vuelve a la forma estandar los formularios
  const editarTarea = (e) => {
    e.preventDefault()
    if(!tarea.trim()) {
      setError('Escriba algo porfavor....')
      return
    }

    const arrayEditado = tareas.map(item => item.id === id ? {id, nombreTarea: tarea}: item)

    setTareas(arrayEditado)
    setModoEdicion(false)
    setTarea("")
    setId("")
    setError(null)
  }

  return (
    <div className="container mt-2">
      <h1 className='text-center'>CRUD Simple</h1>
      <hr />
      <div className="row mt-2">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          <ul className="list-group">
              {
                tareas.length === 0 ? (
                  <li className="list-group-item">No hay tareas</li>
                ) : (
                  tareas.map((item) => (
                    <li className="list-group-item" key={item.id}>
                      <span className="lead">{item.nombreTarea}</span>
                      <button 
                      className="btn btn-danger btn-sm float-end mx-2"
                      onClick={() => eliminarTarea(item.id)}
                      >
                        Eliminar
                        </button>
                      <button
                       className="btn btn-warning btn-sm float-end"
                        onClick={() => editar(item)}
                       >
                         Editar
                         </button>
                    </li>
                  ))
                )

                
              }
            

          </ul>
        </div>
        <div className="col-4">
        <h4 className="text-center">{
          modoEdicion ? 'Editar Tarea': 'Agregar Tarea'
        }</h4>
        <form onSubmit={modoEdicion ? editarTarea: agregarTarea }>
          {
            error ? <span className="text-danger">{error}</span> : null
          }
          <input 
            type="text" 
            className="form-control mb-2"
            placeholder='Ingrese Tarea'
            onChange={e => setTarea(e.target.value)}
            value={tarea} 
            />
            {
              modoEdicion ? (
                <button className="btn btn-warning col-12" type='submit'>Editar</button>
              ) : (
                <button className="btn btn-dark col-12" type='submit'>Agregar</button>
              )
            }
            
        </form>
        </div>
      </div>
      
    </div>
  );
}

export default App;
