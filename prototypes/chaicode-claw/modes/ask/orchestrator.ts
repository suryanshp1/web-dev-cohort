import chalk from 'chalk';
import { confirm, isCancel, text } from '@clack/prompts';
import { ToolLoopAgent, stepCountIs, tool } from 'ai';
import { z } from 'zod';
import { getAgentModel } from '../../ai/ai.config.ts';
import { ActionTracker } from '../agent/action-tracker.ts';
import { ToolExecutor } from '../agent/tool-executor.ts';
import { defaultAgentConfig } from '../agent/types.ts';
import { createWebTools } from '../plan/web-tools.ts';
import { renderTerminalMarkdown } from '../../tui/terminal-md.ts';
import { runApprovalFlow } from '../agent/approval.ts';

function createAskTools(executor: ToolExecutor) {
  return {
    read_file: tool({
      description: 'Read a workspace file (relative path).',
      inputSchema: z.object({ path: z.string() }),
      execute: async ({ path: p }) => executor.readFile(p),
    }),
    list_files: tool({
      description: 'List files/dirs at a path.',
      inputSchema: z.object({
        path: z.string(),
        recursive: z.boolean().optional().default(false),
      }),
      execute: async ({ path: p, recursive }) => executor.listFiles(p, recursive),
    }),
    search_files: tool({
      description: 'Find files matching a glob pattern; optional content filter.',
      inputSchema: z.object({
        root: z.string(),
        pattern: z.string(),
        content_contains: z.string().optional(),
      }),
      execute: async ({ root, pattern, content_contains }) =>
        executor.searchFiles(root, pattern, content_contains),
    }),
    analyze_codebase: tool({
      description: 'Summarize the codebase structure.',
      inputSchema: z.object({ path: z.string().default('.') }),
      execute: async ({ path: p }) => executor.analyzeCodebase(p),
    }),
    list_skills: tool({
      description: 'List paths to bundled SKILL.md files.',
      inputSchema: z.object({}),
      execute: async () => executor.listSkills(),
    }),
    read_skill: tool({
      description: 'Read a SKILL.md by absolute path.',
      inputSchema: z.object({ path: z.string() }),
      execute: async ({ path: p }) => executor.readSkill(p),
    }),
  };
}

function asMd(question: string, answer: string): string {
  return `# Ask Mode\n\n## Question\n\n${question.trim()}\n\n## Answer\n\n${answer.trim()}\n`;
}

export async function runAskMode(): Promise<void> {
  console.log(chalk.bold('\n❓ Ask Mode\n'));

  const question = await text({ message: 'What do you want to ask?' });
  if (isCancel(question) || !question.trim()) return;

  const config = defaultAgentConfig();
  config.tools.allowFileCreation = true;
  config.tools.allowFileModification = false;
  config.tools.allowFolderCreation = false;
  config.tools.allowShellExecution = false;

  const tracker = new ActionTracker();
  const executor = new ToolExecutor(tracker, config);
  const tools = {
    ...createAskTools(executor),
    ...(process.env.FIRECRAWL_API_KEY ? createWebTools(tracker) : {}),
  };

  const agent = new ToolLoopAgent({
    model: getAgentModel(),
    stopWhen: stepCountIs(20),
    tools,
  });

  const result = await agent.generate({ prompt: question.trim() });
  const answer = result.text?.trim() || '(no answer)';
  console.log('\n' + renderTerminalMarkdown(answer) + '\n');

  const wantsSave = await confirm({
    message: 'Save this answer to a .md file in the current directory?',
    initialValue: false,
  });
  if (isCancel(wantsSave) || !wantsSave) return;

  const filename = await text({
    message: 'Filename',
    initialValue: 'ask.md',
    validate: (v) => {
      const s = (v ?? '').trim();
      if (!s) return 'Required';
      if (s.includes('..') || s.includes('/') || s.includes('\\')) return 'No paths';
      if (!s.toLowerCase().endsWith('.md')) return 'Must end with .md';
    },
  });
  if (isCancel(filename)) return;

  executor.createFile(filename.trim(), asMd(question, answer));
  const ok = await runApprovalFlow(tracker);
  if (!ok) return executor.clearStaging();

  executor.applyApprovedFromTracker();
  executor.clearStaging();
}
