// Claude Code status line: model | folder | git branch
const { execFileSync } = require("child_process");
const path = require("path");

let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (d) => (raw += d));
process.stdin.on("end", () => {
  let j = {};
  try { j = JSON.parse(raw); } catch (e) {}
  const model = (j.model && j.model.display_name) || "Claude";
  const dir = (j.workspace && j.workspace.current_dir) || j.cwd || process.cwd();
  const folder = path.basename(dir.replace(/[\\/]+$/, "")) || dir;
  let branch = "";
  try {
    branch = execFileSync("git", ["--no-optional-locks", "-C", dir, "branch", "--show-current"], {
      encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], timeout: 1500,
    }).trim();
    if (!branch) {
      branch = execFileSync("git", ["--no-optional-locks", "-C", dir, "rev-parse", "--short", "HEAD"], {
        encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], timeout: 1500,
      }).trim();
    }
  } catch (e) {}
  const parts = [model, folder];
  if (branch) parts.push(branch);
  process.stdout.write(parts.join(" | "));
});
