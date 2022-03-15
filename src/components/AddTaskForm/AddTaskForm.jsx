import React from 'react';
import './AddTaskForm.css';
const AddTaskForm = () => (
  <div className='AddTaskForm'>
    <form>
    <input type="text" placeholder='what needs to be done?'>
     </input>
     <button type="submit">
       Add
       </button>
        </form>
        </div>
)

export default AddTaskForm;