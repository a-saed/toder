type User = {
  id: string;
  name: string;
};

type Project = {
  name: string;
  category: string;
  isFav: boolean;
  archived: boolean;
  sections: {
    unknown: Task[];
    todo: Task[];
    inProgress: Task[];
    done: Task[];
  };
};

type Note = {
  id: string;
  text: string;
};

type SubTask = {
  _id: strin;
  name: string;
  description: string;
  completed: boolean;
};

type Task = {
  _id: string;
  name: string;
  description: string;
  project?: Project;
  dueDate: string;
  isSubTask: boolean;
  subTasks: SubTask[];
  completed: boolean;
  priority: PriorityItem;
  notes?: Note[];
  createdAt?: Date;
  updatedAt?: Date;
};

type PriorityItem = {
  label: string;
  value: string;
  color: string;
};
