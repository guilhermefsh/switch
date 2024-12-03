'use client'

import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Trash2 } from 'lucide-react'

interface Task {
    id: number
    title: string
    description: string
    status: 'To Do' | 'In Progress' | 'Done'
}

export function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTask, setNewTask] = useState<Omit<Task, 'id'>>({ title: '', description: '', status: 'To Do' })
    const [editingTask, setEditingTask] = useState<Task | null>(null)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [filterStatus, setFilterStatus] = useState<Task['status'] | 'All'>('All')
    const [searchTerm, setSearchTerm] = useState('')

    const handleCreateTask = () => {
        if (newTask.title) {
            setTasks([...tasks, { ...newTask, id: Date.now() }])
            setNewTask({ title: '', description: '', status: 'To Do' })
            setIsCreateModalOpen(false)
        }
    }

    const handleEditTask = () => {
        if (editingTask) {
            setTasks(tasks.map(task => task.id === editingTask.id ? editingTask : task))
            setEditingTask(null)
            setIsViewModalOpen(false)
        }
    }

    const handleDeleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id))
        setIsViewModalOpen(false)
    }

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            const matchesStatus = filterStatus === 'All' || task.status === filterStatus
            const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description.toLowerCase().includes(searchTerm.toLowerCase())
            return matchesStatus && matchesSearch
        })
    }, [tasks, filterStatus, searchTerm])

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-white">Tarefas</h2>
            <div className="mb-4 flex gap-4">
                <Input
                    placeholder="Pesquisar tarefa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow"
                />
                <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as Task['status'] | 'All')}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">Todas</SelectItem>
                        <SelectItem value="To Do">Pendente</SelectItem>
                        <SelectItem value="In Progress">Em progresso</SelectItem>
                        <SelectItem value="Done">Finalizada</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogTrigger asChild>
                    <Button className="mb-4">Criar nova tarefa</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Criar nova tarefa</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder="Task Title"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        className="mb-2"
                    />
                    <Textarea
                        placeholder="Task Description"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        className="mb-2"
                    />
                    <Select
                        value={newTask.status}
                        onValueChange={(value) => setNewTask({ ...newTask, status: value as Task['status'] })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="To Do">Pendente</SelectItem>
                            <SelectItem value="In Progress">Em progresso</SelectItem>
                            <SelectItem value="Done">Finalizada</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={handleCreateTask}>Criar tarefa</Button>
                </DialogContent>
            </Dialog>
            {filteredTasks.map((task) => (
                <div key={task.id} className="mb-4 p-4 bg-white bg-opacity-10 rounded-lg flex justify-between items-start">
                    <div
                        className="cursor-pointer flex-grow"
                        onClick={() => {
                            setEditingTask(task)
                            setIsViewModalOpen(true)
                        }}
                    >
                        <h3 className={`font-semibold text-white ${task.status === 'Done' ? 'line-through' : ''}`}>{task.title}</h3>
                        <p className={`text-sm text-gray-300 ${task.status === 'Done' ? 'line-through' : ''}`}>{task.description}</p>
                        <span className="text-xs text-blue-400">{task.status}</span>
                    </div>
                    <div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                setEditingTask(task)
                                setIsViewModalOpen(true)
                            }}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteTask(task.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ))}
            <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingTask ? 'Edit Task' : 'View Task'}</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder="Task Title"
                        value={editingTask?.title || ''}
                        onChange={(e) => setEditingTask(prev => prev ? { ...prev, title: e.target.value } : null)}
                        className="mb-2"
                    />
                    <Textarea
                        placeholder="Task Description"
                        value={editingTask?.description || ''}
                        onChange={(e) => setEditingTask(prev => prev ? { ...prev, description: e.target.value } : null)}
                        className="mb-2"
                    />
                    <Select
                        value={editingTask?.status}
                        onValueChange={(value) => setEditingTask(prev => prev ? { ...prev, status: value as Task['status'] } : null)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="To Do">Pendente</SelectItem>
                            <SelectItem value="In Progress">Em progresso</SelectItem>
                            <SelectItem value="Done">Finalizada</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={handleEditTask}>Salvar</Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}

