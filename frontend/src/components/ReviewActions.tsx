import React, { useState } from 'react';
import { Button } from './ui/Button';
import { api } from '../lib/apiClient';
import { useQueryClient } from '@tanstack/react-query';
import { PlayCircle, Loader2 } from 'lucide-react';

export const ReviewActions: React.FC<{ fileId?: string; onCreated: (id:string)=>void }> = ({ fileId, onCreated }) => {
  const [loading,setLoading] = useState(false);
  const qc = useQueryClient();
  
  async function create() {
    if(!fileId) return;
    setLoading(true);
    try { 
      const r = await api.createReview(fileId); 
      onCreated(r.reviewId); 
      await qc.invalidateQueries({ queryKey:['reviews']}); 
    } catch(e:any){ 
      alert(e.message);
    } finally { 
      setLoading(false);
    }
  }
  
  return (
    <Button 
      disabled={!fileId||loading} 
      onClick={create}
      className="w-full"
      size="lg"
    >
      {loading ? (
        <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Analyzing Code...</>
      ) : (
        <><PlayCircle className="h-4 w-4 mr-2" />Run Code Review</>
      )}
    </Button>
  );
};
