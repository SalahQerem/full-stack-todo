import Button from "./ui/Button";
import { ITodo } from "../interfaces";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Modal from "./ui/Modal";
import { ChangeEvent, FormEvent, useState } from "react";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import TodoSkeleton from "./TodoSkeleton";

const TodoList = () => {
  const defualtTodo: ITodo = {
    id: 0,
    title: "",
    description: "",
  };

  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState(defualtTodo);
  const [todoToAdd, setTodoToAdd] = useState({
    title:"",
    description:"",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [queryVersion, setQueryVersion] = useState(1);

  const { data, isLoading } = useAuthenticatedQuery({
    queryKey: ["todoList", `${queryVersion}`],
    url: "/users/me?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });

  const openEditModal = (todo: ITodo) => {
    setTodoToEdit(todo);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setTodoToEdit(defualtTodo);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setTodoToAdd({
      title:"",
      description:"",
    });
  };

  const closeConfirmModal = () => {
    setTodoToEdit({
      id: 0,
      title: "",
      description: "",
    });
    setIsConfirmModalOpen(false);
  };

  const openConfirmModal = (todo: ITodo) => {
    setTodoToEdit(todo);
    setIsConfirmModalOpen(true);
  };

  const editOnChangeHandler = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    setTodoToEdit({
      ...todoToEdit,
      [name]: value,
    });
  };

  const addOnChangeHandler = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    setTodoToAdd({
      ...todoToAdd,
      [name]: value,
    });
  };

  const editSubmitHandler = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsUpdating(true);
    const { id, title } = todoToEdit;
    try {
      const { status } = await axiosInstance.put(
        `/todos/${todoToEdit.id}`,
        { data: { id, title } },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );
      if (status == 200) {
        closeEditModal();
        setQueryVersion(prev => prev + 1);
        toast.success("Todo Updated", {
          position: "top-left",
          duration: 1500,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const addSubmitHandler = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsAdding(true);
    try {
      const { status } = await axiosInstance.post(
        `/todos`,
        { data: { ...todoToAdd } },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );
      if (status == 200) {
        closeAddModal();
        setQueryVersion(prev => prev + 1);
        toast.success("Todo Added", {
          position: "top-left",
          duration: 1500,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsAdding(false);
    }
  };

  const onSubmitRemoveTodo = async () => {
    try {
      const { status } = await axiosInstance.delete(`/todos/${todoToEdit.id}`, {
        headers: {
          Authorization: `Bearer ${userData.jwt}`,
        },
      });

      if (status == 200) {
        setQueryVersion(prev => prev + 1);
        closeConfirmModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-1 p-3">
        {Array.from({ length: 3 }, (_, idx) => (
          <TodoSkeleton key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1 max-w-[700px] mx-auto">
      <div className="w-fit mx-auto my-5">
        <Button size={"sm"} onClick={openAddModal}>Post new Todo</Button>
      </div>
      <div>
      {data.todos.length ? (
        data?.todos.map((todo: ITodo, index:number) => (
          <div
            key={todo.id}
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
          >
            <p className="w-full font-semibold">{`${index + 1} - ${todo.title}`}</p>
            <div className="flex items-center justify-end w-full space-x-3">
              <Button size={"sm"} onClick={() => openEditModal(todo)}>
                Edit
              </Button>
              <Button
                variant={"danger"}
                size={"sm"}
                onClick={() => openConfirmModal(todo)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h3 className="font-semibold text-center text-2xl">No Todos yet!</h3>
      )}
      </div>
      
      <Modal
        isOpen={isEditModalOpen}
        closeModal={closeEditModal}
        title="Edit Todo"
      >
        <form className="space-y-3" onSubmit={editSubmitHandler}>
          <Input
            name="title"
            placeholder="Title"
            value={todoToEdit.title}
            onChange={editOnChangeHandler}
          />
          <Textarea
            name="description"
            value={todoToEdit.description}
            onChange={editOnChangeHandler}
          />
          <div className="flex items-center justify-start space-x-3">
            <Button isLoading={isUpdating}>Update</Button>
            <Button variant={"cancel"} onClick={closeEditModal}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={isAddModalOpen}
        closeModal={closeAddModal}
        title="Add Todo"
      >
        <form className="space-y-3" onSubmit={addSubmitHandler}>
          <Input
            name="title"
            placeholder="Title"
            value={todoToAdd.title}
            onChange={addOnChangeHandler}
          />
          <Textarea
            name="description"
            placeholder="Description"
            value={todoToAdd.description}
            onChange={addOnChangeHandler}
          />
          <div className="flex items-center justify-start space-x-3">
            <Button isLoading={isAdding}>Add</Button>
            <Button variant={"cancel"} onClick={closeAddModal}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={isConfirmModalOpen}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this Todo from your Store?"
        description="Deleting this Todo will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button variant={"danger"} size={"sm"} onClick={onSubmitRemoveTodo}>
            Yes, remove
          </Button>
          <Button
            type="button"
            variant={"cancel"}
            size={"sm"}
            onClick={closeConfirmModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;
