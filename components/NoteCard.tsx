// // 
import React from "react";
import { Note } from "@/types/note";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";




export const NoteCard = ({ note }: { note: Note }) => {
  return (
    <Card className="group relative overflow-hidden rounded-lg border border-border bg-background hover:shadow-lg transition-all duration-300 hover:border-primary/50">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="relative space-y-2 pb-3">
        <CardTitle className="text-base font-semibold text-foreground line-clamp-2 leading-snug">
          {note.title}
        </CardTitle>
        <div className="border-b border-border" />
        {note.summary && (
          <div className="flex items-center gap-1.5 text-xs bg-primary/10 text-primary px-2 py-1 rounded-sm w-fit">
            <Sparkles className="h-3 w-3" />
            <span>AI Summary</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="relative space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {note.summary || note.content}
        </p>

        {/* Tags */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
            {note.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs bg-background/50 hover:bg-primary/10 transition-colors">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
