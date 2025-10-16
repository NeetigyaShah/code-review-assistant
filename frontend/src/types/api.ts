export interface FileListItem { _id: string; filename: string; language: string; createdAt: string; }
export interface ReviewListItem { _id: string; file: { _id: string; filename: string; language: string }; overallScore: number; summary: string; createdAt: string; }
export interface Issue { category: string; severity: string; title: string; description: string; lineStart?: number; lineEnd?: number; codeSnippet?: string; suggestion?: string; impact?: string; }
export interface ReviewDetail extends ReviewListItem { categories: any; issues: Issue[]; positives: string[]; metrics?: Record<string, any>; }
export interface GeneratedTest { _id: string; language: string; testCode: string; createdAt: string; }
