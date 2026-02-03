"use client";

import React, { useEffect, useState } from "react";
import { NoteCard } from "@/components/NoteCard";
import { NoteEditor } from "@/components/NoteEditor";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Pencil } from "lucide-react";
import { Note } from "@/types/note";
import { Navbar } from "@/components/Navbar";

export default function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Note | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  const fetchNotes = async () => {
    const res = await fetch(`/api/notes?q=${query}`);
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, [query]);

  const handleSave = async (data: { title: string; content: string }) => {
    if (editing) {
      await fetch("/api/notes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editing.id, ...data }),
      });
    } else {
      await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, userId: user?.id }),
      });
    }
    setEditing(null);
    setEditorOpen(false);
    fetchNotes();
  };

  const handleDelete = async (id: string) => {
    const ok = confirm("Are you sure you want to delete this note?");
    if (!ok) return;

    await fetch("/api/notes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchNotes();
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Header Section */}
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Notes</h1>
                <p className="text-muted-foreground mt-1">
                  {notes.length === 0
                    ? "Create your first note to get started"
                    : `${notes.length} ${notes.length === 1 ? "note" : "notes"} total`}
                </p>
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-3">
                <SearchBar query={query} setQuery={setQuery} />
                <Button
                  onClick={() => {
                    setEditing(null);
                    setEditorOpen(true);
                  }}
                  className="gap-2 w-full sm:w-auto"
                >
                  <Plus size={18} />
                  New Note
                </Button>
              </div>
            </div>
          </div>

          {/* Notes Grid */}
          {notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-primary/60" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No notes yet</h3>
              <p className="text-muted-foreground mb-6">Create your first note to start organizing your thoughts</p>
              <Button
                onClick={() => {
                  setEditing(null);
                  setEditorOpen(true);
                }}
              >
                Create Note
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="group relative"
                >
                  <NoteCard note={note} />

                  {/* Action Buttons - Hover Overlay */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0 rounded-md shadow-md hover:shadow-lg"
                      onClick={() => {
                        setEditing(note);
                        setEditorOpen(true);
                      }}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      <span className="sr-only">Edit note</span>
                    </Button>

                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0 rounded-md shadow-md hover:shadow-lg hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDelete(note.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span className="sr-only">Delete note</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Note Editor Dialog */}
      <NoteEditor
        open={editorOpen}
        note={editing || undefined}
        onClose={() => {
          setEditorOpen(false);
          setEditing(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
}
