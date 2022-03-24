import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { addTodo, deleteTodo, editTodo, redoTodo, undoTodo } from './todoSlice'

function Todos() {
    const { todos, actions } = useSelector(state => state.todos);
    // console.log(todos);
    const dispatch = useDispatch();

    const [todo, setTodo] = useState('');
    const [filter, setFilter] = useState('All');
    // console.log(filter);

    const saveTodo = () => {
        if (todo !== '') {
            dispatch(addTodo({ title: todo, active: true }));
            setTodo('');
            toast.success('Todo added successfully!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error('Please insert todo title!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <div className='d-flex flex-column my-4'>
            <div className="row mb-3 mx-0 justify-content-center">
                <input type="text" className="col-md-6" placeholder="Todo title" aria-label="Todo title" aria-describedby="button-addon2" value={todo} onChange={(e) => setTodo(e.target.value)} />
                <button className="col-md-2 btn btn-outline-dark" type="button" id="button-addon2" onClick={() => saveTodo()}>Add todo</button>
            </div>
            <div className="mb-3 mx-auto">
                <label className='form-label'>Show:</label>
                <button className={`btn btn-outline-secondary ${filter === 'All' ? 'active' : ''}`} type="button" onClick={() => setFilter('All')}>All</button>
                <button className={`btn btn-outline-secondary ${filter === 'Active' ? 'active' : ''}`} type="button" onClick={() => setFilter('Active')}>Active</button>
                <button className={`btn btn-outline-secondary ${filter === 'Completed' ? 'active' : ''}`} type="button" onClick={() => setFilter('Completed')}>Completed</button>
            </div>
            <div className="mb-3 mx-auto">
                <label className='form-label'>Actions:</label>
                <button className={`btn btn-info btn-sm`} type="button" onClick={() => dispatch(undoTodo())} disabled={actions.undos.length === 0 ? true : false}>Undo</button>
                <button className={`btn btn-info btn-sm`} type="button" onClick={() => dispatch(redoTodo())} disabled={actions.redos.length === 0 ? true : false}>Redo</button>
            </div>
            <ol className="col-md-6 list-group list-group-numbered mx-auto">
                {
                    todos.map((todo, index) =>
                        filter === 'All'
                            ? <li key={index} className={`list-group-item d-flex`} >
                                {todo.title}
                                <span className={`badge bg-${todo.active ? 'primary' : 'success'} rounded-pill ms-auto align-self-center`}>
                                    {todo.active ? 'Active' : 'Completed'}
                                </span>
                                <span id='badge-link' className={`badge bg-secondary rounded-pill mx-1 align-self-center`} onClick={() => dispatch(editTodo({ todo, index }))}>
                                    {todo.active ? 'set as Completed' : 'set as Active'}
                                </span>
                            </li>

                            : filter === 'Active' && todo.active
                                ? <li key={index} className="list-group-item d-flex">
                                    {todo.title}
                                    <span id='badge-link' className={`badge bg-danger rounded-pill ms-auto align-self-center`} onClick={() => dispatch(deleteTodo({ todo, index }))}>
                                        Delete
                                    </span>
                                    <span id='badge-link' className={`badge bg-secondary rounded-pill mx-1 align-self-center`} onClick={() => dispatch(editTodo({ todo, index }))}>
                                        {todo.active ? 'set as Completed' : 'set as Active'}
                                    </span>
                                </li>

                                : filter === 'Completed' && !todo.active && <li key={index} className="list-group-item d-flex">
                                    {todo.title}
                                    <span id='badge-link' className={`badge bg-danger rounded-pill ms-auto align-self-center`} onClick={() => dispatch(deleteTodo({ todo, index }))}>
                                        Delete
                                    </span>
                                    <span id='badge-link' className={`badge bg-secondary rounded-pill mx-1 align-self-center`} onClick={() => dispatch(editTodo({ todo, index }))}>
                                        {todo.active ? 'set as Completed' : 'set as Active'}
                                    </span>
                                </li>
                    )
                }
            </ol>
        </div>
    )
}

export default Todos