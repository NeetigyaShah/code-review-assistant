# Code Review Assistant - Visual Guide

## Application Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│  🔷 Code Review Assistant        AI-powered code analysis   🌙/☀️  │
├──────────────┬──────────────┬────────────────────────────────────────┤
│              │              │                                        │
│  📤 Upload   │  ⚡ Actions  │         📊 Review Details             │
│              │              │                                        │
│  ┌────────┐  │  ┌────────┐  │  ┌──────────────────────────────────┐ │
│  │ File   │  │  │ Run    │  │  │  app.py                    85    │ │
│  │ Input  │  │  │ Review │  │  │  Analysis summary text...         │ │
│  │        │  │  └────────┘  │  └──────────────────────────────────┘ │
│  │ Code   │  │              │                                        │
│  │ Area   │  │  📋 Reviews  │  🎯 Metrics                           │
│  │        │  │              │  ┌────┬────┬────┐                     │
│  └────────┘  │  • Review 1  │  │ 72 │ 5  │ 0  │                     │
│              │  • Review 2  │  └────┴────┴────┘                     │
│  Upload Btn  │  • Review 3  │                                        │
│              │              │  ⚠️  Issues (3)                        │
│  📁 Files    │  🧪 Tests    │  ┌──────────────────────────────────┐ │
│              │              │  │ ⚠️  Issue Title          [MEDIUM] │ │
│  • file1.py  │  Generate    │  │ Description of the issue...       │ │
│  • file2.js  │  Tests       │  │ Code snippet...                   │ │
│  • file3.ts  │              │  │ 💡 Suggestion: Fix it like this   │ │
│              │  History: 2  │  └──────────────────────────────────┘ │
│              │              │                                        │
│              │              │  ✅ Positives                          │
│              │              │  • Clear structure                     │
│              │              │  • Good naming                         │
└──────────────┴──────────────┴────────────────────────────────────────┘
```

## Color Scheme

### Dark Mode (Default)
- Background: Deep blue-gray (#0a0f1e)
- Cards: Slightly lighter (#0f1419)
- Primary: Purple (#8b5cf6)
- Text: Light gray/white
- Borders: Subtle gray

### Light Mode
- Background: Pure white
- Cards: Light gray
- Primary: Purple (slightly adjusted)
- Text: Dark gray/black
- Borders: Light gray

## Component Breakdown

### 1. Header
```
┌─────────────────────────────────────────────────┐
│ 🔷 Code Review Assistant           🌙 Theme    │
│    AI-powered code analysis                     │
└─────────────────────────────────────────────────┘
```

### 2. Upload Panel
```
┌─────────────────┐
│ 📤 Upload Code  │
├─────────────────┤
│ Filename:       │
│ [example.ts  ]  │
│                 │
│ Language:       │
│ [TypeScript ▼]  │
│                 │
│ Source Code:    │
│ ┌─────────────┐ │
│ │ Paste code  │ │
│ │ here...     │ │
│ └─────────────┘ │
│                 │
│ [Upload File]   │
└─────────────────┘
```

### 3. Review Display
```
┌──────────────────────────────────────┐
│ filename.py                    [85]  │
│ This is a well-structured file...    │
├──────────────────────────────────────┤
│ 🎯 Code Metrics                      │
│ ┌────────┬────────┬────────┐        │
│ │Lines:72│Cmplx:5 │Bugs:0  │        │
│ └────────┴────────┴────────┘        │
├──────────────────────────────────────┤
│ ⚠️ Issues (3)                        │
│                                      │
│ ┌──────────────────────────────┐    │
│ │ [MEDIUM] Missing validation   │    │
│ │ Input params not validated... │    │
│ │ def process(data):            │    │
│ │ 💡 Add type hints and checks  │    │
│ └──────────────────────────────┘    │
├──────────────────────────────────────┤
│ ✅ Positive Aspects                  │
│ • Clear variable names               │
│ • Proper error handling              │
└──────────────────────────────────────┘
```

## Interaction Flow

1. **Upload Code**
   - User pastes code → Selects language → Clicks upload
   - File appears in list → File is selected automatically

2. **Run Review**
   - User clicks "Run Review" button
   - Loading spinner appears
   - Review appears in review list
   - Review details populate right panel

3. **View Details**
   - Click any review in list
   - Right panel updates with full details
   - Scroll to see all issues and metrics

4. **Generate Tests**
   - Select file → Click "Generate Tests"
   - Loading state → Tests appear in expandable section

## Responsive Behavior

### Desktop (>1024px)
- 3-column layout (3-3-6 grid)
- All panels visible simultaneously
- Comfortable spacing

### Tablet (768px-1024px)
- Stacked columns
- Full-width sections
- Scrollable areas

### Mobile (<768px)
- Single column
- Collapsible sections
- Touch-optimized buttons

## Theme Toggle

```
Dark Mode:         Light Mode:
┌─────────┐       ┌─────────┐
│   🌙    │  ⟺   │   ☀️    │
└─────────┘       └─────────┘
Persists in localStorage
```

## Status Indicators

### Loading States
```
○○○  Uploading...
◐    Analyzing Code...
⟳    Generating Tests...
```

### Severity Badges
```
[HIGH]    - Red background
[MEDIUM]  - Orange/amber background  
[LOW]     - Green background
```

### Score Circle
```
    ┌────┐
    │ 85 │  Green: 80-100
    └────┘  Amber: 60-79
            Red: 0-59
```

## Data Flow Visualization

```
User Input → Frontend → API → Backend → AI → Database
                ↑                              ↓
                └──────── Response ────────────┘

1. Upload:  Form → POST /api/files → MongoDB → fileId
2. Review:  Click → POST /api/reviews → Gemini → MongoDB → reviewId
3. Display: Load → GET /api/reviews/:id → React Query → UI
4. Tests:   Click → POST /api/tests → Gemini → MongoDB → testCode
```
