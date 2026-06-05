# Edit Error Recovery

**CRITICAL:** A file edit has failed 3 or more times. Stop using diff/patch tools on this file immediately.

Follow this procedure instead:

1. Read the **entire** file content using your read tool.
2. Construct the **complete desired file content** in your reasoning — including unchanged sections.
3. Write the entire content back using your file-overwrite tool (not append, not patch).

Do not attempt partial diffs or patches on this file again in this session. The repeated failures indicate that the current file state has diverged from what the diff tool expects.

> **If the file is too large to hold in context:** split your change to the smallest logical unit, read only that section, modify it, and overwrite the full file from your reconstructed content.
