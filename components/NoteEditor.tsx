// 'use client';

// 

import React, { useEffect, useState } from "react";
import { Note } from "@/types/note";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useAI } from "@/lib/useAI";

type Props = {
  note?: Note;
  open: boolean;
  onClose: () => void;
  onSave: (data: { title: string; content: string }) => void;
};

export const NoteEditor = ({ note, open, onClose, onSave }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [aiContent, setAiContent] = useState("");
  const { runAI, loading } = useAI();

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
  }, [note]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {note ? "Edit Note" : "Create New Note"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Title</label>
            <Input
              placeholder="Give your note a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Content</label>
            <Textarea
              placeholder="Start writing your note..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-64 bg-background resize-none"
            />
          </div>

          {/* AI Tools */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              AI Tools
            </label>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={loading}
                onClick={() => runAI("summary", note?.content as string, setAiContent)}
                className="gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {loading ? "Processing..." : "Summarize"}
              </Button>

              <Button
                size="sm"
                variant="outline"
                disabled={loading}
                onClick={() => runAI("improve", note?.content as string, setAiContent)}
                className="gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Improve
              </Button>

              <Button
                size="sm"
                variant="outline"
                disabled={loading}
                onClick={() => runAI("tags", note?.content as string, setAiContent)}
                className="gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Generate Tags
              </Button>
            </div>
          </div>

          {/* AI Response */}
          {aiContent && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">AI Result</label>
              <div className="p-3.5 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-sm text-foreground leading-relaxed">{aiContent}</p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-2 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                onSave({ title, content });
                onClose();
              }}
              disabled={!title.trim() || !content.trim()}
            >
              Save Note
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
