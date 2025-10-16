import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FileUpload } from './components/FileUpload';
import { FileList } from './components/FileList';
import { ReviewActions } from './components/ReviewActions';
import { ReviewList } from './components/ReviewList';
import { ReviewDetail } from './components/ReviewDetail';
import { ThemeToggle } from './components/ThemeToggle';
import { Code2, FileCode, Activity } from 'lucide-react';

const qc = new QueryClient();

function Dashboard() {
  const [selectedFile, setSelectedFile] = useState<string | undefined>();
  const [activeReview, setActiveReview] = useState<string | undefined>();
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Code2 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Code Review Assistant</h1>
              <p className="text-sm text-muted-foreground">AI-powered code analysis with Gemini</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Upload & Files */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FileCode className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Upload Code</h2>
              </div>
              <FileUpload />
            </div>
            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <h3 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">Your Files</h3>
              <FileList onSelect={(id)=> { setSelectedFile(id); }} />
            </div>
          </div>

          {/* Middle Column - Actions & Reviews */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Actions</h2>
              </div>
              <ReviewActions fileId={selectedFile} onCreated={id=> setActiveReview(id)} />
            </div>
            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <h3 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">Recent Reviews</h3>
              <ReviewList onSelect={setActiveReview} />
            </div>
          </div>

          {/* Right Column - Review Details */}
          <div className="col-span-12 lg:col-span-6">
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm min-h-[600px]">
              <ReviewDetail reviewId={activeReview} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <Dashboard />
    </QueryClientProvider>
  );
}
