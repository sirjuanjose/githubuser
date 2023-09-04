import { defineLayout } from "$fresh/server.ts";
import { db } from '../libs/db.tsx';

interface GitHubResponse {
  login: string;
  name: string;
  avatar_url: string;
}

export default defineLayout(async (req, ctx) => {
  const users: GitHubResponse[] = [];

  for await (const entry of db.list({ prefix: ["github"] })) {
    // console.log(entry.key, entry.value);
    users.push(entry.value);
  }

  return (
    <div class="layout">
      <ctx.Component />
      <div class="px-4 py-8 mx-auto">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <p class="mb-4 text-sm font-semibold">Usuarios:</p>
          <ul>
            {users.map(user => 
              // <li class="text-[14px]">
              //   <a href={`/github/${user.login}`} class="hover:underline">@{user.login}</a>
              // </li>
              <li>
                <a href={`/github/${user.login}`} class="flex items-center space-x-4 mb-2">
                  <img class="w-8 h-8 rounded-full" src={user.avatar_url} alt={user.login} />
                  <div class="font-medium">
                    <div class="text-sm">{user.name}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">@{user.login}</div>
                  </div>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
});
