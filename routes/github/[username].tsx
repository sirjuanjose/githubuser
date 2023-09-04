import { RouteContext } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { db } from "../../libs/db.tsx";

interface GitHubResponse {
  login: string;
  name: string;
  avatar_url: string;
  bio?: string;
  location?: string;
}

export default async function Page(_req: Request, ctx: RouteContext) {
  const res = await db.get(["github", ctx.params.username]);
  // console.log(res);

  let user: GitHubResponse = {
    login: '',
    name: '',
    avatar_url: ''
  };

  if (res.value === null) {
    const resp = await fetch(
      `https://api.github.com/users/${ctx.params.username}`
    );
  
    if (!resp.ok) {
      return <h1>An Error occurred!</h1>;
    }

    user = (await resp.json()) as GitHubResponse;
    await db.atomic().set(["github", ctx.params.username], user).commit();
  } else {
    user = res.value;
  }

  return (
    <>
      <Head>
        <title>Github Profile: {user.login}</title>
        <meta
          name="description"
          content={`This is a brief description of ${user.login}`}
        />
      </Head>
      <div class="px-4 py-8 mx-auto bg-[#86efac]">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <a href="/">
            <img
              class="my-6"
              src="/logo.svg"
              width="128"
              height="128"
              alt="the Fresh logo: a sliced lemon dripping with juice"
            />
          </a>
          {/* <img src={user.avatar_url} class="w-24 h-24 rounded-full mt-10 mb-2" /> */}
          <div class="relative">
            <img class="w-20 h-20 rounded-full border-2 border-blue-900 border-opacity-75" src={user.avatar_url} alt={user.login} />
            <span class="bottom-0 left-14 absolute w-4 h-4 bg-green-400 border-2 border-blue-900 border-opacity-75 rounded-full"></span>
          </div>
          <h1 class="font-semibold text-lg">{user.name}</h1>
          <p class="text-sm">@{user.login}</p>
          {user?.bio &&
            <div class="mt-2 max-w-lg">
              <p class="text-xs text-center">{user?.bio}</p>
            </div>
          }
          <span class="text-[10px] mt-2 font-bold text-green-800">{user?.location}</span>
          {res.value !== null && <span class="text-[10px] mt-3">[#{res.versionstamp}]</span>}
        </div>
      </div>
    </>
  );
}
