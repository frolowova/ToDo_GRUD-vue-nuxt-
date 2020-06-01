export const state = () => ({
    infoFilmFromServer: JSON.parse(localStorage.getItem('filmInfo') || '[]'),
    tasks: [
        {
            groupname: "Тестовая группа для демонстрации отображений",
            name: "Робинзон. Или тот кто выжил в диких джунглях необитаемого острова и не только",
            body: "С днём рожденья поздравляю, счастья, радости желаю, чтоб, дружище, не болеть и в Канаду улететь. И ещё раз: С днём рожденья поздравляю, счастья, радости желаю, чтоб, дружище, не болеть и в Канаду улететь. И ещё раз: С днём рожденья поздравляю, счастья, радости желаю, чтоб, дружище, не болеть и в Канаду улететь",
            status: "active",
            uid: -1
        },
    ],
    taskMarkerToDel: { id: -1, task: {} },
    // selectedGroup: JSON.parse(localStorage.getItem('selectedGroup') || '')
    selectedGroup: "",
    selectedTask: ""
})

export const mutations = {
    // Name(state, data) {
    //     state.data = data
    //     localStorage.setItem('dats', JSON.stringify(state.data))
    // },
    ADD_Task(state, task) {
        state.tasks.unshift(task)
    },
    DEL_Task(state, uid) {
        // Находим наш таск по уникальному ID
        let params = { task: {}, id: -1 }
        state.tasks.forEach((task, i) => {
            if (task.uid == uid) {
                params.task = task
                params.id = i
            }
        })

        state.tasks.splice(params.id, 1)
    },
    REWRITE_Task(state, newData) {
        // Находим наш таск по уникальному ID
        let id = -1
        state.tasks.forEach((task, i) => {
            if (task.uid == newData.uid) {
                id = i
            }
        })
        // Перезаписываем данные
        if (id != -1) {
            state.tasks[id].groupname = newData.groupname
            state.tasks[id].name = newData.name
            state.tasks[id].body = newData.body
        }
    },
    SET_Status(state, uid) {
        // Находим наш таск по уникальному ID
        let params = { task: {}, id: -1 }
        state.tasks.forEach((task, i) => {
            if (task.uid == uid) {
                params.task = task
                params.id = i
            }
        })
        // Меняем значение на противоположное
        if (params.task.status == "active") {
            state.tasks[params.id].status = "done"
        } else {
            state.tasks[params.id].status = "active"
        }
    },
    SET_SelectedGroup(state, name) {
        state.selectedGroup = name
    },
    DEL_FromGroup(state, uid) {
        state.tasks.forEach((task, i) => {
            if (task.uid == uid) {
                state.tasks[i].groupname = ""
            }
        })
    },
    SET_SelectedTask(state, uid) {
        state.selectedTask = state.tasks.filter(task => {
            if (task.uid == uid) return task
        })
    },
    RENAME_Group(state, dataName) {
        state.tasks.forEach(task => {
            if (task.groupname == dataName.groupname) task.groupname = dataName.newGroupname
        })
    }
}

export const actions = {
    addTask({ commit }, task) {
        commit("ADD_Task", task)
    },
    delTask({ commit }, id) {
        commit("DEL_Task", id)
    },
    rewriteTask({ commit }, newData) {
        commit("REWRITE_Task", newData)
    },
    restoreTask({ commit }) {
        commit("RESTORE_Task")
    },
    setStatus({ commit }, uid) {
        commit("SET_Status", uid)
    },
    setSelectedGroup({ commit }, nameGroup) {
        commit("SET_SelectedGroup", nameGroup)
    },
    delFromGroup({ commit }, uid) {
        commit("DEL_FromGroup", uid)
    },
    setSelectedTask({ commit }, uid) {
        commit("SET_SelectedTask", uid)
    },
    renameGroup({ commit }, dataName) {
        commit("RENAME_Group", dataName)
    }
}

export const getters = {
    tasks: state => { return state.tasks },
    getListGroups: state => {
        let groups = []
        state.tasks.forEach(item => {
            // Добавлять только уникальные значения
            if (!groups.includes(item.groupname)) {
                groups.push(item.groupname)
            }
        })
        return groups
    },
    getSelectedGroup: state => {
        console.log("Вот это возвращаем " + state.selectedGroup)
        return state.selectedGroup
    },
    getTasksFromGroup: state => nameGroup => {
        let tasks = state.tasks.filter(item => {
            return item.groupname == nameGroup
        })
        return tasks
    },
    getSelectedTask: state => {
        return state.selectedTask
    }
}