import React, { useState } from 'react';
import { Button } from './ui/Button';
import { api } from '../lib/apiClient';
import { useQuery } from '@tanstack/react-query';
import { Sparkles, Loader2, History } from 'lucide-react';

export const TestGeneration: React.FC<{ fileId?: string }> = ({ fileId }) => {
  const [latest, setLatest] = useState<string>('');
  const [loading,setLoading] = useState(false);
  const { data, refetch } = useQuery({ queryKey:['tests', fileId], queryFn: ()=> api.getTests(fileId!), enabled: !!fileId });

  async function generate() {
    if(!fileId) return; 
    setLoading(true);
    try { 
      const r = await api.createTests(fileId); 
      setLatest(r.testCode); 
      refetch(); 
    } catch(e:any){ 
      alert(e.message);
    } finally { 
      setLoading(false);
    }
  }
  
  return (
    <div className="space-y-3">
      <Button 
        disabled={!fileId||loading} 
        onClick={generate}
        className="w-full"
        variant="secondary"
      >
        {loading ? (
          <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Generating...</>
        ) : (
          <><Sparkles className="h-4 w-4 mr-2" />Generate Tests</>
        )}
      </Button>
      
      {!!latest && (
        <div className="rounded-lg border border-border bg-secondary/20 overflow-hidden">
          <div className="bg-secondary/50 px-3 py-2 border-b border-border">
            <span className="text-xs font-semibold uppercase tracking-wide">Generated Test Code</span>
          </div>
          <pre className="max-h-64 overflow-auto p-3 text-xs">
            <code>{latest}</code>
          </pre>
        </div>
      )}
      
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <History className="h-3 w-3" />
        <span>Test history: {data?.tests?.length || 0} generated</span>
      </div>
    </div>
  );
};
