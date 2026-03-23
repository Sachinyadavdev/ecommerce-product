---
description: How to stage, commit, and push changes to the corrections branch
---

This workflow ensures all UI refinements and label updates are safely pushed to the repository.

1. Ensure you are on the `corrections` branch
```powershell
git checkout corrections
```

2. Stage all modified files
```powershell
git add .
```

3. Commit the changes with a descriptive message
```powershell
git commit -m "Enhance footer aesthetics with premium animations, sync waves, and refine product labels"
```

// turbo
4. Push the changes to the remote repository
```powershell
git push origin corrections
```

5. If you encounter a "Repository not found" error, verify your git credentials or use a Personal Access Token (PAT).
