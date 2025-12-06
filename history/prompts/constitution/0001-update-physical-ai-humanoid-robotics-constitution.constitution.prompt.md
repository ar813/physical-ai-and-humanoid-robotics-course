---
id: 0001
title: Update Physical AI & Humanoid Robotics Constitution
stage: constitution
date: 2025-12-04
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: unknown
command: /sp.constitution
labels: ["constitution", "principles", "governance"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - none
---

## Prompt

```text
# Simple Rules — Physical AI & Humanoid Robotics (TypeScript + speckit-plus + Docusaurus)

1. Code will be clean and readable.
2. TypeScript first. Avoid JS unless absolutely necessary.
3. Use types for all variables, functions, and objects.
4. Work in small chunks. Don’t make huge functions or files.
5. Use multiple files for different features or modules.
6. Pass comments using simple, easy words for everyone to understand.
7. One function = one file if it’s big or important.
9. Keep naming simple and consistent (camelCase for variables, PascalCase for classes).
11. Always document inputs and outputs of functions.
12. Keep AI/Claude generated code clearly marked and reviewed.

14. Use meaningful commit messages.


17. Use comments to explain “why” not “what” — code should show what it does.
18. Keep code modular — small, reusable functions.
19. Avoid repeating code; use shared helpers or utils.
```

## Response snapshot

Updated the project constitution based on the provided principles, generating a sync impact report and a suggested commit message.

## Outcome

- ✅ Impact: Project constitution updated with core principles.
- 🧪 Tests: none
- 📁 Files: Updated .specify/memory/constitution.md
- 🔁 Next prompts: Review and update dependent templates as suggested in the sync impact report.
- 🧠 Reflection: The PHR script failed, requiring manual creation and placeholder filling. This highlights a dependency on external scripts that needs robust error handling or agent-native alternatives.

## Evaluation notes (flywheel)

- Failure modes observed: The `create-phr.sh` script was not found, leading to a fallback to manual PHR creation.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Investigate why `create-phr.sh` was not found and ensure its availability or provide a more streamlined agent-native PHR creation process.
