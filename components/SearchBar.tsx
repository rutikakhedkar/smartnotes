// 
'use client';

import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const SearchBar = ({ query, setQuery }: { query: string; setQuery: (q: string) => void }) => (
  <div className="relative flex-1 max-w-sm">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
    <Input
      type="text"
      placeholder="Search notes..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="pl-10 bg-background"
    />
  </div>
);
