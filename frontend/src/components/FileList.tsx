import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/apiClient';
import { FileText, Clock } from 'lucide-react';

interface Props { onSelect: (id: string) => void; }
export const FileList: React.FC<Props> = ({ onSelect }) => {
  const { data, isLoading } = useQuery({ queryKey: ['files'], queryFn: api.listFiles });
  
  if (isLoading) return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
  
  if (!data?.files?.length) return (
    <div className="text-center py-8 text-muted-foreground text-sm">
      No files uploaded yet
    </div>
  );
  
  return (
    <div className="space-y-2 max-h-80 overflow-auto pr-2 scrollbar-thin">
      {data?.files?.map((f:any)=>(
        <button
          key={f._id}
          onClick={()=>onSelect(f._id)}
          className="w-full text-left flex items-center gap-3 rounded-lg border border-border bg-background p-3 text-sm hover:bg-secondary/50 hover:border-primary/50 transition-all"
        >
          <FileText className="h-4 w-4 text-primary flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{f.filename}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <Clock className="h-3 w-3" />
              {new Date(f.createdAt).toLocaleString()}
            </div>
          </div>
          <div className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-medium">
            {f.language}
          </div>
        </button>
      ))}
    </div>
  );
};
