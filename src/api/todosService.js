import firebase from 'firebase/app'
import 'firebase/database'

class todosService {
    getAllTodos = async () => {
        const res = await firebase.database().ref('todos').get()
        const data = res.toJSON()
        return data ? Object.values(data) : []
    }

    getTodos = async (startAt, endAt) => {
        const res = await firebase.database()
            .ref('todos')
            .orderByKey()
            .startAt(startAt.toString())
            .endAt(endAt.toString())
            .get()

        const data = res.toJSON()
        return data ? Object.values(data) : []
    }

    crateTodos = async (data) => {
        const res = await firebase.database()
            .ref('todos')
            .orderByKey()
            .limitToLast(1)
            .get()

        const lastItemJSON = res.toJSON()

        if (lastItemJSON) {
            const lastItem = Object.values(lastItemJSON)[0];

            var { id } = lastItem;
        } else {
            var id = 0
        }

        const newItem = {
            ...data,
            id: id + 1,
        };

        
        await firebase
            .database()
            .ref(`todos/${id + 1}`)
            .set(newItem);

        return newItem;

    }

    updateTodos = async (data, title, completed) => {
        const todosRef = firebase.database().ref(`todos/${data.id}`)
        await todosRef.update({
            ...data,
            title: title,
            completed: completed,
        })
        const res = await todosRef.get();
        return res.val();
    }

    deleteTodos = async (id, startAt, endAt) => {
        const todosRef = firebase.database().ref(`todos/${id}`);
        await todosRef.remove();

        const allTodos = await this.getAllTodos()
        const newTodos = {};
        console.log(allTodos);
        Object.values(allTodos).forEach(
            (value, index) => (newTodos[index + 1] = { ...value, id: index + 1 })
        );

        await firebase.database().ref("todos").set(newTodos);

        const data = await this.getTodos(startAt, endAt);
        return data;
    }
}

export default new todosService;