import React, { useState, useRef } from 'react';
import { Button } from './ui/Button';
import { api } from '../lib/apiClient';
import { useQueryClient } from '@tanstack/react-query';
import { Upload, CheckCircle2, FileCode } from 'lucide-react';

// Map file extensions to languages
const extensionToLanguage: Record<string, string> = {
  'js': 'javascript',
  'jsx': 'javascript',
  'ts': 'typescript',
  'tsx': 'typescript',
  'py': 'python',
  'java': 'java',
  'cpp': 'cpp',
  'cc': 'cpp',
  'cxx': 'cpp',
  'c': 'cpp',
  'h': 'cpp',
  'hpp': 'cpp',
  'go': 'go',
  'rs': 'rust',
};

export const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const qc = useQueryClient();

  const getLanguageFromFilename = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    return ext && extensionToLanguage[ext] ? extensionToLanguage[ext] : 'javascript';
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setLoading(true);
    setSuccess(false);
    try {
      const content = await selectedFile.text();
      const language = getLanguageFromFilename(selectedFile.name);
      
      await api.uploadFile({ 
        filename: selectedFile.name, 
        language, 
        content 
      });
      await qc.invalidateQueries({ queryKey: ['files'] });
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (e: any) { 
      alert(e.message); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Select File from Local Directory
        </label>
        <div className="flex flex-col gap-2">
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.cc,.cxx,.c,.h,.hpp,.go,.rs"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
          />
          {selectedFile && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted text-sm">
              <FileCode className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{selectedFile.name}</span>
              <span className="text-muted-foreground ml-auto">
                {getLanguageFromFilename(selectedFile.name)}
              </span>
            </div>
          )}
        </div>
      </div>
      <Button 
        disabled={!selectedFile || loading} 
        onClick={handleUpload}
        className="w-full"
      >
        {loading ? (
          <>Uploading...</>
        ) : success ? (
          <><CheckCircle2 className="h-4 w-4 mr-2" />Uploaded!</>
        ) : (
          <><Upload className="h-4 w-4 mr-2" />Upload File</>
        )}
      </Button>
    </div>
  );
};
