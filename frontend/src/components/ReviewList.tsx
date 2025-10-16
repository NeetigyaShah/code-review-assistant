import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/apiClient';
import { Badge } from './ui/Badge';
import { FileCheck, Clock, Star } from 'lucide-react';

export const ReviewList: React.FC<{ onSelect:(id:string)=>void }> = ({ onSelect }) => {
  const { data, isLoading } = useQuery({ queryKey:['reviews'], queryFn: api.listReviews });
  
  if(isLoading) return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
  
  if (!data?.reviews?.length) return (
    <div className="text-center py-8 text-muted-foreground text-sm">
      No reviews yet
    </div>
  );
  
  return (
    <div className="space-y-2 max-h-80 overflow-auto pr-2 scrollbar-thin">
      {data?.reviews?.map((r:any)=> (
        <button
          key={r._id}
          onClick={()=>onSelect(r._id)}
          className="w-full text-left cursor-pointer rounded-lg border border-border bg-background p-3 hover:bg-secondary/50 hover:border-primary/50 transition-all"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <FileCheck className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="font-medium text-sm truncate">{r.file.filename}</span>
            </div>
            <div className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded font-semibold">
              <Star className="h-3 w-3" />
              {r.overallScore ?? '-'}
            </div>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{r.summary}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {new Date(r.createdAt).toLocaleString()}
          </div>
        </button>
      ))}
    </div>
  );
};
