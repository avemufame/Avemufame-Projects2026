









<div>
          <div className="task-controls">
            <input
              type="text"
              placeholder="Enter task name"
              value={inputValue}
              onChange={function (e) { setInputValue(e.target.value) }}
            />
            <button onClick={handleAddTask}>Add Task</button>
          </div>
          <p className="status-message">{statusMessage}</p>
     </div>
   