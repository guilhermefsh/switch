import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Pencil, Trash2 } from 'lucide-react'

interface Note {
    id: number
    title: string
    description: string
}

export function Notes() {
    const [notes, setNotes] = useState<Note[]>([])
    const [newNote, setNewNote] = useState<Omit<Note, 'id'>>({ title: '', description: '' })
    const [editingNote, setEditingNote] = useState<Note | null>(null)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)

    const handleCreateNote = () => {
        if (newNote.title) {
            setNotes([...notes, { ...newNote, id: Date.now() }])
            setNewNote({ title: '', description: '' })
            setIsCreateModalOpen(false)
        }
    }

    const handleEditNote = () => {
        if (editingNote) {
            setNotes(notes.map(note => note.id === editingNote.id ? editingNote : note))
            setEditingNote(null)
            setIsViewModalOpen(false)
        }
    }

    const handleDeleteNote = (id: number) => {
        setNotes(notes.filter(note => note.id !== id))
        setIsViewModalOpen(false)
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-white">Notes</h2>
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogTrigger asChild>
                    <Button className="mb-4">Criar nova nota</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Criar nova nota</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder="Note Title"
                        value={newNote.title}
                        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                        className="mb-2"
                    />
                    <Textarea
                        placeholder="Note Description"
                        value={newNote.description}
                        onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
                        className="mb-2"
                    />
                    <Button onClick={handleCreateNote}>Criar nota</Button>
                </DialogContent>
            </Dialog>
            {notes.map((note) => (
                <div key={note.id} className="mb-4 p-4 bg-white bg-opacity-10 rounded-lg flex justify-between items-start">
                    <div
                        className="cursor-pointer flex-grow"
                        onClick={() => {
                            setEditingNote(note)
                            setIsViewModalOpen(true)
                        }}
                    >
                        <h3 className="font-semibold text-white">{note.title}</h3>
                        <p className="text-sm text-gray-300">{note.description}</p>
                    </div>
                    <div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                setEditingNote(note)
                                setIsViewModalOpen(true)
                            }}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteNote(note.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ))}
            <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingNote ? 'Edit Note' : 'View Note'}</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder="Note Title"
                        value={editingNote?.title || ''}
                        onChange={(e) => setEditingNote(prev => prev ? { ...prev, title: e.target.value } : null)}
                        className="mb-2"
                    />
                    <Textarea
                        placeholder="Note Description"
                        value={editingNote?.description || ''}
                        onChange={(e) => setEditingNote(prev => prev ? { ...prev, description: e.target.value } : null)}
                        className="mb-2"
                    />
                    <Button onClick={handleEditNote}>Salvar</Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}

