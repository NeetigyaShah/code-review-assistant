import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/apiClient';
import { Badge } from './ui/Badge';
import { AlertCircle, CheckCircle2, TrendingUp, Shield, Code } from 'lucide-react';

function MetricsGrid({ metrics }: { metrics: Record<string, any> }) {
  const entries = Object.entries(metrics).slice(0, 6);
  if (!entries.length) return null;
  return (
    <div className="grid grid-cols-3 gap-3">
      {entries.map(([k, v]) => (
        <div key={k} className="rounded-lg border border-border bg-secondary/30 p-3 transition-colors hover:bg-secondary/50">
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1 line-clamp-1" title={k}>{k.replace(/([a-z])([A-Z])/g,'$1 $2')}</div>
          <div className="text-lg font-bold tabular-nums text-foreground">{typeof v === 'number' ? v.toFixed(2).replace(/\.00$/,'') : String(v)}</div>
        </div>
      ))}
    </div>
  );
}

function ScoreCircle({ score }: { score: number }) {
  const color = score >= 80 ? 'text-emerald-500' : score >= 60 ? 'text-amber-500' : 'text-red-500';
  return (
    <div className={`flex items-center justify-center w-20 h-20 rounded-full border-4 ${color}`}>
      <span className={`text-2xl font-bold ${color}`}>{score}</span>
    </div>
  );
}

export const ReviewDetail: React.FC<{ reviewId?: string }> = ({ reviewId }) => {
  const { data, isLoading } = useQuery({ queryKey:['review', reviewId], queryFn: ()=> api.getReview(reviewId!), enabled: !!reviewId });
  
  if(!reviewId) return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
      <Code className="h-16 w-16 text-muted-foreground/50" />
      <div>
        <h3 className="text-lg font-semibold mb-2">No Review Selected</h3>
        <p className="text-sm text-muted-foreground max-w-md">Upload a code file and run a review to see detailed analysis and suggestions here.</p>
      </div>
    </div>
  );
  
  if(isLoading) return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
  
  const review = data?.review;
  if(!review) return null;
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{review.file.filename}</h2>
          <p className="text-muted-foreground">{review.summary}</p>
        </div>
        <ScoreCircle score={review.overallScore || 0} />
      </div>

      {/* Metrics */}
      {review.metrics && (
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Code Metrics
          </h3>
          <MetricsGrid metrics={review.metrics} />
        </div>
      )}

      {/* Issues */}
      <div>
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-destructive" />
          Issues Found ({review.issues?.length || 0})
        </h3>
        <div className="space-y-3">
          {review.issues?.slice(0,6).map((i:any, idx: number)=>(
            <div key={idx} className="rounded-lg border border-border bg-card p-4 space-y-2 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <h4 className="font-semibold text-sm flex-1" title={i.title}>{i.title}</h4>
                <Badge severity={i.severity}>{i.severity}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{i.description}</p>
              {i.codeSnippet && (
                <pre className="mt-2 rounded bg-secondary/50 p-2 text-xs overflow-x-auto">
                  <code>{i.codeSnippet}</code>
                </pre>
              )}
              {i.suggestion && (
                <div className="mt-2 rounded-md bg-primary/10 border border-primary/20 p-2">
                  <p className="text-xs text-primary-foreground/90"><strong>Suggestion:</strong> {i.suggestion}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Positives */}
      {review.positives && review.positives.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Positive Aspects
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {review.positives?.slice(0,5).map((p:string, idx: number)=> (
              <div key={idx} className="flex items-start gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{p}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
