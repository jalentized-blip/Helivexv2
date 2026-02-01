
export async function updateFileOnGitHub(filePath: string, content: string, commitMessage: string) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // Format: username/repo
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!token || !repo) {
    console.error('Missing GITHUB_TOKEN or GITHUB_REPO environment variables');
    return { success: false, error: 'GitHub Sync not configured on Vercel' };
  }

  try {
    // 1. Get the current file to get its SHA
    const getUrl = `https://api.github.com/repos/${repo}/contents/${filePath}?ref=${branch}`;
    const getRes = await fetch(getUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!getRes.ok) {
      const errorData = await getRes.json();
      console.error('Failed to get file from GitHub:', errorData);
      return { success: false, error: `GitHub API error: ${errorData.message}` };
    }

    const fileData = await getRes.json();
    const sha = fileData.sha;

    // 2. Update the file
    const updateUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;
    const updateRes = await fetch(updateUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: commitMessage,
        content: Buffer.from(content).toString('base64'),
        sha: sha,
        branch: branch,
      }),
    });

    if (!updateRes.ok) {
      const errorData = await updateRes.json();
      console.error('Failed to update file on GitHub:', errorData);
      return { success: false, error: `GitHub API update error: ${errorData.message}` };
    }

    console.log(`Successfully updated ${filePath} on GitHub`);
    return { success: true };
  } catch (error) {
    console.error('GitHub Sync Exception:', error);
    return { success: false, error: 'Internal error during GitHub Sync' };
  }
}
